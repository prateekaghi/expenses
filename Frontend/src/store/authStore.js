import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      id: null,
      token: null,

      setAuth: ({ id, token }) => {
        set({ token: token, id: id });
      },
      clearAuth: () => {
        set({ token: null, id: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
