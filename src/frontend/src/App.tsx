import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/hooks/useTheme";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TopicsPage = lazy(() => import("@/pages/TopicsPage"));
const TopicDetailPage = lazy(() => import("@/pages/TopicDetailPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const ProgressPage = lazy(() => import("@/pages/ProgressPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

function ThemeInitializer() {
  useTheme();
  return null;
}

// ─── Route definitions ────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <ThemeInitializer />
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute requireOnboarding>
        <Layout>
          <DashboardPage />
        </Layout>
      </ProtectedRoute>
    </Suspense>
  ),
});

const topicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/topics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute requireOnboarding>
        <Layout>
          <TopicsPage />
        </Layout>
      </ProtectedRoute>
    </Suspense>
  ),
});

const topicDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/topics/$topicId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute requireOnboarding>
        <Layout>
          <TopicDetailPage />
        </Layout>
      </ProtectedRoute>
    </Suspense>
  ),
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz/$topicId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute requireOnboarding>
        <Layout>
          <QuizPage />
        </Layout>
      </ProtectedRoute>
    </Suspense>
  ),
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute requireOnboarding>
        <Layout>
          <ProgressPage />
        </Layout>
      </ProtectedRoute>
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute requireOnboarding>
        <Layout>
          <ProfilePage />
        </Layout>
      </ProtectedRoute>
    </Suspense>
  ),
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  loginRoute,
  onboardingRoute,
  dashboardRoute,
  topicsRoute,
  topicDetailRoute,
  quizRoute,
  progressRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
