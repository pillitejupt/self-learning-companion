import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export function useAuth() {
  const {
    identity,
    loginStatus,
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
  } = useInternetIdentity();
  const { setAuth, principalId } = useAppStore();

  const isLoading = isInitializing || isLoggingIn;
  const currentPrincipal = identity?.getPrincipal().toText() ?? null;

  // Sync auth state to store (in effect to avoid React render-phase side effects)
  useEffect(() => {
    if (isAuthenticated && currentPrincipal) {
      setAuth(true, currentPrincipal);
    } else if (!isAuthenticated && !isLoading) {
      setAuth(false, null);
    }
  }, [isAuthenticated, currentPrincipal, isLoading, setAuth]);

  const logout = () => {
    clear();
    setAuth(false, null);
  };

  return {
    identity,
    loginStatus,
    isAuthenticated,
    isLoading,
    principalId: isAuthenticated ? currentPrincipal : principalId,
    login,
    logout,
  };
}
