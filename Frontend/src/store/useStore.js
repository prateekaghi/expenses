import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getUser } from "../api/usersApi";

const userStore = (set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });

    try {
      const response = await getUser();
      set({ users: response, loading: false });
    } catch (error) {
      set({
        error: error.message || "Failed to fetch users",
        loading: false,
      });
    }
  },
});

const useStore = create(devtools(persist(userStore, { name: "users" })));

export default useStore;
