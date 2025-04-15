import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === "light" ? "dark" : "light";
        set({ theme: newTheme });

        document.documentElement.classList.toggle("dark", newTheme === "dark");
      },
    }),
    { name: "theme-storage" }
  )
);
