import { BadgeIcon, PointsBadge } from "@/components/ui/PointsBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress, useTopics, useUserProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { Badge as BadgeType, Topic, WeakArea } from "@/types";
import { BADGE_LABELS, SKILL_LEVEL_LABELS } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Lock,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  accent?: boolean;
  glowing?: boolean;
  ocid: string;
}

function StatCard({
  icon,
  label,
  value,
  subtext,
  accent,
  glowing,
  ocid,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        data-ocid={ocid}
        className={cn(
          "relative overflow-hidden transition-smooth hover:shadow-elevated",
          accent && "border-accent/40 bg-accent/5",
          glowing && "streak-glow border-accent/60",
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {label}
              </p>
              <p
                className={cn(
                  "text-2xl font-bold",
                  accent ? "text-accent" : "text-foreground",
                )}
              >
                {value}
              </p>
              {subtext && (
                <p className="text-xs text-muted-foreground">{subtext}</p>
              )}
            </div>
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                accent
                  ? "bg-accent/15 text-accent"
                  : "bg-primary/10 text-primary",
              )}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}

// ─── Difficulty badge colors ──────────────────────────────────────────────────
const difficultyColors: Record<string, string> = {
  easy: "bg-chart-2/10 text-chart-2 dark:text-chart-2 border-chart-2/20",
  medium: "bg-primary/10 text-primary border-primary/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
};

// ─── Recommended Topic Card ───────────────────────────────────────────────────
function RecommendedTopicCard({
  topic,
  index,
  onStart,
}: {
  topic: Topic;
  index: number;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-border transition-smooth hover:shadow-elevated hover:border-primary/30 bg-card">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">
              {topic.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {topic.description}
            </p>
          </div>
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 capitalize",
              difficultyColors[topic.difficulty] ??
                "bg-muted text-muted-foreground border-border",
            )}
          >
            {topic.difficulty}
          </span>
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={onStart}
          data-ocid={`dashboard.recommended_topic.item.${index + 1}.start_button`}
        >
          Start Learning <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── All badge keys (static list for locked/unlocked display) ────────────────
const ALL_BADGES: BadgeType[] = [
  "firstSteps",
  "quizMaster",
  "perfectScore",
  "streak",
];

const BADGE_EMOJIS: Record<BadgeType, string> = {
  firstSteps: "👣",
  quizMaster: "🏆",
  perfectScore: "⭐",
  streak: "🔥",
};

const skillBadgeVariant: Record<string, string> = {
  beginner: "bg-chart-2/10 text-chart-2 dark:text-chart-2 border-chart-2/20",
  intermediate: "bg-primary/10 text-primary border-primary/20",
  advanced: "bg-accent/15 text-accent border-accent/30",
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const storePoints = useAppStore((s) => s.points);
  const storeBadges = useAppStore((s) => s.badges);

  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: topics, isLoading: topicsLoading } = useTopics();

  const displayProfile = userProfile ?? profile;
  const totalPoints = Number(progress?.totalPoints ?? storePoints);
  const earnedBadges: BadgeType[] = progress?.badges ?? storeBadges ?? [];
  const topicsCompleted = Number(progress?.topicsCompletedCount ?? 0);
  const accuracy = Number(progress?.averageAccuracy ?? 0);
  const streak = Number(progress?.currentStreak ?? 0);
  const weakAreas: WeakArea[] = progress?.weakAreas ?? [];

  // Recent completions: first 5 topics
  const completedTopics = (topics ?? []).slice(0, 5);
  // Recommended: last 3 topics
  const recommendedTopics = (topics ?? []).slice(-3).reverse();

  const isLoading = profileLoading || progressLoading;

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const skillLabel = displayProfile
    ? SKILL_LEVEL_LABELS[displayProfile.skillLevel]
    : null;

  const dailyGoalMessage = displayProfile?.learningGoals
    ? `Today, focus on: "${displayProfile.learningGoals}". Consistency beats intensity — even 20 minutes of learning compounds over time.`
    : "Pick one topic and go deep. Small steps, compounded daily, lead to mastery.";

  return (
    <div
      className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto"
      data-ocid="dashboard.page"
    >
      {/* ── Hero Greeting ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        data-ocid="dashboard.greeting.section"
      >
        <div className="space-y-1">
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-52" />
              <Skeleton className="h-4 w-36 mt-1" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-foreground">
                {greeting}, {displayProfile?.name ?? "Learner"} 👋
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  Ready to continue your learning journey?
                </p>
                {skillLabel && (
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full border",
                      skillBadgeVariant[
                        displayProfile?.skillLevel ?? "beginner"
                      ],
                    )}
                    data-ocid="dashboard.skill_level.badge"
                  >
                    {skillLabel}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <PointsBadge
          points={totalPoints}
          animate={totalPoints > 0}
          size="lg"
          data-ocid="dashboard.total_points.badge"
        />
      </motion.div>

      {/* ── Stats Row ────────────────────────────────────────────────────────── */}
      <section
        aria-label="Progress summary"
        data-ocid="dashboard.stats.section"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                icon={<Zap className="w-5 h-5" />}
                label="Total Points"
                value={totalPoints.toLocaleString()}
                subtext="Keep earning!"
                accent
                ocid="dashboard.stats.total_points.card"
              />
              <StatCard
                icon={<CheckCircle2 className="w-5 h-5" />}
                label="Topics Completed"
                value={topicsCompleted}
                subtext={topicsCompleted === 1 ? "topic done" : "topics done"}
                ocid="dashboard.stats.topics_completed.card"
              />
              <StatCard
                icon={<Target className="w-5 h-5" />}
                label="Quiz Accuracy"
                value={`${Math.round(accuracy)}%`}
                subtext={
                  accuracy >= 80
                    ? "Excellent!"
                    : accuracy >= 60
                      ? "Good progress"
                      : "Keep practicing"
                }
                ocid="dashboard.stats.quiz_accuracy.card"
              />
              <StatCard
                icon={<Flame className="w-5 h-5" />}
                label="Current Streak"
                value={`${streak} ${streak === 1 ? "day" : "days"}`}
                subtext={
                  streak >= 7
                    ? "🔥 On fire!"
                    : streak > 0
                      ? "Keep it up!"
                      : "Start today!"
                }
                glowing={streak >= 3}
                accent={streak >= 7}
                ocid="dashboard.stats.streak.card"
              />
            </>
          )}
        </div>
      </section>

      {/* ── Main Content Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* ── Left / Center Column ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Goal */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            data-ocid="dashboard.todays_goal.section"
          >
            <Card className="border-primary/20 bg-primary/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-foreground mb-1">
                      Today's Goal
                    </h2>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {dailyGoalMessage}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => navigate({ to: "/topics" })}
                        data-ocid="dashboard.continue_learning.button"
                      >
                        <BookOpen className="w-4 h-4 mr-1.5" />
                        Continue Learning
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate({ to: "/topics" })}
                        data-ocid="dashboard.take_quiz.button"
                      >
                        <Trophy className="w-4 h-4 mr-1.5" />
                        Take a Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Topics Completed */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            data-ocid="dashboard.topics_completed.section"
          >
            <Card>
              <CardHeader className="pb-2 pt-5 px-5">
                <SectionHeader
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  title="Topics Completed"
                  action={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground h-7"
                      onClick={() => navigate({ to: "/topics" })}
                      data-ocid="dashboard.topics_completed.view_all.button"
                    >
                      Browse Topics{" "}
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Button>
                  }
                />
              </CardHeader>
              <CardContent className="px-5 pb-5">
                {topicsLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="dashboard.topics_completed.loading_state"
                  >
                    {(["a", "b", "c"] as const).map((k) => (
                      <div
                        key={k}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-8 h-8 rounded-lg" />
                          <div className="space-y-1.5">
                            <Skeleton className="h-3.5 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : completedTopics.length === 0 ? (
                  <div
                    className="py-8 text-center"
                    data-ocid="dashboard.topics_completed.empty_state"
                  >
                    <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      No topics completed yet.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => navigate({ to: "/topics" })}
                      data-ocid="dashboard.topics_completed.start.button"
                    >
                      Browse Topics
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-2.5 mt-3">
                    {completedTopics.map((topic, i) => (
                      <motion.li
                        key={topic.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        data-ocid={`dashboard.topics_completed.item.${i + 1}`}
                        className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-smooth cursor-pointer"
                        onClick={() =>
                          navigate({
                            to: "/topics/$topicId",
                            params: { topicId: String(topic.id) },
                          })
                        }
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Star className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {topic.title}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {topic.category}
                            </p>
                          </div>
                        </div>
                        <PointsBadge
                          points={50 + i * 10}
                          size="sm"
                          data-ocid={`dashboard.topics_completed.points.${i + 1}`}
                        />
                      </motion.li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.section>

          {/* Weak Areas */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            data-ocid="dashboard.weak_areas.section"
          >
            <Card>
              <CardHeader className="pb-2 pt-5 px-5">
                <SectionHeader
                  icon={<AlertTriangle className="w-4 h-4" />}
                  title="Weak Areas"
                  action={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground h-7"
                      onClick={() => navigate({ to: "/progress" })}
                      data-ocid="dashboard.weak_areas.view_progress.button"
                    >
                      View Progress{" "}
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Button>
                  }
                />
              </CardHeader>
              <CardContent className="px-5 pb-5">
                {progressLoading ? (
                  <div
                    className="space-y-3 mt-3"
                    data-ocid="dashboard.weak_areas.loading_state"
                  >
                    {(["a", "b"] as const).map((k) => (
                      <div
                        key={k}
                        className="flex items-center justify-between"
                      >
                        <Skeleton className="h-3.5 w-36" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : weakAreas.length === 0 ? (
                  <div
                    className="flex items-center gap-3 mt-3 py-3.5 px-4 rounded-lg bg-chart-2/5 border border-chart-2/20"
                    data-ocid="dashboard.weak_areas.empty_state"
                  >
                    <CheckCircle2 className="w-5 h-5 text-chart-2 shrink-0" />
                    <p className="text-sm font-medium text-chart-2">
                      No weak areas yet! Keep up the great work. 🎉
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-2.5 mt-3">
                    {weakAreas.map((area, i) => (
                      <motion.li
                        key={area.topicId}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        data-ocid={`dashboard.weak_areas.item.${i + 1}`}
                        className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg bg-destructive/5 border border-destructive/15 hover:border-destructive/30 transition-smooth"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                          <p className="text-sm font-medium text-foreground truncate">
                            {area.topicTitle}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full border border-destructive/20 shrink-0">
                          {Math.round(Number(area.averageAccuracy))}%
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* ── Right Column ─────────────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Badges Showcase */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            data-ocid="dashboard.badges.section"
          >
            <Card>
              <CardHeader className="pb-2 pt-5 px-5">
                <SectionHeader
                  icon={<Trophy className="w-4 h-4" />}
                  title="Badges"
                />
              </CardHeader>
              <CardContent className="px-5 pb-5">
                {progressLoading ? (
                  <div
                    className="grid grid-cols-2 gap-4 mt-2"
                    data-ocid="dashboard.badges.loading_state"
                  >
                    {(["a", "b", "c", "d"] as const).map((k) => (
                      <div key={k} className="flex flex-col items-center gap-2">
                        <Skeleton className="w-12 h-12 rounded-2xl" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {ALL_BADGES.map((badge, i) => {
                      const earned = earnedBadges.includes(badge);
                      return (
                        <motion.div
                          key={badge}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.07 }}
                          data-ocid={`dashboard.badges.item.${i + 1}`}
                          className={cn(
                            "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-smooth",
                            earned ? "opacity-100" : "opacity-40",
                          )}
                        >
                          <div
                            className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-smooth",
                              earned
                                ? "bg-accent/15 border-2 border-accent/40 badge-pulse"
                                : "bg-muted border-2 border-border",
                            )}
                          >
                            {earned ? (
                              BADGE_EMOJIS[badge]
                            ) : (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-center text-muted-foreground leading-tight">
                            {BADGE_LABELS[badge]}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.section>

          {/* Recommended Topics */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            data-ocid="dashboard.recommended_topics.section"
          >
            <Card>
              <CardHeader className="pb-2 pt-5 px-5">
                <SectionHeader
                  icon={<Sparkles className="w-4 h-4" />}
                  title="Recommended"
                />
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3 mt-2">
                {topicsLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="dashboard.recommended_topics.loading_state"
                  >
                    {(["a", "b", "c"] as const).map((k) => (
                      <div
                        key={k}
                        className="space-y-2 p-3 rounded-xl border border-border"
                      >
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-7 w-full rounded-md" />
                      </div>
                    ))}
                  </div>
                ) : recommendedTopics.length === 0 ? (
                  <div
                    className="py-6 text-center"
                    data-ocid="dashboard.recommended_topics.empty_state"
                  >
                    <Sparkles className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      No recommendations yet.
                    </p>
                  </div>
                ) : (
                  recommendedTopics.map((topic, i) => (
                    <RecommendedTopicCard
                      key={topic.id}
                      topic={topic}
                      index={i}
                      onStart={() =>
                        navigate({
                          to: "/topics/$topicId",
                          params: { topicId: String(topic.id) },
                        })
                      }
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </motion.section>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            data-ocid="dashboard.quick_actions.section"
          >
            <Card className="bg-muted/30">
              <CardContent className="p-5 space-y-2.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Quick Actions
                </p>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate({ to: "/topics" })}
                  data-ocid="dashboard.browse_topics.button"
                >
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  Browse Topics
                  <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate({ to: "/progress" })}
                  data-ocid="dashboard.view_progress.button"
                >
                  <BarChart3 className="w-4 h-4 mr-2 text-primary" />
                  View Progress
                  <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
