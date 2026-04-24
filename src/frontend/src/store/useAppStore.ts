import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Badge, ProgressSummary, UserProfile } from "../types";

export type Theme = "light" | "dark";

interface AuthState {
  isAuthenticated: boolean;
  principalId: string | null;
  setAuth: (isAuthenticated: boolean, principalId?: string | null) => void;
}

interface ProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface GamificationState {
  points: number;
  badges: Badge[];
  setPoints: (points: number) => void;
  setBadges: (badges: Badge[]) => void;
  setProgressSummary: (summary: ProgressSummary) => void;
}

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;
}

type AppStore = AuthState &
  ProfileState &
  ThemeState &
  GamificationState &
  OnboardingState;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Auth
      isAuthenticated: false,
      principalId: null,
      setAuth: (isAuthenticated, principalId = null) =>
        set({ isAuthenticated, principalId }),

      // Profile
      profile: null,
      setProfile: (profile) => set({ profile }),

      // Theme
      theme: "light",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

      // Gamification
      points: 0,
      badges: [],
      setPoints: (points) => set({ points }),
      setBadges: (badges) => set({ badges }),
      setProgressSummary: (summary) =>
        set({ points: Number(summary.totalPoints), badges: summary.badges }),

      // Onboarding
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),
    }),
    {
      name: "self-learn-store",
      partialize: (state) => ({
        theme: state.theme,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    },
  ),
);
