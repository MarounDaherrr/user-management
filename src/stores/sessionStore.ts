import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  accessToken: string | null;
  expiresIn: number | null;
  setSession: (token: string, expiry: number) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      setSession: (token, expiry) => set({ accessToken: token, expiresIn: expiry }),
      logout: () => set({ accessToken: null, expiresIn: null }), 
    }),
    { name: "user-session" } 
  )
);