import { c as createLucideIcon, f as useNavigate, a as useAppStore, j as jsxRuntimeExports, e as cn, g as PointsBadge, Z as Zap, b as Button, d as BookOpen, C as ChartColumn } from "./index-CGW6bGON.js";
import { C as Card, a as CardContent, b as CardHeader } from "./card-BIPMfsD4.js";
import { S as Skeleton } from "./skeleton-D3UDbUyT.js";
import { a as useUserProfile, b as useProgress, c as useTopics } from "./useBackend-BW7wBvPB.js";
import { S as SKILL_LEVEL_LABELS, F as Flame, L as Lock, B as BADGE_LABELS } from "./index-VQGPvFgt.js";
import { m as motion } from "./proxy-_88GIV2l.js";
import { C as CircleCheck } from "./circle-check-BpSFtftz.js";
import { T as Target } from "./target-BCofe2u2.js";
import { S as Sparkles } from "./sparkles-DUi7Hr3A.js";
import { T as Trophy } from "./trophy-DTk-Y7qX.js";
import { C as ChevronRight } from "./chevron-right-dnH2lRLK.js";
import { S as Star } from "./star-BkkJWPx7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function StatCard({
  icon,
  label,
  value,
  subtext,
  accent,
  glowing,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": ocid,
          className: cn(
            "relative overflow-hidden transition-smooth hover:shadow-elevated",
            accent && "border-accent/40 bg-accent/5",
            glowing && "streak-glow border-accent/60"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: cn(
                    "text-2xl font-bold",
                    accent ? "text-accent" : "text-foreground"
                  ),
                  children: value
                }
              ),
              subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subtext })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  accent ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
                ),
                children: icon
              }
            )
          ] }) })
        }
      )
    }
  );
}
function StatCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-xl" })
  ] }) }) });
}
function SectionHeader({
  icon,
  title,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: title })
    ] }),
    action
  ] });
}
const difficultyColors = {
  easy: "bg-chart-2/10 text-chart-2 dark:text-chart-2 border-chart-2/20",
  medium: "bg-primary/10 text-primary border-primary/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20"
};
function RecommendedTopicCard({
  topic,
  index,
  onStart
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 16 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.35, delay: index * 0.08 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-4 rounded-xl border border-border transition-smooth hover:shadow-elevated hover:border-primary/30 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: topic.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mt-0.5", children: topic.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 capitalize",
                difficultyColors[topic.difficulty] ?? "bg-muted text-muted-foreground border-border"
              ),
              children: topic.difficulty
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "w-full",
            onClick: onStart,
            "data-ocid": `dashboard.recommended_topic.item.${index + 1}.start_button`,
            children: [
              "Start Learning ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-1" })
            ]
          }
        )
      ] })
    }
  );
}
const ALL_BADGES = [
  "firstSteps",
  "quizMaster",
  "perfectScore",
  "streak"
];
const BADGE_EMOJIS = {
  firstSteps: "👣",
  quizMaster: "🏆",
  perfectScore: "⭐",
  streak: "🔥"
};
const skillBadgeVariant = {
  beginner: "bg-chart-2/10 text-chart-2 dark:text-chart-2 border-chart-2/20",
  intermediate: "bg-primary/10 text-primary border-primary/20",
  advanced: "bg-accent/15 text-accent border-accent/30"
};
function DashboardPage() {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const storePoints = useAppStore((s) => s.points);
  const storeBadges = useAppStore((s) => s.badges);
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const displayProfile = userProfile ?? profile;
  const totalPoints = Number((progress == null ? void 0 : progress.totalPoints) ?? storePoints);
  const earnedBadges = (progress == null ? void 0 : progress.badges) ?? storeBadges ?? [];
  const topicsCompleted = Number((progress == null ? void 0 : progress.topicsCompletedCount) ?? 0);
  const accuracy = Number((progress == null ? void 0 : progress.averageAccuracy) ?? 0);
  const streak = Number((progress == null ? void 0 : progress.currentStreak) ?? 0);
  const weakAreas = (progress == null ? void 0 : progress.weakAreas) ?? [];
  const completedTopics = (topics ?? []).slice(0, 5);
  const recommendedTopics = (topics ?? []).slice(-3).reverse();
  const isLoading = profileLoading || progressLoading;
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const skillLabel = displayProfile ? SKILL_LEVEL_LABELS[displayProfile.skillLevel] : null;
  const dailyGoalMessage = (displayProfile == null ? void 0 : displayProfile.learningGoals) ? `Today, focus on: "${displayProfile.learningGoals}". Consistency beats intensity — even 20 minutes of learning compounds over time.` : "Pick one topic and go deep. Small steps, compounded daily, lead to mastery.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
            "data-ocid": "dashboard.greeting.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-52" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36 mt-1" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground", children: [
                  greeting,
                  ", ",
                  (displayProfile == null ? void 0 : displayProfile.name) ?? "Learner",
                  " 👋"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ready to continue your learning journey?" }),
                  skillLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full border",
                        skillBadgeVariant[(displayProfile == null ? void 0 : displayProfile.skillLevel) ?? "beginner"]
                      ),
                      "data-ocid": "dashboard.skill_level.badge",
                      children: skillLabel
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PointsBadge,
                {
                  points: totalPoints,
                  animate: totalPoints > 0,
                  size: "lg",
                  "data-ocid": "dashboard.total_points.badge"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "aria-label": "Progress summary",
            "data-ocid": "dashboard.stats.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {})
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
                  label: "Total Points",
                  value: totalPoints.toLocaleString(),
                  subtext: "Keep earning!",
                  accent: true,
                  ocid: "dashboard.stats.total_points.card"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
                  label: "Topics Completed",
                  value: topicsCompleted,
                  subtext: topicsCompleted === 1 ? "topic done" : "topics done",
                  ocid: "dashboard.stats.topics_completed.card"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }),
                  label: "Quiz Accuracy",
                  value: `${Math.round(accuracy)}%`,
                  subtext: accuracy >= 80 ? "Excellent!" : accuracy >= 60 ? "Good progress" : "Keep practicing",
                  ocid: "dashboard.stats.quiz_accuracy.card"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }),
                  label: "Current Streak",
                  value: `${streak} ${streak === 1 ? "day" : "days"}`,
                  subtext: streak >= 7 ? "🔥 On fire!" : streak > 0 ? "Keep it up!" : "Start today!",
                  glowing: streak >= 3,
                  accent: streak >= 7,
                  ocid: "dashboard.stats.streak.card"
                }
              )
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.1 },
                "data-ocid": "dashboard.todays_goal.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20 bg-primary/5 overflow-hidden relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-1", children: "Today's Goal" }),
                      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: dailyGoalMessage }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            onClick: () => navigate({ to: "/topics" }),
                            "data-ocid": "dashboard.continue_learning.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 mr-1.5" }),
                              "Continue Learning"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            onClick: () => navigate({ to: "/topics" }),
                            "data-ocid": "dashboard.take_quiz.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 mr-1.5" }),
                              "Take a Quiz"
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] }) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.15 },
                "data-ocid": "dashboard.topics_completed.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                      title: "Topics Completed",
                      action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "text-xs text-muted-foreground h-7",
                          onClick: () => navigate({ to: "/topics" }),
                          "data-ocid": "dashboard.topics_completed.view_all.button",
                          children: [
                            "Browse Topics",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-0.5" })
                          ]
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: topicsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "space-y-3",
                      "data-ocid": "dashboard.topics_completed.loading_state",
                      children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-lg" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
                          ]
                        },
                        k
                      ))
                    }
                  ) : completedTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-8 text-center",
                      "data-ocid": "dashboard.topics_completed.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "No topics completed yet." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            onClick: () => navigate({ to: "/topics" }),
                            "data-ocid": "dashboard.topics_completed.start.button",
                            children: "Browse Topics"
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mt-3", children: completedTopics.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.li,
                    {
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.3, delay: i * 0.06 },
                      "data-ocid": `dashboard.topics_completed.item.${i + 1}`,
                      className: "flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-smooth cursor-pointer",
                      onClick: () => navigate({
                        to: "/topics/$topicId",
                        params: { topicId: String(topic.id) }
                      }),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: topic.title }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize", children: topic.category })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PointsBadge,
                          {
                            points: 50 + i * 10,
                            size: "sm",
                            "data-ocid": `dashboard.topics_completed.points.${i + 1}`
                          }
                        )
                      ]
                    },
                    topic.id
                  )) }) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.2 },
                "data-ocid": "dashboard.weak_areas.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
                      title: "Weak Areas",
                      action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "text-xs text-muted-foreground h-7",
                          onClick: () => navigate({ to: "/progress" }),
                          "data-ocid": "dashboard.weak_areas.view_progress.button",
                          children: [
                            "View Progress",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-0.5" })
                          ]
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: progressLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "space-y-3 mt-3",
                      "data-ocid": "dashboard.weak_areas.loading_state",
                      children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-36" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
                          ]
                        },
                        k
                      ))
                    }
                  ) : weakAreas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 mt-3 py-3.5 px-4 rounded-lg bg-chart-2/5 border border-chart-2/20",
                      "data-ocid": "dashboard.weak_areas.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-chart-2 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-chart-2", children: "No weak areas yet! Keep up the great work. 🎉" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mt-3", children: weakAreas.map((area, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.li,
                    {
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.3, delay: i * 0.06 },
                      "data-ocid": `dashboard.weak_areas.item.${i + 1}`,
                      className: "flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg bg-destructive/5 border border-destructive/15 hover:border-destructive/30 transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: area.topicTitle })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full border border-destructive/20 shrink-0", children: [
                          Math.round(Number(area.averageAccuracy)),
                          "%"
                        ] })
                      ]
                    },
                    area.topicId
                  )) }) })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.1 },
                "data-ocid": "dashboard.badges.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
                      title: "Badges"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: progressLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "grid grid-cols-2 gap-4 mt-2",
                      "data-ocid": "dashboard.badges.loading_state",
                      children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-2xl" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
                      ] }, k))
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mt-2", children: ALL_BADGES.map((badge, i) => {
                    const earned = earnedBadges.includes(badge);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.85 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { duration: 0.3, delay: i * 0.07 },
                        "data-ocid": `dashboard.badges.item.${i + 1}`,
                        className: cn(
                          "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-smooth",
                          earned ? "opacity-100" : "opacity-40"
                        ),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-smooth",
                                earned ? "bg-accent/15 border-2 border-accent/40 badge-pulse" : "bg-muted border-2 border-border"
                              ),
                              children: earned ? BADGE_EMOJIS[badge] : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-muted-foreground" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-center text-muted-foreground leading-tight", children: BADGE_LABELS[badge] })
                        ]
                      },
                      badge
                    );
                  }) }) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.18 },
                "data-ocid": "dashboard.recommended_topics.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                      title: "Recommended"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5 space-y-3 mt-2", children: topicsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "space-y-3",
                      "data-ocid": "dashboard.recommended_topics.loading_state",
                      children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "space-y-2 p-3 rounded-xl border border-border",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-full rounded-md" })
                          ]
                        },
                        k
                      ))
                    }
                  ) : recommendedTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-6 text-center",
                      "data-ocid": "dashboard.recommended_topics.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-muted-foreground/40 mx-auto mb-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No recommendations yet." })
                      ]
                    }
                  ) : recommendedTopics.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RecommendedTopicCard,
                    {
                      topic,
                      index: i,
                      onStart: () => navigate({
                        to: "/topics/$topicId",
                        params: { topicId: String(topic.id) }
                      })
                    },
                    topic.id
                  )) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.25 },
                "data-ocid": "dashboard.quick_actions.section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Quick Actions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full justify-start",
                      variant: "outline",
                      onClick: () => navigate({ to: "/topics" }),
                      "data-ocid": "dashboard.browse_topics.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 mr-2 text-primary" }),
                        "Browse Topics",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto text-muted-foreground" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full justify-start",
                      variant: "outline",
                      onClick: () => navigate({ to: "/progress" }),
                      "data-ocid": "dashboard.view_progress.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 mr-2 text-primary" }),
                        "View Progress",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto text-muted-foreground" })
                      ]
                    }
                  )
                ] }) })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  DashboardPage as default
};
