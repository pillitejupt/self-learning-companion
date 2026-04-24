import { c as createLucideIcon, h as useParams, f as useNavigate, a as useAppStore, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, i as ue, e as cn, b as Button } from "./index-CGW6bGON.js";
import { d as useTopic, h as useQuizAttempts, i as useSubmitQuiz, j as useActor, k as createActor } from "./useBackend-BW7wBvPB.js";
import { C as Card, a as CardContent } from "./card-BIPMfsD4.js";
import { T as Target } from "./target-BCofe2u2.js";
import { S as Star } from "./star-BkkJWPx7.js";
import { T as Trophy } from "./trophy-DTk-Y7qX.js";
import { S as Sparkles } from "./sparkles-DUi7Hr3A.js";
import { B as Bot } from "./bot-BmHebFvK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const FALLBACK_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following is the correct way to declare a variable in Python?",
    options: [
      { label: "A", value: "var x = 5" },
      { label: "B", value: "x = 5" },
      { label: "C", value: "int x = 5" },
      { label: "D", value: "declare x = 5" }
    ],
    correct: "x = 5",
    explanation: "Python uses dynamic typing. You simply assign a value without a type keyword."
  },
  {
    id: 2,
    question: "What is the output of `print(type([]))`?",
    options: [
      { label: "A", value: "<class 'array'>" },
      { label: "B", value: "<class 'tuple'>" },
      { label: "C", value: "<class 'list'>" },
      { label: "D", value: "<class 'dict'>" }
    ],
    correct: "<class 'list'>",
    explanation: "[] creates an empty list. The type() function returns <class 'list'>."
  },
  {
    id: 3,
    question: "Which keyword is used to define a function in Python?",
    options: [
      { label: "A", value: "function" },
      { label: "B", value: "fn" },
      { label: "C", value: "def" },
      { label: "D", value: "func" }
    ],
    correct: "def",
    explanation: "Python uses the `def` keyword to define functions, followed by the function name."
  },
  {
    id: 4,
    question: "What does the `len()` function return?",
    options: [
      { label: "A", value: "The last element of a sequence" },
      { label: "B", value: "The number of items in an object" },
      { label: "C", value: "The memory size of an object" },
      { label: "D", value: "The type of an object" }
    ],
    correct: "The number of items in an object",
    explanation: "len() returns the number of items in a sequence (list, string, tuple, etc.)."
  },
  {
    id: 5,
    question: "Which of the following is a mutable data type in Python?",
    options: [
      { label: "A", value: "String" },
      { label: "B", value: "Tuple" },
      { label: "C", value: "List" },
      { label: "D", value: "Integer" }
    ],
    correct: "List",
    explanation: "Lists are mutable — their elements can be changed after creation. Strings, tuples, and integers are immutable."
  }
];
function parseAiQuestions(raw) {
  const questions = [];
  const blocks = raw.split(/\n(?=\d+[\.\)])/);
  blocks.forEach((block, idx) => {
    const lines = block.trim().split("\n").filter(Boolean);
    if (lines.length < 6) return;
    const questionText = lines[0].replace(/^\d+[\.\)]\s*/, "").trim();
    const opts = [];
    const labels = ["A", "B", "C", "D"];
    let answerLine = "";
    let explanationLine = "";
    for (const line of lines.slice(1)) {
      const optMatch = line.match(/^([A-D])[\)\.:\s]\s*(.+)/i);
      if (optMatch) {
        opts.push({
          label: optMatch[1].toUpperCase(),
          value: optMatch[2].trim()
        });
      } else if (/^answer\s*:/i.test(line)) {
        answerLine = line.replace(/^answer\s*:\s*/i, "").trim();
      } else if (/^explanation\s*:/i.test(line)) {
        explanationLine = line.replace(/^explanation\s*:\s*/i, "").trim();
      }
    }
    if (opts.length < 4 || !questionText) return;
    const correctLetter = answerLine.replace(/[^A-Da-d]/g, "").toUpperCase();
    const correctOpt = opts.find((o) => o.label === correctLetter);
    if (!correctOpt) return;
    questions.push({
      id: idx + 1,
      question: questionText,
      options: opts.slice(0, 4).map((o, i) => ({ label: labels[i], value: o.value })),
      correct: correctOpt.value,
      explanation: explanationLine || "Review the topic material for more context."
    });
  });
  return questions.length >= 3 ? questions : [];
}
function QuestionView({
  question,
  index,
  total,
  answerState,
  selected,
  onSelect,
  onNext,
  isLast
}) {
  const progress = index / total * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "font-medium text-foreground",
            "data-ocid": "quiz.question_counter",
            children: [
              "Question ",
              index + 1,
              " of ",
              total
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          Math.round(progress),
          "% complete"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-2 bg-muted rounded-full overflow-hidden",
          "data-ocid": "quiz.progress_bar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-500 ease-out",
              style: { width: `${progress}%` }
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-elevated", "data-ocid": "quiz.question_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-semibold text-foreground text-lg leading-relaxed",
          "data-ocid": "quiz.question_text",
          children: question.question
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "quiz.options_list", children: question.options.map((opt, i) => {
        const isSelected = selected === opt.value;
        const isCorrect = opt.value === question.correct;
        const showResult = answerState !== "idle";
        let stateClass = "border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer";
        if (showResult && isCorrect)
          stateClass = "border-chart-2/60 bg-chart-2/10";
        else if (showResult && isSelected && !isCorrect)
          stateClass = "border-destructive bg-destructive/10";
        else if (!showResult && isSelected)
          stateClass = "border-primary bg-primary/5";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect(opt.value),
            "data-ocid": `quiz.option.item.${i + 1}`,
            disabled: answerState !== "idle",
            className: cn(
              "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-smooth",
              stateClass,
              answerState !== "idle" && "cursor-default"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 transition-smooth",
                    showResult && isCorrect ? "bg-chart-2 text-white" : showResult && isSelected && !isCorrect ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground"
                  ),
                  children: opt.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1 min-w-0", children: opt.value }),
              showResult && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-chart-2 shrink-0" }),
              showResult && isSelected && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive shrink-0" })
            ]
          },
          opt.value
        );
      }) }),
      answerState !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "rounded-xl p-4 text-sm border message-fade",
            answerState === "correct" ? "bg-chart-2/10 border-chart-2/20 text-chart-2" : "bg-destructive/10 border-destructive/20 text-destructive"
          ),
          "data-ocid": "quiz.explanation_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: answerState === "correct" ? "✓ Correct!" : "✗ Incorrect" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: question.explanation })
          ]
        }
      )
    ] }) }),
    answerState !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "w-full",
        size: "lg",
        onClick: onNext,
        "data-ocid": "quiz.next_button",
        children: isLast ? "See Results" : "Next Question →"
      }
    )
  ] });
}
function QuizSummary({
  score,
  total,
  pointsEarned,
  elapsedSeconds,
  topicId,
  onRetake
}) {
  const navigate = useNavigate();
  const accuracy = Math.round(score / total * 100);
  const { label, emoji, colorClass, bgClass } = accuracy > 85 ? {
    label: "Excellent!",
    emoji: "🎉",
    colorClass: "text-chart-2",
    bgClass: "bg-chart-2/15"
  } : accuracy >= 70 ? {
    label: "Good job!",
    emoji: "👍",
    colorClass: "text-primary",
    bgClass: "bg-primary/10"
  } : {
    label: "Keep practicing!",
    emoji: "💪",
    colorClass: "text-accent",
    bgClass: "bg-accent/10"
  };
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "w-full max-w-md shadow-elevated",
      "data-ocid": "quiz.summary_card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
              bgClass
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 text-accent" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              className: cn("font-display font-bold text-2xl", colorClass),
              "data-ocid": "quiz.result_label",
              children: [
                label,
                " ",
                emoji
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "You scored ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: score }),
            " ",
            "out of ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: total }),
            " ",
            "questions"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn("text-6xl font-display font-bold", colorClass),
              "data-ocid": "quiz.accuracy_display",
              children: [
                accuracy,
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 uppercase tracking-wide", children: "Accuracy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-3 text-center",
              "data-ocid": "quiz.score_stat",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-accent mx-auto mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm", children: [
                  score,
                  "/",
                  total
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Correct" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-3 text-center",
              "data-ocid": "quiz.points_stat",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary mx-auto mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm", children: [
                  "+",
                  pointsEarned
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Points" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-3 text-center",
              "data-ocid": "quiz.time_stat",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground mx-auto mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: timeStr }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Time" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full",
              onClick: onRetake,
              "data-ocid": "quiz.retake_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-2" }),
                "Retake Quiz"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full",
              onClick: () => navigate({ to: "/topics/$topicId", params: { topicId } }),
              "data-ocid": "quiz.return_topic_button",
              children: "Return to Topic"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              onClick: () => navigate({ to: "/dashboard" }),
              "data-ocid": "quiz.go_dashboard_button",
              children: "Go to Dashboard"
            }
          )
        ] })
      ] })
    }
  ) });
}
function NoQuizView({ topicTitle, onGenerate, isGenerating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "w-full max-w-md shadow-elevated",
      "data-ocid": "quiz.no_quiz_card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "No quiz yet for this topic" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
            "Let the AI generate a personalized quiz for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: topicTitle }),
            " — tailored to test your understanding."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "w-full gap-2",
            onClick: onGenerate,
            disabled: isGenerating,
            "data-ocid": "quiz.generate_button",
            children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
              "Generating Quiz..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
              "Generate Quiz with AI"
            ] })
          }
        )
      ] })
    }
  ) });
}
function QuizPage() {
  const { topicId } = useParams({ from: "/quiz/$topicId" });
  const navigate = useNavigate();
  const { data: topic, isLoading: topicLoading } = useTopic(Number(topicId));
  const { data: attempts } = useQuizAttempts(Number(topicId));
  const submitQuizMutation = useSubmitQuiz();
  const { actor } = useActor(createActor);
  const setPoints = useAppStore((s) => s.setPoints);
  const currentPoints = useAppStore((s) => s.points);
  const [phase, setPhase] = reactExports.useState("loading");
  const [questions, setQuestions] = reactExports.useState([]);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(null);
  const [answerState, setAnswerState] = reactExports.useState("idle");
  const [score, setScore] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState([]);
  const [pointsEarned, setPointsEarned] = reactExports.useState(0);
  const [startTime, setStartTime] = reactExports.useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (topicLoading) return;
    if (attempts && attempts.length > 0) {
      setQuestions(FALLBACK_QUESTIONS);
      setPhase("quiz");
      startTimer();
    } else {
      setPhase("no-quiz");
    }
  }, [topicLoading, attempts]);
  const startTimer = reactExports.useCallback(() => {
    const t0 = Date.now();
    setStartTime(t0);
    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - t0) / 1e3));
    }, 1e3);
  }, []);
  const stopTimer = reactExports.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsedSeconds(Math.floor((Date.now() - startTime) / 1e3));
  }, [startTime]);
  reactExports.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const handleGenerate = async () => {
    setPhase("generating");
    try {
      const act = actor;
      const prompt = `Generate a quiz with exactly 5 multiple-choice questions about "${(topic == null ? void 0 : topic.title) ?? "this topic"}". 
Format each question like this:
1. [Question text]
A) [Option]
B) [Option]
C) [Option]
D) [Option]
Answer: [Letter]
Explanation: [Brief explanation]

Make the questions educational and progressively challenging.`;
      let parsed = [];
      if (act.sendMessage) {
        const response = await act.sendMessage(
          BigInt(topicId),
          prompt
        );
        parsed = parseAiQuestions(response);
      }
      const finalQuestions = parsed.length >= 3 ? parsed : FALLBACK_QUESTIONS;
      setQuestions(finalQuestions);
      setPhase("quiz");
      startTimer();
      ue.success("Quiz generated! Good luck 🎯");
    } catch {
      setQuestions(FALLBACK_QUESTIONS);
      setPhase("quiz");
      startTimer();
      ue.info("Using sample questions — AI generation unavailable.");
    }
  };
  const handleSelect = (value) => {
    if (answerState !== "idle") return;
    const current2 = questions[currentIndex];
    setSelected(value);
    const isCorrect = value === current2.correct;
    setAnswerState(isCorrect ? "correct" : "incorrect");
    const newAnswers = [...answers, { questionId: current2.id, answer: value }];
    setAnswers(newAnswers);
    if (isCorrect) {
      setScore((s) => s + 1);
      const pts = 10;
      setPointsEarned((p) => p + pts);
      setPoints(currentPoints + pts);
      ue.success("Correct! +10 points 🎉");
    } else {
      ue.error("Not quite. See the explanation below.");
    }
  };
  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswerState("idle");
    } else {
      stopTimer();
      try {
        await submitQuizMutation.mutateAsync({
          topicId: Number(topicId),
          answers
        });
      } catch {
      }
      setPhase("summary");
    }
  };
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
  if (phase === "loading" || topicLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[calc(100vh-4rem)] flex items-center justify-center",
        "data-ocid": "quiz.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading quiz..." })
        ] })
      }
    );
  }
  if (phase === "summary") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizSummary,
      {
        score,
        total: questions.length,
        pointsEarned,
        elapsedSeconds,
        topicId,
        onRetake: handleRetake
      }
    );
  }
  if (phase === "no-quiz" || phase === "generating") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NoQuizView,
      {
        topicTitle: (topic == null ? void 0 : topic.title) ?? "this topic",
        onGenerate: handleGenerate,
        isGenerating: phase === "generating"
      }
    );
  }
  const current = questions[currentIndex];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 max-w-2xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/topics/$topicId", params: { topicId } }),
          className: "p-2 rounded-lg hover:bg-muted transition-smooth",
          "aria-label": "Back to topic",
          "data-ocid": "quiz.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-bold text-foreground leading-tight truncate",
            "data-ocid": "quiz.topic_title",
            children: (topic == null ? void 0 : topic.title) ?? "Quiz"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-primary font-medium flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3.5 h-3.5" }),
          "Quiz Time!"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1.5 bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-full text-sm",
          "data-ocid": "quiz.score_badge",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }),
            score,
            " pts"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuestionView,
      {
        question: current,
        index: currentIndex,
        total: questions.length,
        answerState,
        selected,
        onSelect: handleSelect,
        onNext: handleNext,
        isLast: currentIndex === questions.length - 1
      }
    )
  ] });
}
export {
  QuizPage as default
};
