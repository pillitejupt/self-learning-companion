import { c as createLucideIcon, j as jsxRuntimeExports, b as Button, e as cn, f as useNavigate, a as useAppStore, r as reactExports, d as BookOpen } from "./index-CGW6bGON.js";
import { B as Badge } from "./badge-BSUisHQm.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BIPMfsD4.js";
import { I as Input } from "./input-kSUN_RXH.js";
import { S as Skeleton } from "./skeleton-D3UDbUyT.js";
import { c as useTopics } from "./useBackend-BW7wBvPB.js";
import { S as Sparkles } from "./sparkles-DUi7Hr3A.js";
import { m as motion } from "./proxy-_88GIV2l.js";
import { C as ChevronRight } from "./chevron-right-dnH2lRLK.js";
import { C as CircleCheck } from "./circle-check-BpSFtftz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": dataOcid,
      className: cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: action.onClick,
            "data-ocid": action["data-ocid"],
            className: "mt-2",
            children: action.label
          }
        )
      ]
    }
  );
}
const sampleTopics = [
  {
    id: 1,
    title: "Python Fundamentals",
    description: "Master variables, data types, control flow, functions, and modules. The ideal starting point for any programmer.",
    difficulty: "easy",
    category: "Programming",
    createdAt: BigInt(0)
  },
  {
    id: 2,
    title: "World History: Ancient Civilizations",
    description: "Explore Mesopotamia, Egypt, Greece and Rome — the foundations of modern civilization.",
    difficulty: "easy",
    category: "History",
    createdAt: BigInt(0)
  },
  {
    id: 3,
    title: "Algebra & Linear Equations",
    description: "Solve single and multi-variable equations, inequalities, and graphs with step-by-step guidance.",
    difficulty: "medium",
    category: "Mathematics",
    createdAt: BigInt(0)
  },
  {
    id: 4,
    title: "Cell Biology & Genetics",
    description: "Understand DNA replication, cell division, Mendelian inheritance, and gene expression.",
    difficulty: "medium",
    category: "Science",
    createdAt: BigInt(0)
  },
  {
    id: 5,
    title: "React & TypeScript",
    description: "Component patterns, hooks, state management, and type safety for modern web apps.",
    difficulty: "medium",
    category: "Programming",
    createdAt: BigInt(0)
  },
  {
    id: 6,
    title: "Spanish for Beginners",
    description: "Greetings, everyday vocabulary, verb conjugations, and basic conversational Spanish.",
    difficulty: "easy",
    category: "Languages",
    createdAt: BigInt(0)
  },
  {
    id: 7,
    title: "Calculus: Derivatives & Integrals",
    description: "From limits to the Fundamental Theorem of Calculus — rigorous proofs and practical examples.",
    difficulty: "hard",
    category: "Mathematics",
    createdAt: BigInt(0)
  },
  {
    id: 8,
    title: "Machine Learning Basics",
    description: "Supervised learning, gradient descent, neural network fundamentals, and model evaluation.",
    difficulty: "hard",
    category: "Science",
    createdAt: BigInt(0)
  },
  {
    id: 9,
    title: "The French Revolution",
    description: "Causes, key figures, the Reign of Terror, and the lasting political legacy of 1789.",
    difficulty: "medium",
    category: "History",
    createdAt: BigInt(0)
  }
];
const sampleCompletedIds = /* @__PURE__ */ new Set([1, 6]);
const sampleInProgressIds = /* @__PURE__ */ new Set([3]);
const recommendedIds = [5, 7, 4];
const difficultyConfig = {
  easy: {
    label: "Easy",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    dotClass: "bg-chart-2"
  },
  medium: {
    label: "Medium",
    className: "bg-primary/10 text-primary border-primary/30",
    dotClass: "bg-primary"
  },
  hard: {
    label: "Hard",
    className: "bg-destructive/10 text-destructive border-destructive/30",
    dotClass: "bg-destructive"
  }
};
const filterButtons = [
  { label: "All", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" }
];
function getCompletionStatus(id, completedSet, inProgressSet) {
  if (completedSet.has(id)) return "completed";
  if (inProgressSet.has(id)) return "in-progress";
  return "new";
}
function TopicCard({
  topic,
  index,
  completionStatus,
  onStart
}) {
  const diff = difficultyConfig[topic.difficulty];
  const isCompleted = completionStatus === "completed";
  const isInProgress = completionStatus === "in-progress";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.05 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          "data-ocid": `topics.item.${index + 1}`,
          className: `group relative flex flex-col h-full cursor-pointer transition-smooth border-border hover:border-primary/30 hover:shadow-elevated overflow-hidden ${isCompleted ? "opacity-90" : ""}`,
          onClick: () => onStart(topic.id),
          children: [
            isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/5 pointer-events-none z-10 flex items-start justify-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-chart-2 bg-chart-2/15 border border-chart-2/30 px-2 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
              "Completed"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold group-hover:text-primary transition-smooth leading-snug line-clamp-2", children: topic.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0 mt-0.5" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 flex-1", children: topic.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium ${diff.className}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${diff.dotClass}` }),
                      diff.label
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-medium", children: topic.category }),
                isInProgress && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-primary/40 text-primary bg-primary/5",
                    children: "In Progress"
                  }
                ),
                completionStatus === "new" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs text-muted-foreground",
                    children: "New"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: isCompleted ? "outline" : "default",
                  className: "w-full mt-1",
                  "data-ocid": `topics.start_button.${index + 1}`,
                  onClick: (e) => {
                    e.stopPropagation();
                    onStart(topic.id);
                  },
                  children: isCompleted ? "Review" : isInProgress ? "Continue" : "Start Learning"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function TopicsPage() {
  const navigate = useNavigate();
  const { data: fetchedTopics, isLoading } = useTopics();
  const profile = useAppStore((s) => s.profile);
  const [search, setSearch] = reactExports.useState("");
  const [diffFilter, setDiffFilter] = reactExports.useState("all");
  const topics = reactExports.useMemo(
    () => fetchedTopics && fetchedTopics.length > 0 ? fetchedTopics : sampleTopics,
    [fetchedTopics]
  );
  const recommendedTopics = reactExports.useMemo(
    () => topics.filter((t) => recommendedIds.includes(t.id)).slice(0, 3),
    [topics]
  );
  const filteredTopics = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    return topics.filter((t) => {
      const matchesSearch = !q || t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      const matchesDiff = diffFilter === "all" || t.difficulty === diffFilter;
      return matchesSearch && matchesDiff;
    });
  }, [topics, search, diffFilter]);
  function handleNavigate(id) {
    navigate({
      to: "/topics/$topicId",
      params: { topicId: String(id) }
    });
  }
  const greeting = (profile == null ? void 0 : profile.name) ? `for ${profile.name}` : "for You";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 lg:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Choose What to Learn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1.5 text-base", children: "Pick a topic and let your AI tutor guide you step by step" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search topics or categories…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "topics.search_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-2 mt-5 flex-wrap",
          "data-ocid": "topics.difficulty_filter",
          children: filterButtons.map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `topics.filter.${btn.value}`,
              onClick: () => setDiffFilter(btn.value),
              className: `text-sm px-4 py-1.5 rounded-full border font-medium transition-smooth ${diffFilter === btn.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground"}`,
              children: btn.label
            },
            btn.value
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 lg:px-6 py-8 space-y-10", children: [
      recommendedTopics.length > 0 && !search && diffFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "topics.recommendations_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground", children: [
            "Smart Recommendations ",
            greeting
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: recommendedTopics.map((topic, i) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3, delay: i * 0.08 },
              "data-ocid": `topics.recommendation.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "group cursor-pointer transition-smooth border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 hover:shadow-elevated",
                  onClick: () => handleNavigate(topic.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground group-hover:text-primary transition-smooth leading-snug line-clamp-2", children: topic.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0 mt-0.5" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyConfig[topic.difficulty].className}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `w-1.5 h-1.5 rounded-full ${difficultyConfig[topic.difficulty].dotClass}`
                              }
                            ),
                            difficultyConfig[topic.difficulty].label
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: topic.category })
                    ] })
                  ] })
                }
              )
            },
            topic.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "topics.all_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground", children: [
            diffFilter === "all" ? "All Topics" : `${difficultyConfig[diffFilter].label} Topics`,
            search && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-sm font-normal text-muted-foreground", children: [
              '— results for "',
              search,
              '"'
            ] })
          ] }),
          (search || diffFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground hover:text-foreground",
              "data-ocid": "topics.clear_filters_button",
              onClick: () => {
                setSearch("");
                setDiffFilter("all");
              },
              children: "Clear filters"
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "topics.loading_state",
            children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full mt-1 rounded-md" })
            ] }) }, i))
          }
        ) : filteredTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: BookOpen,
            title: "No topics found",
            description: search ? `No topics match "${search}". Try adjusting your search or filters.` : "No topics match the selected difficulty. Try a different filter.",
            action: {
              label: "Clear filters",
              onClick: () => {
                setSearch("");
                setDiffFilter("all");
              },
              "data-ocid": "topics.clear_filters_action_button"
            },
            "data-ocid": "topics.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "topics.list",
            children: filteredTopics.map((topic, i) => {
              const status = getCompletionStatus(
                topic.id,
                sampleCompletedIds,
                sampleInProgressIds
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                TopicCard,
                {
                  topic,
                  index: i,
                  completionStatus: status,
                  onStart: handleNavigate
                },
                topic.id
              );
            })
          }
        )
      ] })
    ] })
  ] });
}
export {
  TopicsPage as default
};
