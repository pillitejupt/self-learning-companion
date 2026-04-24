import { BadgeIcon } from "@/components/ui/PointsBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProfile, useUserProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { SkillLevel } from "@/types";
import { Edit3, Save, Shield, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const skillLevels: { value: SkillLevel; label: string; emoji: string }[] = [
  { value: "beginner", label: "Beginner", emoji: "🌱" },
  { value: "intermediate", label: "Intermediate", emoji: "🚀" },
  { value: "advanced", label: "Advanced", emoji: "⚡" },
];

export default function ProfilePage() {
  const { data: _profile, isLoading } = useUserProfile();
  const profile = useAppStore((s) => s.profile);
  const badges = useAppStore((s) => s.badges);
  const points = useAppStore((s) => s.points);
  const principalId = useAppStore((s) => s.principalId);
  const updateProfile = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner");

  useEffect(() => {
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
        skillLevel,
      });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile. Please try again.");
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

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "SL";

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your learning profile and preferences
        </p>
      </div>

      {/* Profile card */}
      <Card data-ocid="profile.info_card">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-primary">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                {isLoading ? (
                  <Skeleton className="h-6 w-36 mb-1" />
                ) : (
                  <h2 className="font-bold text-xl text-foreground">
                    {profile?.name ?? "—"}
                  </h2>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground capitalize">
                    {profile?.skillLevel ?? "—"}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm font-medium text-accent">
                    {points.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>
            {!editing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                data-ocid="profile.edit_button"
                className="flex items-center gap-1.5 shrink-0"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {editing ? (
            <div className="space-y-4" data-ocid="profile.edit_form">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="profile.name_input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-goals">Learning Goals</Label>
                <Textarea
                  id="profile-goals"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={3}
                  data-ocid="profile.goals_input"
                />
              </div>
              <div className="space-y-2">
                <Label>Skill Level</Label>
                <div className="flex gap-2">
                  {skillLevels.map(({ value, label, emoji }) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setSkillLevel(value)}
                      data-ocid={`profile.skill_${value}`}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-smooth text-center",
                        skillLevel === value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      <span className="text-xl">{emoji}</span>
                      <span className="text-xs font-medium text-foreground">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1"
                  onClick={handleSave}
                  disabled={updateProfile.isPending || !name.trim()}
                  data-ocid="profile.save_button"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateProfile.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  data-ocid="profile.cancel_button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="profile.view_section">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Learning Goals
                </p>
                <p className="text-sm text-foreground">
                  {profile?.learningGoals || "No goals set yet."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Badges card */}
      <Card data-ocid="profile.badges_card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> My Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {badges.length > 0 ? (
            <div className="flex gap-4 flex-wrap">
              {badges.map((b) => (
                <BadgeIcon key={b} badge={b} size="md" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-2">
              No badges yet. Complete topics and quizzes to earn badges!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Principal ID */}
      {principalId && (
        <Card data-ocid="profile.identity_card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Internet Identity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-mono text-muted-foreground break-all">
              {principalId}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
