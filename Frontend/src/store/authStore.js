import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      id: null,
      token: null,
      first_name: null,
      last_name: null,
      email: null,

      setAuth: ({ id, token, first_name, last_name, email }) => {
        set({
          token: token,
          id: id,
          first_name: first_name,
          last_name: last_name,
          email: email,
        });
      },
      clearAuth: () => {
        set({
          token: null,
          id: null,
          first_name: null,
          last_name: null,
          email: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
