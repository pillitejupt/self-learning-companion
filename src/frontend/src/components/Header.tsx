import { PointsBadge } from "@/components/ui/PointsBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useAppStore } from "@/store/useAppStore";
import { Brain, LogOut, Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const profile = useAppStore((s) => s.profile);
  const points = useAppStore((s) => s.points);

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "SL";

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="header.menu_toggle"
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              Self-Learn
            </span>
          </div>
        </div>

        {/* Right: points + user + theme + logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PointsBadge
            points={points}
            data-ocid="header.points_badge"
            animate={points > 0}
          />

          <div className="flex items-center gap-2 border-l border-border pl-2 sm:pl-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {profile?.name && (
              <span className="text-sm font-medium text-foreground hidden md:block max-w-[120px] truncate">
                {profile.name}
              </span>
            )}
          </div>

          <button
            type="button"
            data-ocid="header.theme_toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-foreground" />
            ) : (
              <Sun className="w-4 h-4 text-foreground" />
            )}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            data-ocid="header.logout_button"
            className="hidden sm:flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
          <button
            type="button"
            onClick={logout}
            data-ocid="header.logout_button_mobile"
            className="sm:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
