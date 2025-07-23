import apiClient from "./index";
import { useAuthStore } from "../store/authStore";

export const getUsers = async ({
  page = 1,
  limit = 10,
  startDate,
  endDate,
  isActive,
  firstName,
  lastName,
}) => {
  try {
    const data = await apiClient.get("/users", {
      params: {
        page,
        limit,
        startDate,
        endDate,
        isActive,
        firstName,
        lastName,
      },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserByID = async ({
  page = 1,
  limit = 10,
  startDate,
  endDate,
  isActive,
  firstName,
  lastName,
}) => {
  const userId = useAuthStore.getState().id;
  if (!userId) {
    throw new Error("User details not found");
  }

  try {
    const data = await apiClient.get(`/users/${userId}`, {
      params: {
        page,
        limit,
        startDate,
        endDate,
        isActive,
        firstName,
        lastName,
      },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async ({
  first_name,
  last_name,
  profile_image,
  timezone,
}) => {
  const userId = useAuthStore.getState().id;
  if (!userId) {
    throw new Error("User details not found");
  }
  try {
    const data = await apiClient.patch(`/users/${userId}`, {
      first_name,
      last_name,
      profile_image,
      timezone,
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
};
