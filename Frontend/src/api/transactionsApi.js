import { useAuthStore } from "../store/authStore";
import apiClient from "./index";

export const getAllTransactions = async ({ page, limit }) => {
  try {
    const data = await apiClient.get("/transactions", {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserTransactions = async ({ page, limit }) => {
  const userId = useAuthStore.getState().id;

  if (!userId) {
    throw new Error("Missing User ID.");
  }
  try {
    const data = await apiClient.get(`/transactions/user/${userId}`, {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
export const getSingleTransaction = async ({ transactionId }) => {
  try {
    const data = await apiClient.get(`/transactions/${transactionId}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserTransactionsSummary = async () => {
  const userId = useAuthStore.getState().id;

  if (!userId) {
    throw new Error("Missing User ID.");
  }
  try {
    const data = await apiClient.get(`/transactions/${userId}/summary`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addTransaction = async ({
  date,
  title,
  category,
  amount,
  currency,
  type,
}) => {
  try {
    const data = await apiClient.post("/transactions", {
      date,
      title,
      category,
      amount,
      currency,
      type,
    });
    if (data.status === 203) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserTransactionCatgorySummary = async () => {
  const userId = useAuthStore.getState().id;

  if (!userId) {
    throw new Error("Missing User ID.");
  }
  try {
    const data = await apiClient.get(`/transactions/${userId}/categorised`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTransaction = async ({ transactionId }) => {
  const userId = useAuthStore.getState().id;

  if (!userId) {
    throw new Error("Missing User ID.");
  }
  try {
    const data = await apiClient.delete(`/transactions/${transactionId}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
