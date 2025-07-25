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

export const getUserCategory = async ({ page, limit }) => {
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

export const getCategoryById = async ({ categoryId }) => {
  try {
    const data = await apiClient.get(`/category/detail/${categoryId}`);
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

export const updateCategory = async ({ categoryId, payload }) => {
  try {
    const data = await apiClient.patch(`/category/${categoryId}`, payload);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async ({ categoryId }) => {
  try {
    const data = await apiClient.delete(`/category/${categoryId}`);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};
