import { c as createLucideIcon, a as useAppStore, r as reactExports, j as jsxRuntimeExports, b as Button, e as cn, X, U as User, o as BadgeIcon, i as ue } from "./index-CGW6bGON.js";
import { C as Card, b as CardHeader, a as CardContent, c as CardTitle } from "./card-BIPMfsD4.js";
import { I as Input } from "./input-kSUN_RXH.js";
import { L as Label, T as Textarea } from "./textarea-DtJdNjbA.js";
import { S as Skeleton } from "./skeleton-D3UDbUyT.js";
import { a as useUserProfile, l as useUpdateProfile } from "./useBackend-BW7wBvPB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const skillLevels = [
  { value: "beginner", label: "Beginner", emoji: "🌱" },
  { value: "intermediate", label: "Intermediate", emoji: "🚀" },
  { value: "advanced", label: "Advanced", emoji: "⚡" }
];
function ProfilePage() {
  const { data: _profile, isLoading } = useUserProfile();
  const profile = useAppStore((s) => s.profile);
  const badges = useAppStore((s) => s.badges);
  const points = useAppStore((s) => s.points);
  const principalId = useAppStore((s) => s.principalId);
  const updateProfile = useUpdateProfile();
  const [editing, setEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [goals, setGoals] = reactExports.useState("");
  const [skillLevel, setSkillLevel] = reactExports.useState("beginner");
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setGoals(profile.learningGoals);
      setSkillLevel(profile.skillLevel);
    }
  }, [profile]);
  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        name: name.trim(),
        learningGoals: goals.trim(),
        skillLevel
      });
      ue.success("Profile updated successfully!");
      setEditing(false);
    } catch {
      ue.error("Failed to update profile. Please try again.");
    }
  };
  const handleCancel = () => {
    if (profile) {
      setName(profile.name);
      setGoals(profile.learningGoals);
      setSkillLevel(profile.skillLevel);
    }
    setEditing(false);
  };
  const initials = (profile == null ? void 0 : profile.name) ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "SL";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 space-y-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your learning profile and preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.info_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-primary", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-36 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-foreground", children: (profile == null ? void 0 : profile.name) ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground capitalize", children: (profile == null ? void 0 : profile.skillLevel) ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-accent", children: [
                points.toLocaleString(),
                " pts"
              ] })
            ] })
          ] })
        ] }),
        !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setEditing(true),
            "data-ocid": "profile.edit_button",
            className: "flex items-center gap-1.5 shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
              "Edit"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-5", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "profile.edit_form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profile-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              "data-ocid": "profile.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-goals", children: "Learning Goals" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "profile-goals",
              value: goals,
              onChange: (e) => setGoals(e.target.value),
              rows: 3,
              "data-ocid": "profile.goals_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Skill Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: skillLevels.map(({ value, label, emoji }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSkillLevel(value),
              "data-ocid": `profile.skill_${value}`,
              className: cn(
                "flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-smooth text-center",
                skillLevel === value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: label })
              ]
            },
            value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1",
              onClick: handleSave,
              disabled: updateProfile.isPending || !name.trim(),
              "data-ocid": "profile.save_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
                updateProfile.isPending ? "Saving..." : "Save Changes"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: handleCancel,
              "data-ocid": "profile.cancel_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "profile.view_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: "Learning Goals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: (profile == null ? void 0 : profile.learningGoals) || "No goals set yet." })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.badges_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary" }),
        " My Badges"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: badges.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 flex-wrap", children: badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeIcon, { badge: b, size: "md" }, b)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2", children: "No badges yet. Complete topics and quizzes to earn badges!" }) })
    ] }),
    principalId && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.identity_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary" }),
        " Internet Identity"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground break-all", children: principalId }) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
