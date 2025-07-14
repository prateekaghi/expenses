import apiClient from "./index";

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
    throw new Error(error);
  }
};
