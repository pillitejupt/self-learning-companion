import { createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuizAttempts, useSubmitQuiz, useTopic } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bot,
  CheckCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Star,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: number;
  question: string;
  options: { label: string; value: string }[];
  correct: string;
  explanation: string;
}

type AnswerState = "idle" | "correct" | "incorrect";
type QuizPhase = "loading" | "no-quiz" | "generating" | "quiz" | "summary";

// ─── Sample fallback questions per topic ──────────────────────────────────────

const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Which of the following is the correct way to declare a variable in Python?",
    options: [
      { label: "A", value: "var x = 5" },
      { label: "B", value: "x = 5" },
      { label: "C", value: "int x = 5" },
      { label: "D", value: "declare x = 5" },
    ],
    correct: "x = 5",
    explanation:
      "Python uses dynamic typing. You simply assign a value without a type keyword.",
  },
  {
    id: 2,
    question: "What is the output of `print(type([]))`?",
    options: [
      { label: "A", value: "<class 'array'>" },
      { label: "B", value: "<class 'tuple'>" },
      { label: "C", value: "<class 'list'>" },
      { label: "D", value: "<class 'dict'>" },
    ],
    correct: "<class 'list'>",
    explanation:
      "[] creates an empty list. The type() function returns <class 'list'>.",
  },
  {
    id: 3,
    question: "Which keyword is used to define a function in Python?",
    options: [
      { label: "A", value: "function" },
      { label: "B", value: "fn" },
      { label: "C", value: "def" },
      { label: "D", value: "func" },
    ],
    correct: "def",
    explanation:
      "Python uses the `def` keyword to define functions, followed by the function name.",
  },
  {
    id: 4,
    question: "What does the `len()` function return?",
    options: [
      { label: "A", value: "The last element of a sequence" },
      { label: "B", value: "The number of items in an object" },
      { label: "C", value: "The memory size of an object" },
      { label: "D", value: "The type of an object" },
    ],
    correct: "The number of items in an object",
    explanation:
      "len() returns the number of items in a sequence (list, string, tuple, etc.).",
  },
  {
    id: 5,
    question: "Which of the following is a mutable data type in Python?",
    options: [
      { label: "A", value: "String" },
      { label: "B", value: "Tuple" },
      { label: "C", value: "List" },
      { label: "D", value: "Integer" },
    ],
    correct: "List",
    explanation:
      "Lists are mutable — their elements can be changed after creation. Strings, tuples, and integers are immutable.",
  },
];

// ─── Parse AI-generated questions from text ───────────────────────────────────

function parseAiQuestions(raw: string): Question[] {
  const questions: Question[] = [];
  // Match patterns like "1. Question text\nA) ...\nB) ...\nC) ...\nD) ...\nAnswer: X\nExplanation: ..."
  const blocks = raw.split(/\n(?=\d+[\.\)])/);
  blocks.forEach((block, idx) => {
    const lines = block.trim().split("\n").filter(Boolean);
    if (lines.length < 6) return;
    const questionText = lines[0].replace(/^\d+[\.\)]\s*/, "").trim();
    const opts: { label: string; value: string }[] = [];
    const labels = ["A", "B", "C", "D"];
    let answerLine = "";
    let explanationLine = "";
    for (const line of lines.slice(1)) {
      const optMatch = line.match(/^([A-D])[\)\.:\s]\s*(.+)/i);
      if (optMatch) {
        opts.push({
          label: optMatch[1].toUpperCase(),
          value: optMatch[2].trim(),
        });
      } else if (/^answer\s*:/i.test(line)) {
        answerLine = line.replace(/^answer\s*:\s*/i, "").trim();
      } else if (/^explanation\s*:/i.test(line)) {
        explanationLine = line.replace(/^explanation\s*:\s*/i, "").trim();
      }
    }
    if (opts.length < 4 || !questionText) return;
    // Find correct answer
    const correctLetter = answerLine.replace(/[^A-Da-d]/g, "").toUpperCase();
    const correctOpt = opts.find((o) => o.label === correctLetter);
    if (!correctOpt) return;
    questions.push({
      id: idx + 1,
      question: questionText,
      options: opts
        .slice(0, 4)
        .map((o, i) => ({ label: labels[i], value: o.value })),
      correct: correctOpt.value,
      explanation:
        explanationLine || "Review the topic material for more context.",
    });
  });
  return questions.length >= 3 ? questions : [];
}

// ─── Quiz Phase: Question view ─────────────────────────────────────────────────

interface QuestionViewProps {
  question: Question;
  index: number;
  total: number;
  answerState: AnswerState;
  selected: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  isLast: boolean;
}

function QuestionView({
  question,
  index,
  total,
  answerState,
  selected,
  onSelect,
  onNext,
  isLast,
}: QuestionViewProps) {
  const progress = (index / total) * 100;

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span
            className="font-medium text-foreground"
            data-ocid="quiz.question_counter"
          >
            Question {index + 1} of {total}
          </span>
          <span className="text-muted-foreground">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div
          className="h-2 bg-muted rounded-full overflow-hidden"
          data-ocid="quiz.progress_bar"
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <Card className="shadow-elevated" data-ocid="quiz.question_card">
        <CardContent className="p-6 space-y-6">
          <p
            className="font-semibold text-foreground text-lg leading-relaxed"
            data-ocid="quiz.question_text"
          >
            {question.question}
          </p>

          <div className="space-y-3" data-ocid="quiz.options_list">
            {question.options.map((opt, i) => {
              const isSelected = selected === opt.value;
              const isCorrect = opt.value === question.correct;
              const showResult = answerState !== "idle";

              let stateClass =
                "border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer";
              if (showResult && isCorrect)
                stateClass = "border-chart-2/60 bg-chart-2/10";
              else if (showResult && isSelected && !isCorrect)
                stateClass = "border-destructive bg-destructive/10";
              else if (!showResult && isSelected)
                stateClass = "border-primary bg-primary/5";

              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => onSelect(opt.value)}
                  data-ocid={`quiz.option.item.${i + 1}`}
                  disabled={answerState !== "idle"}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-smooth",
                    stateClass,
                    answerState !== "idle" && "cursor-default",
                  )}
                >
                  <span
                    className={cn(
                      "w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 transition-smooth",
                      showResult && isCorrect
                        ? "bg-chart-2 text-white"
                        : showResult && isSelected && !isCorrect
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-foreground",
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-sm text-foreground flex-1 min-w-0">
                    {opt.value}
                  </span>
                  {showResult && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-chart-2 shrink-0" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {answerState !== "idle" && (
            <div
              className={cn(
                "rounded-xl p-4 text-sm border message-fade",
                answerState === "correct"
                  ? "bg-chart-2/10 border-chart-2/20 text-chart-2"
                  : "bg-destructive/10 border-destructive/20 text-destructive",
              )}
              data-ocid="quiz.explanation_panel"
            >
              <p className="font-semibold mb-1">
                {answerState === "correct" ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p className="leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {answerState !== "idle" && (
        <Button
          className="w-full"
          size="lg"
          onClick={onNext}
          data-ocid="quiz.next_button"
        >
          {isLast ? "See Results" : "Next Question →"}
        </Button>
      )}
    </div>
  );
}

// ─── Quiz Summary Screen ───────────────────────────────────────────────────────

interface SummaryProps {
  score: number;
  total: number;
  pointsEarned: number;
  elapsedSeconds: number;
  topicId: string;
  onRetake: () => void;
}

function QuizSummary({
  score,
  total,
  pointsEarned,
  elapsedSeconds,
  topicId,
  onRetake,
}: SummaryProps) {
  const navigate = useNavigate();
  const accuracy = Math.round((score / total) * 100);

  const { label, emoji, colorClass, bgClass } =
    accuracy > 85
      ? {
          label: "Excellent!",
          emoji: "🎉",
          colorClass: "text-chart-2",
          bgClass: "bg-chart-2/15",
        }
      : accuracy >= 70
        ? {
            label: "Good job!",
            emoji: "👍",
            colorClass: "text-primary",
            bgClass: "bg-primary/10",
          }
        : {
            label: "Keep practicing!",
            emoji: "💪",
            colorClass: "text-accent",
            bgClass: "bg-accent/10",
          };

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-muted/30">
      <Card
        className="w-full max-w-md shadow-elevated"
        data-ocid="quiz.summary_card"
      >
        <CardContent className="p-8 space-y-6">
          {/* Trophy icon */}
          <div
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
              bgClass,
            )}
          >
            <Trophy className="w-10 h-10 text-accent" />
          </div>

          {/* Result label */}
          <div className="text-center space-y-1">
            <h2
              className={cn("font-display font-bold text-2xl", colorClass)}
              data-ocid="quiz.result_label"
            >
              {label} {emoji}
            </h2>
            <p className="text-muted-foreground text-sm">
              You scored <strong className="text-foreground">{score}</strong>{" "}
              out of <strong className="text-foreground">{total}</strong>{" "}
              questions
            </p>
          </div>

          {/* Accuracy big number */}
          <div className="text-center">
            <div
              className={cn("text-6xl font-display font-bold", colorClass)}
              data-ocid="quiz.accuracy_display"
            >
              {accuracy}%
            </div>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
              Accuracy
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className="bg-card border border-border rounded-xl p-3 text-center"
              data-ocid="quiz.score_stat"
            >
              <Star className="w-4 h-4 text-accent mx-auto mb-1" />
              <p className="font-bold text-foreground text-sm">
                {score}/{total}
              </p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div
              className="bg-card border border-border rounded-xl p-3 text-center"
              data-ocid="quiz.points_stat"
            >
              <Sparkles className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="font-bold text-foreground text-sm">
                +{pointsEarned}
              </p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div
              className="bg-card border border-border rounded-xl p-3 text-center"
              data-ocid="quiz.time_stat"
            >
              <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
              <p className="font-bold text-foreground text-sm">{timeStr}</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={onRetake}
              data-ocid="quiz.retake_button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                navigate({ to: "/topics/$topicId", params: { topicId } })
              }
              data-ocid="quiz.return_topic_button"
            >
              Return to Topic
            </Button>
            <Button
              className="w-full"
              onClick={() => navigate({ to: "/dashboard" })}
              data-ocid="quiz.go_dashboard_button"
            >
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── No Quiz / Generate CTA ───────────────────────────────────────────────────

interface NoQuizViewProps {
  topicTitle: string;
  onGenerate: () => void;
  isGenerating: boolean;
}

function NoQuizView({ topicTitle, onGenerate, isGenerating }: NoQuizViewProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-muted/30">
      <Card
        className="w-full max-w-md shadow-elevated"
        data-ocid="quiz.no_quiz_card"
      >
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Bot className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-xl text-foreground">
              No quiz yet for this topic
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Let the AI generate a personalized quiz for{" "}
              <strong className="text-foreground">{topicTitle}</strong> —
              tailored to test your understanding.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={onGenerate}
            disabled={isGenerating}
            data-ocid="quiz.generate_button"
          >
            {isGenerating ? (
              <>
                <LoadingSpinner size="sm" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Quiz with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main QuizPage ─────────────────────────────────────────────────────────────

export default function QuizPage() {
  const { topicId } = useParams({ from: "/quiz/$topicId" });
  const navigate = useNavigate();
  const { data: topic, isLoading: topicLoading } = useTopic(Number(topicId));
  const { data: attempts } = useQuizAttempts(Number(topicId));
  const submitQuizMutation = useSubmitQuiz();
  const { actor } = useActor(createActor);
  const setPoints = useAppStore((s) => s.setPoints);
  const currentPoints = useAppStore((s) => s.points);

  const [phase, setPhase] = useState<QuizPhase>("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: number; answer: string }[]
  >([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // On mount: decide phase based on prior attempts (or default to no-quiz state)
  useEffect(() => {
    if (topicLoading) return;
    // Start with fallback questions — in a real integration, we'd fetch quiz from backend
    // For now, show no-quiz if there are no prior attempts, quiz otherwise
    if (attempts && attempts.length > 0) {
      setQuestions(FALLBACK_QUESTIONS);
      setPhase("quiz");
      startTimer();
    } else {
      setPhase("no-quiz");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicLoading, attempts]);

  const startTimer = useCallback(() => {
    const t0 = Date.now();
    setStartTime(t0);
    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - t0) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
  }, [startTime]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ── AI Quiz Generation ─────────────────────────────────────────────────────
  const handleGenerate = async () => {
    setPhase("generating");
    try {
      const act = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const prompt = `Generate a quiz with exactly 5 multiple-choice questions about "${topic?.title ?? "this topic"}". 
Format each question like this:
1. [Question text]
A) [Option]
B) [Option]
C) [Option]
D) [Option]
Answer: [Letter]
Explanation: [Brief explanation]

Make the questions educational and progressively challenging.`;

      let parsed: Question[] = [];
      if (act.sendMessage) {
        const response = (await act.sendMessage(
          BigInt(topicId),
          prompt,
        )) as string;
        parsed = parseAiQuestions(response);
      }

      const finalQuestions = parsed.length >= 3 ? parsed : FALLBACK_QUESTIONS;
      setQuestions(finalQuestions);
      setPhase("quiz");
      startTimer();
      toast.success("Quiz generated! Good luck 🎯");
    } catch {
      // Fall back to sample questions on error
      setQuestions(FALLBACK_QUESTIONS);
      setPhase("quiz");
      startTimer();
      toast.info("Using sample questions — AI generation unavailable.");
    }
  };

  // ── Answer selection ───────────────────────────────────────────────────────
  const handleSelect = (value: string) => {
    if (answerState !== "idle") return;
    const current = questions[currentIndex];
    setSelected(value);
    const isCorrect = value === current.correct;
    setAnswerState(isCorrect ? "correct" : "incorrect");
    const newAnswers = [...answers, { questionId: current.id, answer: value }];
    setAnswers(newAnswers);
    if (isCorrect) {
      setScore((s) => s + 1);
      const pts = 10;
      setPointsEarned((p) => p + pts);
      setPoints(currentPoints + pts);
      toast.success("Correct! +10 points 🎉");
    } else {
      toast.error("Not quite. See the explanation below.");
    }
  };

  // ── Next question / Finish ─────────────────────────────────────────────────
  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswerState("idle");
    } else {
      stopTimer();
      // Submit to backend
      try {
        await submitQuizMutation.mutateAsync({
          topicId: Number(topicId),
          answers,
        });
      } catch {
        // Non-blocking — show summary regardless
      }
      setPhase("summary");
    }
  };

  // ── Retake ─────────────────────────────────────────────────────────────────
  const handleRetake = () => {
    setCurrentIndex(0);
    setSelected(null);
    setAnswerState("idle");
    setScore(0);
    setAnswers([]);
    setPointsEarned(0);
    setPhase("quiz");
    startTimer();
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  if (phase === "loading" || topicLoading) {
    return (
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center"
        data-ocid="quiz.loading_state"
      >
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (phase === "summary") {
    return (
      <QuizSummary
        score={score}
        total={questions.length}
        pointsEarned={pointsEarned}
        elapsedSeconds={elapsedSeconds}
        topicId={topicId}
        onRetake={handleRetake}
      />
    );
  }

  if (phase === "no-quiz" || phase === "generating") {
    return (
      <NoQuizView
        topicTitle={topic?.title ?? "this topic"}
        onGenerate={handleGenerate}
        isGenerating={phase === "generating"}
      />
    );
  }

  // quiz phase
  const current = questions[currentIndex];

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            navigate({ to: "/topics/$topicId", params: { topicId } })
          }
          className="p-2 rounded-lg hover:bg-muted transition-smooth"
          aria-label="Back to topic"
          data-ocid="quiz.back_button"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1
            className="font-display font-bold text-foreground leading-tight truncate"
            data-ocid="quiz.topic_title"
          >
            {topic?.title ?? "Quiz"}
          </h1>
          <p className="text-sm text-primary font-medium flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            Quiz Time!
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-full text-sm"
          data-ocid="quiz.score_badge"
        >
          <Star className="w-3.5 h-3.5" />
          {score} pts
        </div>
      </div>

      {/* Question view */}
      <QuestionView
        question={current}
        index={currentIndex}
        total={questions.length}
        answerState={answerState}
        selected={selected}
        onSelect={handleSelect}
        onNext={handleNext}
        isLast={currentIndex === questions.length - 1}
      />
    </div>
  );
}
