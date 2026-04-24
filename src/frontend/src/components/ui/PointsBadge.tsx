import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface PointsBadgeProps {
  points: number;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  "data-ocid"?: string;
}

const sizeClasses = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-3 py-1 gap-1.5",
  lg: "text-base px-4 py-1.5 gap-2",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function PointsBadge({
  points,
  animate = false,
  size = "md",
  className,
  "data-ocid": dataOcid,
}: PointsBadgeProps) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        "bg-accent/15 text-accent border border-accent/30",
        animate && "badge-pulse streak-glow",
        sizeClasses[size],
        className,
      )}
    >
      <Zap className={cn("fill-accent", iconSizes[size])} />
      <span>{points.toLocaleString()} pts</span>
    </div>
  );
}

interface BadgeIconProps {
  badge: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BADGE_EMOJIS: Record<string, string> = {
  firstSteps: "👣",
  quizMaster: "🏆",
  perfectScore: "⭐",
  streak: "🔥",
};

const BADGE_LABELS: Record<string, string> = {
  firstSteps: "First Steps",
  quizMaster: "Quiz Master",
  perfectScore: "Perfect Score",
  streak: "Streak Hero",
};

const badgeSizes = {
  sm: "w-8 h-8 text-base",
  md: "w-12 h-12 text-2xl",
  lg: "w-16 h-16 text-3xl",
};

export function BadgeIcon({ badge, size = "md", className }: BadgeIconProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "rounded-2xl bg-accent/15 border-2 border-accent/30 flex items-center justify-center",
          "transition-smooth hover:scale-110 hover:border-accent/60",
          badgeSizes[size],
        )}
        title={BADGE_LABELS[badge] ?? badge}
      >
        {BADGE_EMOJIS[badge] ?? "🎖️"}
      </div>
      {size !== "sm" && (
        <span className="text-xs text-muted-foreground font-medium">
          {BADGE_LABELS[badge] ?? badge}
        </span>
      )}
    </div>
  );
}
