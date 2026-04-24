import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopics } from "@/hooks/useBackend";
import { useAppStore } from "@/store/useAppStore";
import type { DifficultyLevel, Topic } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type DifficultyFilter = "all" | DifficultyLevel;

// ─── Sample data ─────────────────────────────────────────────────────────────

const sampleTopics: Topic[] = [
  {
    id: 1,
    title: "Python Fundamentals",
    description:
      "Master variables, data types, control flow, functions, and modules. The ideal starting point for any programmer.",
    difficulty: "easy",
    category: "Programming",
    createdAt: BigInt(0),
  },
  {
    id: 2,
    title: "World History: Ancient Civilizations",
    description:
      "Explore Mesopotamia, Egypt, Greece and Rome — the foundations of modern civilization.",
    difficulty: "easy",
    category: "History",
    createdAt: BigInt(0),
  },
  {
    id: 3,
    title: "Algebra & Linear Equations",
    description:
      "Solve single and multi-variable equations, inequalities, and graphs with step-by-step guidance.",
    difficulty: "medium",
    category: "Mathematics",
    createdAt: BigInt(0),
  },
  {
    id: 4,
    title: "Cell Biology & Genetics",
    description:
      "Understand DNA replication, cell division, Mendelian inheritance, and gene expression.",
    difficulty: "medium",
    category: "Science",
    createdAt: BigInt(0),
  },
  {
    id: 5,
    title: "React & TypeScript",
    description:
      "Component patterns, hooks, state management, and type safety for modern web apps.",
    difficulty: "medium",
    category: "Programming",
    createdAt: BigInt(0),
  },
  {
    id: 6,
    title: "Spanish for Beginners",
    description:
      "Greetings, everyday vocabulary, verb conjugations, and basic conversational Spanish.",
    difficulty: "easy",
    category: "Languages",
    createdAt: BigInt(0),
  },
  {
    id: 7,
    title: "Calculus: Derivatives & Integrals",
    description:
      "From limits to the Fundamental Theorem of Calculus — rigorous proofs and practical examples.",
    difficulty: "hard",
    category: "Mathematics",
    createdAt: BigInt(0),
  },
  {
    id: 8,
    title: "Machine Learning Basics",
    description:
      "Supervised learning, gradient descent, neural network fundamentals, and model evaluation.",
    difficulty: "hard",
    category: "Science",
    createdAt: BigInt(0),
  },
  {
    id: 9,
    title: "The French Revolution",
    description:
      "Causes, key figures, the Reign of Terror, and the lasting political legacy of 1789.",
    difficulty: "medium",
    category: "History",
    createdAt: BigInt(0),
  },
];

// Simulate completion status for sample data (ids 1 and 6 completed, 3 in-progress)
const sampleCompletedIds = new Set([1, 6]);
const sampleInProgressIds = new Set([3]);

// Recommended topic ids based on popularity
const recommendedIds = [5, 7, 4];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const difficultyConfig: Record<
  DifficultyLevel,
  { label: string; className: string; dotClass: string }
> = {
  easy: {
    label: "Easy",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    dotClass: "bg-chart-2",
  },
  medium: {
    label: "Medium",
    className: "bg-primary/10 text-primary border-primary/30",
    dotClass: "bg-primary",
  },
  hard: {
    label: "Hard",
    className: "bg-destructive/10 text-destructive border-destructive/30",
    dotClass: "bg-destructive",
  },
};

const filterButtons: { label: string; value: DifficultyFilter }[] = [
  { label: "All", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function getCompletionStatus(
  id: number,
  completedSet: Set<number>,
  inProgressSet: Set<number>,
): "completed" | "in-progress" | "new" {
  if (completedSet.has(id)) return "completed";
  if (inProgressSet.has(id)) return "in-progress";
  return "new";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TopicCardProps {
  topic: Topic;
  index: number;
  completionStatus: "completed" | "in-progress" | "new";
  onStart: (id: number) => void;
}

function TopicCard({
  topic,
  index,
  completionStatus,
  onStart,
}: TopicCardProps) {
  const diff = difficultyConfig[topic.difficulty];
  const isCompleted = completionStatus === "completed";
  const isInProgress = completionStatus === "in-progress";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        data-ocid={`topics.item.${index + 1}`}
        className={`group relative flex flex-col h-full cursor-pointer transition-smooth border-border hover:border-primary/30 hover:shadow-elevated overflow-hidden ${
          isCompleted ? "opacity-90" : ""
        }`}
        onClick={() => onStart(topic.id)}
      >
        {/* Completed overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-primary/5 pointer-events-none z-10 flex items-start justify-end p-3">
            <span className="flex items-center gap-1 text-xs font-medium text-chart-2 bg-chart-2/15 border border-chart-2/30 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          </div>
        )}

        <CardHeader className="pb-2 flex-none">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold group-hover:text-primary transition-smooth leading-snug line-clamp-2">
              {topic.title}
            </CardTitle>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0 mt-0.5" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 gap-3">
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {topic.description}
          </p>

          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium ${diff.className}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${diff.dotClass}`} />
              {diff.label}
            </span>
            <Badge variant="secondary" className="text-xs font-medium">
              {topic.category}
            </Badge>
            {isInProgress && (
              <Badge
                variant="outline"
                className="text-xs border-primary/40 text-primary bg-primary/5"
              >
                In Progress
              </Badge>
            )}
            {completionStatus === "new" && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                New
              </Badge>
            )}
          </div>

          {/* Action button */}
          <Button
            size="sm"
            variant={isCompleted ? "outline" : "default"}
            className="w-full mt-1"
            data-ocid={`topics.start_button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onStart(topic.id);
            }}
          >
            {isCompleted
              ? "Review"
              : isInProgress
                ? "Continue"
                : "Start Learning"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TopicsPage() {
  const navigate = useNavigate();
  const { data: fetchedTopics, isLoading } = useTopics();
  const profile = useAppStore((s) => s.profile);

  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState<DifficultyFilter>("all");

  const topics = useMemo(
    () =>
      fetchedTopics && fetchedTopics.length > 0 ? fetchedTopics : sampleTopics,
    [fetchedTopics],
  );

  const recommendedTopics = useMemo(
    () => topics.filter((t) => recommendedIds.includes(t.id)).slice(0, 3),
    [topics],
  );

  const filteredTopics = useMemo(() => {
    const q = search.toLowerCase();
    return topics.filter((t) => {
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      const matchesDiff = diffFilter === "all" || t.difficulty === diffFilter;
      return matchesSearch && matchesDiff;
    });
  }, [topics, search, diffFilter]);

  function handleNavigate(id: number) {
    navigate({
      to: "/topics/$topicId",
      params: { topicId: String(id) },
    });
  }

  const greeting = profile?.name ? `for ${profile.name}` : "for You";

  return (
    <div className="min-h-full bg-background">
      {/* Page header band */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <h1 className="font-display font-bold text-3xl text-foreground">
                Choose What to Learn
              </h1>
              <p className="text-muted-foreground mt-1.5 text-base">
                Pick a topic and let your AI tutor guide you step by step
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search topics or categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="topics.search_input"
              />
            </div>
          </div>

          {/* Difficulty filter buttons */}
          <div
            className="flex items-center gap-2 mt-5 flex-wrap"
            data-ocid="topics.difficulty_filter"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                type="button"
                data-ocid={`topics.filter.${btn.value}`}
                onClick={() => setDiffFilter(btn.value)}
                className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-smooth ${
                  diffFilter === btn.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 space-y-10">
        {/* Smart Recommendations */}
        {recommendedTopics.length > 0 && !search && diffFilter === "all" && (
          <section data-ocid="topics.recommendations_section">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2 className="font-display font-semibold text-lg text-foreground">
                Smart Recommendations {greeting}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedTopics.map((topic, i) => {
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    data-ocid={`topics.recommendation.${i + 1}`}
                  >
                    <Card
                      className="group cursor-pointer transition-smooth border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 hover:shadow-elevated"
                      onClick={() => handleNavigate(topic.id)}
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-1">
                          <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-smooth leading-snug line-clamp-2">
                            {topic.title}
                          </p>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0 mt-0.5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border font-medium ${
                              difficultyConfig[topic.difficulty].className
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                difficultyConfig[topic.difficulty].dotClass
                              }`}
                            />
                            {difficultyConfig[topic.difficulty].label}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {topic.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* All Topics */}
        <section data-ocid="topics.all_section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-foreground">
              {diffFilter === "all"
                ? "All Topics"
                : `${difficultyConfig[diffFilter].label} Topics`}
              {search && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  — results for "{search}"
                </span>
              )}
            </h2>
            {(search || diffFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                data-ocid="topics.clear_filters_button"
                onClick={() => {
                  setSearch("");
                  setDiffFilter("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="topics.loading_state"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 pt-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-9 w-full mt-1 rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredTopics.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No topics found"
              description={
                search
                  ? `No topics match "${search}". Try adjusting your search or filters.`
                  : "No topics match the selected difficulty. Try a different filter."
              }
              action={{
                label: "Clear filters",
                onClick: () => {
                  setSearch("");
                  setDiffFilter("all");
                },
                "data-ocid": "topics.clear_filters_action_button",
              }}
              data-ocid="topics.empty_state"
            />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="topics.list"
            >
              {filteredTopics.map((topic, i) => {
                const status = getCompletionStatus(
                  topic.id,
                  sampleCompletedIds,
                  sampleInProgressIds,
                );
                return (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    index={i}
                    completionStatus={status}
                    onStart={handleNavigate}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
