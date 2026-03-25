"use client";

import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";
import { useTheme } from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { locale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const content = getSiteContent(locale);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? content.ui.switchToLightTheme : content.ui.switchToDarkTheme}
      title={isDark ? content.ui.switchToLightTheme : content.ui.switchToDarkTheme}
      className={`interactive-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control-bg)] theme-text-muted hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold)] ${className}`.trim()}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
