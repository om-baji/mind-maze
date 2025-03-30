import { create } from "zustand";
import { persist } from "zustand/middleware";
import { metadata } from "@/utils/types";

interface AuthState {
  isSignedIn: boolean | null;
  authId: string | null;
  user: metadata | null;
  setAuthState: (state: Partial<AuthState>) => void;
} 

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isSignedIn: null,
      authId: null,
      user: null,
      setAuthState: (state) => set(state),
    }),
    {
      name: "auth-storage",
    }
  )
);
