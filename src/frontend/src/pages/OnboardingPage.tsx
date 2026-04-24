import { SkillLevelPicker } from "@/components/SkillLevelPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { SkillLevel } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Brain, Check, ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type StepId = 1 | 2 | 3;

const STEPS = [
  { id: 1 as StepId, label: "About You" },
  { id: 2 as StepId, label: "Your Goals" },
  { id: 3 as StepId, label: "Skill Level" },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 40 : -40, opacity: 0 }),
};

const stepTitles = [
  {
    emoji: "👋",
    title: "Nice to meet you!",
    subtitle: "Tell us your name so we can personalize your experience",
  },
  {
    emoji: "🎯",
    title: "What do you want to learn?",
    subtitle: "Share your goals — your AI tutor will tailor its guidance",
  },
  {
    emoji: "⚡",
    title: "What's your skill level?",
    subtitle:
      "Your tutor will adapt explanations to match exactly where you are",
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const setHasCompletedOnboarding = useAppStore(
    (s) => s.setHasCompletedOnboarding,
  );
  const createProfile = useCreateProfile();

  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner");
  const [step, setStep] = useState<StepId>(1);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setStep((s) => (s < 3 ? ((s + 1) as StepId) : s));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => (s > 1 ? ((s - 1) as StepId) : s));
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await createProfile.mutateAsync({
      name: name.trim(),
      learningGoals: goals.trim(),
      skillLevel,
    });
    setHasCompletedOnboarding(true);
    navigate({ to: "/dashboard" });
  };

  const { emoji, title, subtitle } = stepTitles[step - 1];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-elevated">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-2xl text-foreground">
            Self-Learn
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl shadow-elevated overflow-hidden"
        >
          {/* Step header */}
          <div className="px-8 pt-8 pb-5 border-b border-border/60 space-y-4">
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth shrink-0",
                        step > s.id
                          ? "bg-primary text-primary-foreground"
                          : step === s.id
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium hidden sm:block transition-smooth",
                        step >= s.id
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 rounded-full mx-2 transition-smooth",
                        step > s.id ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`title-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <h2 className="font-display font-bold text-xl text-foreground">
                  {emoji} {title}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step content */}
          <div className="px-8 py-6 min-h-[280px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="space-y-5"
                  data-ocid="onboarding.step1_panel"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                      className="h-11"
                      data-ocid="onboarding.name_input"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <p className="text-xs font-semibold text-foreground mb-2">
                      What happens next:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Your profile is saved securely on the blockchain",
                        "Your AI tutor will greet you by name",
                        "Progress is tracked and synced across sessions",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="space-y-4"
                  data-ocid="onboarding.step2_panel"
                >
                  <div className="space-y-2">
                    <Label htmlFor="goals" className="text-sm font-semibold">
                      Learning Goals{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="goals"
                      placeholder="e.g. I want to learn Python to build data science projects and eventually transition into a data analyst role..."
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      rows={5}
                      className="resize-none text-sm"
                      data-ocid="onboarding.goals_input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Be as specific as you like — the more detail, the better
                      your AI tutor can help.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  data-ocid="onboarding.step3_panel"
                >
                  <SkillLevelPicker
                    value={skillLevel}
                    onChange={setSkillLevel}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8 flex items-center gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={goBack}
                data-ocid="onboarding.back_button"
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                className={cn("gap-1", step === 1 ? "w-full" : "flex-1")}
                onClick={goNext}
                disabled={step === 1 && name.trim().length < 2}
                data-ocid="onboarding.next_button"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="flex-1 gap-2"
                onClick={handleSubmit}
                disabled={createProfile.isPending || !name.trim()}
                data-ocid="onboarding.submit_button"
              >
                {createProfile.isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Start Learning!
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground">
          Your data is stored securely and privately on the Internet Computer
        </p>
      </div>
    </div>
  );
}
