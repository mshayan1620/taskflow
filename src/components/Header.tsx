"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon, LayoutDashboard } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-brand-600" />
          <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
