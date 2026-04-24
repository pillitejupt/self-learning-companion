import { PageLoader } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/store/useAppStore";
import { Navigate } from "@tanstack/react-router";
import { Brain, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Tutor",
    desc: "Adaptive explanations that match your exact skill level",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Personalized Goals",
    desc: "Custom learning paths built around your objectives",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Visual reports, badges & streaks to keep you motivated",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const stats = [
  { value: "10K+", label: "Learners" },
  { value: "500+", label: "Topics" },
  { value: "98%", label: "Satisfaction" },
];

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);

  if (isLoading) return <PageLoader />;
  if (isAuthenticated) {
    return (
      <Navigate to={hasCompletedOnboarding ? "/dashboard" : "/onboarding"} />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* Left hero panel */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-8 lg:p-14 overflow-hidden bg-primary">
        {/* Background decorative image */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-brain-network.dim_800x600.jpg')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50" />

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative z-10 max-w-md w-full space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-3xl text-primary-foreground">
              Self-Learn
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-display font-bold text-4xl lg:text-5xl leading-tight text-primary-foreground">
              Your AI-powered personal learning companion
            </h1>
            <p className="text-primary-foreground/75 text-lg leading-relaxed">
              Master any topic with an adaptive AI tutor that understands how
              you learn best — at your pace, on your terms.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">
                    {title}
                  </p>
                  <p className="text-sm text-primary-foreground/65">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex gap-6 pt-2"
          >
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-bold text-2xl text-primary-foreground">
                  {value}
                </p>
                <p className="text-xs text-primary-foreground/60 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right sign-in panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-sm space-y-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden justify-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              Self-Learn
            </span>
          </div>

          {/* Welcome text */}
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-2">
              <Zap className="w-3 h-3" />
              AI-powered learning
            </div>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Start learning today
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sign in with Internet Identity to access your personalized
              learning dashboard and AI tutor.
            </p>
          </div>

          {/* CTA card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-elevated space-y-5">
            <Button
              size="lg"
              onClick={login}
              data-ocid="login.submit_button"
              className="w-full font-semibold text-base h-12 transition-smooth"
            >
              <Brain className="w-5 h-5 mr-2" />
              Sign in with Internet Identity
            </Button>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/60 border border-border/60">
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                New to Self-Learn? Signing in will automatically create your
                account. No passwords needed — Internet Identity keeps you
                secure.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Secure & private
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              No passwords
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Always free
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
