import { useAuthStore } from "../store/authStore";
import apiClient from "./index";

export const getExpenses = async ({ page, limit }) => {
  try {
    const data = await apiClient.get("/expenses", {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserExpenses = async ({ page, limit }) => {
  const userId = useAuthStore.getState().id;

  if (!userId) {
    throw new Error("Missing User ID.");
  }
  try {
    const data = await apiClient.get(`/expenses/${userId}`, {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addExpenes = async ({
  date,
  title,
  category,
  amount,
  currency,
}) => {
  try {
    const data = await apiClient.post("/expenses", {
      date,
      title,
      category,
      amount,
      currency,
    });
    if (data.status === 203) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
