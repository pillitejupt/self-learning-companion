import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/types";
import { BookOpen, Check, Trophy, Zap } from "lucide-react";

interface SkillLevelOption {
  value: SkillLevel;
  label: string;
  desc: string;
  icon: React.ElementType;
  traits: string[];
}

const OPTIONS: SkillLevelOption[] = [
  {
    value: "beginner",
    label: "Beginner",
    desc: "New to the topic — start from the very beginning",
    icon: BookOpen,
    traits: [
      "Simple explanations",
      "Step-by-step guidance",
      "Lots of examples",
    ],
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc: "Have some experience and want to go deeper",
    icon: Zap,
    traits: ["Conceptual depth", "Practical projects", "Pattern recognition"],
  },
  {
    value: "advanced",
    label: "Advanced",
    desc: "Expert looking for mastery and edge cases",
    icon: Trophy,
    traits: [
      "Edge cases & nuance",
      "Architecture decisions",
      "Teaching others",
    ],
  },
];

interface SkillLevelPickerProps {
  value: SkillLevel;
  onChange: (level: SkillLevel) => void;
}

export function SkillLevelPicker({ value, onChange }: SkillLevelPickerProps) {
  return (
    <div className="space-y-3">
      {OPTIONS.map(({ value: v, label, desc, icon: Icon, traits }) => (
        <button
          type="button"
          key={v}
          onClick={() => onChange(v)}
          data-ocid={`onboarding.skill_${v}`}
          className={cn(
            "w-full text-left rounded-xl border-2 p-4 transition-smooth",
            value === v
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border hover:border-primary/40 hover:bg-muted/40",
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-smooth",
                value === v
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-sm">{label}</p>
                {value === v && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {traits.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full border transition-smooth",
                      value === v
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-muted border-border text-muted-foreground",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
