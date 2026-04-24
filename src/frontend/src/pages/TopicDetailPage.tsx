import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useLearningSession,
  useMarkTopicCompleted,
  useSendMessage,
  useTopic,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { SkillLevel } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Bot,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Send,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface LocalMessage {
  role: "user" | "assistant";
  content: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-chart-2/15 text-chart-2 dark:text-chart-2 border-chart-2/25",
  medium: "bg-primary/15 text-primary border-primary/25",
  hard: "bg-destructive/15 text-destructive border-destructive/25",
};

function buildWelcomeMessage(topicTitle: string, level: SkillLevel): string {
  const levelPhrase =
    level === "beginner"
      ? "start with the fundamentals"
      : level === "intermediate"
        ? "build on your existing knowledge"
        : "dive deep into advanced concepts";
  return `Great! Let's explore **${topicTitle}**. Since you're a ${level} learner, I'll ${levelPhrase}. Ready to begin?`;
}

function renderContent(text: string) {
  // Simple bold rendering for **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={part}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

export default function TopicDetailPage() {
  const { topicId } = useParams({ from: "/topics/$topicId" });
  const navigate = useNavigate();
  const topicIdNum = Number(topicId);

  const { data: topic, isLoading: topicLoading } = useTopic(topicIdNum);
  const { data: session, isLoading: sessionLoading } =
    useLearningSession(topicIdNum);
  const sendMessage = useSendMessage();
  const markComplete = useMarkTopicCompleted();
  const profile = useAppStore((s) => s.profile);
  const points = useAppStore((s) => s.points);

  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const sessionSeeded = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed welcome message once topic + profile are loaded
  useEffect(() => {
    if (!topic || sessionSeeded.current) return;
    if (sessionLoading) return;

    if (session?.messages && session.messages.length > 0) {
      sessionSeeded.current = true;
      setLocalMessages(
        session.messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      );
    } else {
      sessionSeeded.current = true;
      const skillLevel: SkillLevel = profile?.skillLevel ?? "beginner";
      setLocalMessages([
        {
          role: "assistant",
          content: buildWelcomeMessage(topic.title, skillLevel),
        },
      ]);
    }
  }, [topic, session, sessionLoading, profile]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sendMessage.isPending) return;
    setInput("");
    setLocalMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const resp = await sendMessage.mutateAsync({
        topicId: topicIdNum,
        message: text,
      });
      if (resp) {
        setLocalMessages((prev) => [
          ...prev,
          { role: "assistant", content: resp.content },
        ]);
      }
    } catch {
      setLocalMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMarkComplete = async () => {
    if (isCompleted || markComplete.isPending) return;
    try {
      const earned = await markComplete.mutateAsync(topicIdNum);
      setIsCompleted(true);
      const pts = Number(earned);
      toast.success(
        `🎉 Topic completed! You earned ${pts} point${pts !== 1 ? "s" : ""}.`,
        { duration: 5000 },
      );
    } catch {
      toast.error("Couldn't mark topic as complete. Please try again.");
    }
  };

  const difficultyClass =
    DIFFICULTY_COLORS[topic?.difficulty ?? "easy"] ?? DIFFICULTY_COLORS.easy;

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)]"
      data-ocid="topic_detail.page"
    >
      {/* ── Topic Header ──────────────────────────────────────────── */}
      <div className="bg-card border-b border-border shrink-0">
        <div className="px-4 lg:px-6 py-3 flex items-start justify-between gap-3">
          {/* Left: back + topic info */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => navigate({ to: "/topics" })}
              className="p-1.5 rounded-lg hover:bg-muted transition-smooth shrink-0 mt-0.5"
              aria-label="Back to topics"
              data-ocid="topic_detail.back_button"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {topicLoading ? (
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-28 mt-1" />
              </div>
            ) : (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-semibold text-lg text-foreground leading-tight truncate">
                    {topic?.title ?? "Learning Session"}
                  </h1>
                  {topic?.difficulty && (
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize",
                        difficultyClass,
                      )}
                    >
                      {topic.difficulty}
                    </span>
                  )}
                  {topic?.category && (
                    <Badge variant="secondary" className="capitalize text-xs">
                      {topic.category}
                    </Badge>
                  )}
                </div>
                {topic?.description && (
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {topic.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate({ to: "/quiz/$topicId", params: { topicId } })
              }
              data-ocid="topic_detail.generate_quiz_button"
              className="hidden sm:flex items-center gap-1.5"
            >
              <ClipboardList className="w-4 h-4" />
              Generate Quiz
            </Button>
            <Button
              size="sm"
              onClick={handleMarkComplete}
              disabled={isCompleted || markComplete.isPending}
              data-ocid="topic_detail.mark_complete_button"
              className={cn(
                "flex items-center gap-1.5 transition-smooth",
                isCompleted
                  ? "bg-chart-2 hover:bg-chart-2 text-white border-chart-2"
                  : "",
              )}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Completed!</span>
                </>
              ) : markComplete.isPending ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Saving…</span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark Complete</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Points bar */}
        {points > 0 && (
          <div className="px-4 lg:px-6 pb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>{points.toLocaleString()} points earned</span>
          </div>
        )}
      </div>

      {/* ── Messages ──────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 lg:px-8 py-5 space-y-4 bg-background"
        data-ocid="topic_detail.chat_panel"
      >
        {/* Loading skeleton while seeding */}
        {(topicLoading || sessionLoading) && localMessages.length === 0 && (
          <div className="flex gap-3" data-ocid="topic_detail.loading_state">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {localMessages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            data-ocid={`topic_detail.message.item.${i + 1}`}
            className={cn(
              "flex gap-3 message-fade",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {/* AI avatar */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-primary/20">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm shadow-subtle"
                  : "bg-card border border-border text-foreground rounded-tl-sm shadow-subtle",
              )}
            >
              {renderContent(msg.content)}
            </div>

            {/* User avatar */}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-accent/20">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {sendMessage.isPending && (
          <div
            className="flex gap-3 message-fade"
            data-ocid="topic_detail.ai_loading_state"
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 ring-1 ring-primary/20">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick action bar (mobile quiz button) ─────────────────── */}
      <div className="sm:hidden bg-muted/40 border-t border-border px-4 py-2 flex gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 flex items-center gap-1.5 text-xs"
          onClick={() =>
            navigate({ to: "/quiz/$topicId", params: { topicId } })
          }
          data-ocid="topic_detail.mobile_quiz_button"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          Generate Quiz
        </Button>
      </div>

      {/* ── Input ─────────────────────────────────────────────────── */}
      <div className="bg-card border-t border-border px-4 lg:px-8 py-4 shrink-0">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            ref={inputRef}
            placeholder={
              topic?.title ? `Ask about ${topic.title}…` : "Ask me anything…"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={sendMessage.isPending}
            data-ocid="topic_detail.message_input"
            className="flex-1 bg-background"
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || sendMessage.isPending}
            data-ocid="topic_detail.send_button"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 select-none">
          Press{" "}
          <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-xs font-mono">
            Enter
          </kbd>{" "}
          to send · AI responses powered by LLM
        </p>
      </div>
    </div>
  );
}
