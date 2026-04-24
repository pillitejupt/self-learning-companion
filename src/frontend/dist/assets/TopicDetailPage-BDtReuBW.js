import { c as createLucideIcon, h as useParams, f as useNavigate, a as useAppStore, r as reactExports, j as jsxRuntimeExports, e as cn, b as Button, U as User, i as ue } from "./index-CGW6bGON.js";
import { B as Badge } from "./badge-BSUisHQm.js";
import { I as Input } from "./input-kSUN_RXH.js";
import { S as Skeleton } from "./skeleton-D3UDbUyT.js";
import { d as useTopic, e as useLearningSession, f as useSendMessage, g as useMarkTopicCompleted } from "./useBackend-BW7wBvPB.js";
import { C as ChevronLeft } from "./chevron-left-CQRLHEVM.js";
import { C as CircleCheck } from "./circle-check-BpSFtftz.js";
import { S as Sparkles } from "./sparkles-DUi7Hr3A.js";
import { S as Star } from "./star-BkkJWPx7.js";
import { B as Bot } from "./bot-BmHebFvK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const DIFFICULTY_COLORS = {
  easy: "bg-chart-2/15 text-chart-2 dark:text-chart-2 border-chart-2/25",
  medium: "bg-primary/15 text-primary border-primary/25",
  hard: "bg-destructive/15 text-destructive border-destructive/25"
};
function buildWelcomeMessage(topicTitle, level) {
  const levelPhrase = level === "beginner" ? "start with the fundamentals" : level === "intermediate" ? "build on your existing knowledge" : "dive deep into advanced concepts";
  return `Great! Let's explore **${topicTitle}**. Since you're a ${level} learner, I'll ${levelPhrase}. Ready to begin?`;
}
function renderContent(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map(
    (part) => part.startsWith("**") && part.endsWith("**") ? /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: part.slice(2, -2) }, part) : part
  );
}
function TopicDetailPage() {
  const { topicId } = useParams({ from: "/topics/$topicId" });
  const navigate = useNavigate();
  const topicIdNum = Number(topicId);
  const { data: topic, isLoading: topicLoading } = useTopic(topicIdNum);
  const { data: session, isLoading: sessionLoading } = useLearningSession(topicIdNum);
  const sendMessage = useSendMessage();
  const markComplete = useMarkTopicCompleted();
  const profile = useAppStore((s) => s.profile);
  const points = useAppStore((s) => s.points);
  const [input, setInput] = reactExports.useState("");
  const [localMessages, setLocalMessages] = reactExports.useState([]);
  const [isCompleted, setIsCompleted] = reactExports.useState(false);
  const sessionSeeded = reactExports.useRef(false);
  const messagesEndRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!topic || sessionSeeded.current) return;
    if (sessionLoading) return;
    if ((session == null ? void 0 : session.messages) && session.messages.length > 0) {
      sessionSeeded.current = true;
      setLocalMessages(
        session.messages.map((m) => ({
          role: m.role,
          content: m.content
        }))
      );
    } else {
      sessionSeeded.current = true;
      const skillLevel = (profile == null ? void 0 : profile.skillLevel) ?? "beginner";
      setLocalMessages([
        {
          role: "assistant",
          content: buildWelcomeMessage(topic.title, skillLevel)
        }
      ]);
    }
  }, [topic, session, sessionLoading, profile]);
  reactExports.useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  const handleSend = async () => {
    var _a;
    const text = input.trim();
    if (!text || sendMessage.isPending) return;
    setInput("");
    setLocalMessages((prev) => [...prev, { role: "user", content: text }]);
    try {
      const resp = await sendMessage.mutateAsync({
        topicId: topicIdNum,
        message: text
      });
      if (resp) {
        setLocalMessages((prev) => [
          ...prev,
          { role: "assistant", content: resp.content }
        ]);
      }
    } catch {
      setLocalMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment."
        }
      ]);
    }
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const handleKeyDown = (e) => {
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
      ue.success(
        `🎉 Topic completed! You earned ${pts} point${pts !== 1 ? "s" : ""}.`,
        { duration: 5e3 }
      );
    } catch {
      ue.error("Couldn't mark topic as complete. Please try again.");
    }
  };
  const difficultyClass = DIFFICULTY_COLORS[(topic == null ? void 0 : topic.difficulty) ?? "easy"] ?? DIFFICULTY_COLORS.easy;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-[calc(100vh-4rem)]",
      "data-ocid": "topic_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 lg:px-6 py-3 flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/topics" }),
                  className: "p-1.5 rounded-lg hover:bg-muted transition-smooth shrink-0 mt-0.5",
                  "aria-label": "Back to topics",
                  "data-ocid": "topic_detail.back_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5 text-foreground" })
                }
              ),
              topicLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 mt-1" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-lg text-foreground leading-tight truncate", children: (topic == null ? void 0 : topic.title) ?? "Learning Session" }),
                  (topic == null ? void 0 : topic.difficulty) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize",
                        difficultyClass
                      ),
                      children: topic.difficulty
                    }
                  ),
                  (topic == null ? void 0 : topic.category) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize text-xs", children: topic.category })
                ] }),
                (topic == null ? void 0 : topic.description) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-2", children: topic.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => navigate({ to: "/quiz/$topicId", params: { topicId } }),
                  "data-ocid": "topic_detail.generate_quiz_button",
                  className: "hidden sm:flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4" }),
                    "Generate Quiz"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handleMarkComplete,
                  disabled: isCompleted || markComplete.isPending,
                  "data-ocid": "topic_detail.mark_complete_button",
                  className: cn(
                    "flex items-center gap-1.5 transition-smooth",
                    isCompleted ? "bg-chart-2 hover:bg-chart-2 text-white border-chart-2" : ""
                  ),
                  children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Completed!" })
                  ] }) : markComplete.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Saving…" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Mark Complete" })
                  ] })
                }
              )
            ] })
          ] }),
          points > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 lg:px-6 pb-2 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              points.toLocaleString(),
              " points earned"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 overflow-y-auto px-4 lg:px-8 py-5 space-y-4 bg-background",
            "data-ocid": "topic_detail.chat_panel",
            children: [
              (topicLoading || sessionLoading) && localMessages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", "data-ocid": "topic_detail.loading_state", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce",
                    style: { animationDelay: `${i * 0.15}s` }
                  },
                  i
                )) })
              ] }),
              localMessages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `topic_detail.message.item.${i + 1}`,
                  className: cn(
                    "flex gap-3 message-fade",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  ),
                  children: [
                    msg.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: cn(
                          "max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                          msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm shadow-subtle" : "bg-card border border-border text-foreground rounded-tl-sm shadow-subtle"
                        ),
                        children: renderContent(msg.content)
                      }
                    ),
                    msg.role === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-accent" }) })
                  ]
                },
                `${msg.role}-${i}`
              )),
              sendMessage.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-3 message-fade",
                  "data-ocid": "topic_detail.ai_loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1.5 items-center", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-2 h-2 rounded-full bg-primary/50 animate-bounce",
                        style: { animationDelay: `${i * 0.18}s` }
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden bg-muted/40 border-t border-border px-4 py-2 flex gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "flex-1 flex items-center gap-1.5 text-xs",
            onClick: () => navigate({ to: "/quiz/$topicId", params: { topicId } }),
            "data-ocid": "topic_detail.mobile_quiz_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-3.5 h-3.5" }),
              "Generate Quiz"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-t border-border px-4 lg:px-8 py-4 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                ref: inputRef,
                placeholder: (topic == null ? void 0 : topic.title) ? `Ask about ${topic.title}…` : "Ask me anything…",
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: handleKeyDown,
                disabled: sendMessage.isPending,
                "data-ocid": "topic_detail.message_input",
                className: "flex-1 bg-background"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSend,
                disabled: !input.trim() || sendMessage.isPending,
                "data-ocid": "topic_detail.send_button",
                size: "icon",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-2 select-none", children: [
            "Press",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1 py-0.5 rounded border border-border bg-muted text-xs font-mono", children: "Enter" }),
            " ",
            "to send · AI responses powered by LLM"
          ] })
        ] })
      ]
    }
  );
}
export {
  TopicDetailPage as default
};
