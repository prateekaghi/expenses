import apiClient from "./index";
import { useAuthStore } from "../store/authStore";

export const getCategory = async ({ page, limit }) => {
  try {
    const data = await apiClient.get("/category", {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserCategory = async ({ userid, page, limit }) => {
  const userId = useAuthStore.getState().id;
  try {
    const data = await apiClient.get(`/category/${userId}`, {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const addCategory = async ({ payload }) => {
  try {
    const data = await apiClient.post("/category", payload);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async ({ id, payload }) => {
  try {
    const data = await apiClient.delete(`/category/${id}`, {
      data: payload,
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};
