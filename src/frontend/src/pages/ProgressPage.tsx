import { BadgeIcon } from "@/components/ui/PointsBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress, useQuizAttempts } from "@/hooks/useBackend";
import type { Badge as BadgeType, QuizAttempt, WeakArea } from "@/types";
import { BADGE_LABELS } from "@/types";
import {
  BookOpen,
  CheckCircle2,
  Flame,
  Lock,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Constants ───────────────────────────────────────────────────────────────

const ALL_BADGES: { key: BadgeType; emoji: string; desc: string }[] = [
  { key: "firstSteps", emoji: "👣", desc: "Complete your first topic" },
  { key: "quizMaster", emoji: "🏆", desc: "Score 80%+ on 5 quizzes" },
  { key: "perfectScore", emoji: "⭐", desc: "Get 100% on any quiz" },
  { key: "streak", emoji: "🔥", desc: "Maintain a 7-day streak" },
];

// Categories for topics chart — derived from mock if no real data
const CATEGORY_COLORS = [
  "oklch(0.68 0.25 45)",
  "oklch(0.70 0.11 250)",
  "oklch(0.65 0.18 140)",
  "oklch(0.68 0.15 200)",
  "oklch(0.58 0.17 10)",
];

function getMotivationalMessage(
  accuracy: number,
  streak: number,
  topicsCount: number,
): { title: string; body: string; color: string } {
  if (topicsCount === 0)
    return {
      title: "Ready to Begin?",
      body: "Pick a topic and start your learning journey. Your first step counts!",
      color: "text-primary",
    };
  if (accuracy >= 90 && streak >= 5)
    return {
      title: "You're on Fire! 🔥",
      body: `${accuracy}% accuracy and a ${streak}-day streak — you're unstoppable. Keep pushing!`,
      color: "text-accent",
    };
  if (accuracy >= 75)
    return {
      title: "Great Progress!",
      body: `${accuracy}% average accuracy is impressive. Focus on your weak areas to reach mastery.`,
      color: "text-primary",
    };
  if (accuracy >= 50)
    return {
      title: "You're Getting There!",
      body: "Consistent practice is the key. Review the topics below and retry the quizzes.",
      color: "text-primary",
    };
  return {
    title: "Keep Going!",
    body: "Learning takes time. Each attempt builds your understanding — don't give up!",
    color: "text-muted-foreground",
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  delay,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border-border shadow-subtle hover:shadow-elevated transition-smooth">
        <CardContent className="p-5 flex items-center gap-3">
          <div className={`rounded-xl p-2.5 bg-muted ${colorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold font-display text-foreground leading-tight">
              {value}
            </p>
            <p className="text-xs text-muted-foreground truncate">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatsSkeleton() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
      data-ocid="progress.stats_loading_state"
    >
      {(["a", "b", "c", "d", "e"] as const).map((k) => (
        <Card key={k}>
          <CardContent className="p-5">
            <Skeleton className="h-14 w-full rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div
      className="h-52 flex flex-col gap-3 p-4"
      data-ocid="progress.chart_loading_state"
    >
      <Skeleton className="h-4 w-40 rounded" />
      <Skeleton className="flex-1 w-full rounded-lg" />
    </div>
  );
}

function WeakAreasTable({ weakAreas }: { weakAreas: WeakArea[] }) {
  if (weakAreas.length === 0) return null;
  return (
    <Card data-ocid="progress.weak_areas_card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-destructive" />
          Weak Areas
          <span className="text-xs font-normal text-muted-foreground ml-1">
            (accuracy below 70%)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                  Topic
                </th>
                <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">
                  Attempts
                </th>
                <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">
                  Avg Accuracy
                </th>
                <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {weakAreas.map((area, i) => (
                <tr
                  key={area.topicId}
                  data-ocid={`progress.weak_area.item.${i + 1}`}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {area.topicTitle}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {Number(area.attemptCount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`font-semibold ${
                        Number(area.averageAccuracy) < 50
                          ? "text-destructive"
                          : "text-accent"
                      }`}
                    >
                      {Number(area.averageAccuracy)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge
                      variant="outline"
                      className="text-destructive border-destructive/40 bg-destructive/5 text-xs"
                    >
                      Needs Review
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function AllBadgesReference({ earnedBadges }: { earnedBadges: BadgeType[] }) {
  const earnedSet = new Set(earnedBadges);
  return (
    <Card data-ocid="progress.all_badges_card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" /> All Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ALL_BADGES.map(({ key, emoji, desc }) => {
            const earned = earnedSet.has(key);
            return (
              <motion.div
                key={key}
                data-ocid={`progress.badge.${key}`}
                whileHover={{ scale: 1.04 }}
                className={`relative flex flex-col items-center gap-2 rounded-2xl p-4 border transition-smooth ${
                  earned
                    ? "border-accent/40 bg-accent/8 shadow-elevated"
                    : "border-border bg-muted/30 opacity-60"
                }`}
              >
                {earned && (
                  <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-accent" />
                )}
                {!earned && (
                  <Lock className="absolute top-2 right-2 w-3.5 h-3.5 text-muted-foreground" />
                )}
                <div
                  className={`text-3xl rounded-2xl p-2.5 ${
                    earned
                      ? "badge-pulse bg-accent/15 border-2 border-accent/40"
                      : "bg-muted border-2 border-border grayscale"
                  }`}
                >
                  {emoji}
                </div>
                <div className="text-center">
                  <p
                    className={`text-xs font-semibold ${
                      earned ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {BADGE_LABELS[key]}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ProgressPage() {
  const { data: progress, isLoading } = useProgress();
  const { data: attempts, isLoading: attemptsLoading } = useQuizAttempts();

  // Quiz accuracy line chart — last 10 attempts (oldest → newest)
  const accuracyData = (attempts ?? [])
    .slice(-10)
    .map((a: QuizAttempt, i: number) => ({
      attempt: `#${i + 1}`,
      accuracy: Number(a.accuracy),
    }));

  // Points area chart — cumulative points growth
  let cumulative = 0;
  const pointsData = (attempts ?? [])
    .slice(-10)
    .map((a: QuizAttempt, i: number) => {
      cumulative += Number(a.pointsEarned);
      return { attempt: `#${i + 1}`, points: cumulative };
    });

  // Topics by category BarChart — derived from weak areas (or mock distribution)
  const categoryMap: Record<string, number> = {};
  for (const w of progress?.weakAreas ?? []) {
    const cat = w.topicTitle.split(" ")[0]; // simple heuristic
    categoryMap[cat] = (categoryMap[cat] ?? 0) + 1;
  }
  const categoryData =
    Object.keys(categoryMap).length > 0
      ? Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
      : [
          {
            name: "Programming",
            count: Number(progress?.topicsCompletedCount ?? 2),
          },
          { name: "Design", count: 1 },
          { name: "Math", count: 1 },
        ];

  const motivational = getMotivationalMessage(
    Number(progress?.averageAccuracy ?? 0),
    Number(progress?.currentStreak ?? 0),
    Number(progress?.topicsCompletedCount ?? 0),
  );

  const stats = [
    {
      label: "Total Points",
      value: Number(progress?.totalPoints ?? 0).toLocaleString(),
      icon: Zap,
      colorClass: "text-accent",
    },
    {
      label: "Topics Completed",
      value: Number(progress?.topicsCompletedCount ?? 0),
      icon: BookOpen,
      colorClass: "text-primary",
    },
    {
      label: "Avg Quiz Accuracy",
      value: `${Number(progress?.averageAccuracy ?? 0)}%`,
      icon: Target,
      colorClass: "text-primary",
    },
    {
      label: "Current Streak",
      value: `${Number(progress?.currentStreak ?? 0)} days`,
      icon: Flame,
      colorClass: "text-accent",
    },
    {
      label: "Total Quizzes",
      value: Number(progress?.quizAttemptCount ?? 0),
      icon: TrendingUp,
      colorClass: "text-primary",
    },
  ];

  const earnedBadges = progress?.badges ?? [];

  return (
    <div
      className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto"
      data-ocid="progress.page"
    >
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Progress Report
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track your learning journey and celebrate your achievements
          </p>
        </div>
        {!isLoading && (
          <div
            className={`text-sm font-medium px-4 py-2 rounded-xl border bg-card max-w-xs text-center ${motivational.color}`}
            data-ocid="progress.motivational_message"
          >
            <span className="font-semibold">{motivational.title}</span>
            {" — "}
            <span className="text-muted-foreground text-xs">
              {motivational.body}
            </span>
          </div>
        )}
      </div>

      {/* Stats overview */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          data-ocid="progress.stats_section"
        >
          {stats.map(({ label, value, icon, colorClass }, i) => (
            <StatCard
              key={label}
              label={label}
              value={value}
              icon={icon}
              colorClass={colorClass}
              delay={i * 0.07}
            />
          ))}
        </div>
      )}

      {/* Charts row 1: Accuracy trend + Points history */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Accuracy Line Chart */}
        <Card data-ocid="progress.accuracy_chart_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Quiz Accuracy Trend
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                Last 10 attempts
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {attemptsLoading ? (
              <ChartSkeleton />
            ) : accuracyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={accuracyData}
                  margin={{ top: 4, right: 8, left: -20, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0 0 / 0.5)"
                  />
                  <XAxis
                    dataKey="attempt"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v}%`, "Accuracy"]}
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: "0.5rem",
                      border: "1px solid oklch(0.88 0 0)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="oklch(0.70 0.11 250)"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "oklch(0.70 0.11 250)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="h-48 flex flex-col items-center justify-center gap-2"
                data-ocid="progress.accuracy_chart.empty_state"
              >
                <Target className="w-8 h-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground text-center">
                  Complete some quizzes to see your accuracy trend
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Points Growth Area Chart */}
        <Card data-ocid="progress.points_chart_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Points Growth
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                Cumulative
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {attemptsLoading ? (
              <ChartSkeleton />
            ) : pointsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={pointsData}
                  margin={{ top: 4, right: 8, left: -20, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.68 0.25 45)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.68 0.25 45)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0 0 / 0.5)"
                  />
                  <XAxis
                    dataKey="attempt"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v} pts`, "Total Points"]}
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: "0.5rem",
                      border: "1px solid oklch(0.88 0 0)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="points"
                    stroke="oklch(0.68 0.25 45)"
                    strokeWidth={2.5}
                    fill="url(#pointsGrad)"
                    dot={{ r: 3, fill: "oklch(0.68 0.25 45)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="h-48 flex flex-col items-center justify-center gap-2"
                data-ocid="progress.points_chart.empty_state"
              >
                <Zap className="w-8 h-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground text-center">
                  Earn points by completing quizzes to see growth
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2: Topics by Category + Earned Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topics Completed BarChart */}
        <Card data-ocid="progress.topics_chart_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Topics by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={categoryData}
                  margin={{ top: 4, right: 8, left: -20, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0 0 / 0.5)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(v: number) => [v, "Topics"]}
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: "0.5rem",
                      border: "1px solid oklch(0.88 0 0)",
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <Card data-ocid="progress.earned_badges_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Earned Badges
              {earnedBadges.length > 0 && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {earnedBadges.length} / {ALL_BADGES.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-16 h-20 rounded-2xl" />
                ))}
              </div>
            ) : earnedBadges.length > 0 ? (
              <div className="flex gap-4 flex-wrap">
                {earnedBadges.map((b) => (
                  <motion.div
                    key={b}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <BadgeIcon badge={b} size="lg" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className="h-40 flex flex-col items-center justify-center text-center gap-2"
                data-ocid="progress.earned_badges.empty_state"
              >
                <Trophy className="w-10 h-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  No badges yet — complete topics and quizzes to earn them!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weak Areas Table */}
      <WeakAreasTable weakAreas={progress?.weakAreas ?? []} />

      {/* All Badges Reference */}
      <AllBadgesReference earnedBadges={earnedBadges} />
    </div>
  );
}
