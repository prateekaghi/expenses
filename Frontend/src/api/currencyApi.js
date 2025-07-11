import apiClient from "./index";

export const getCurrency = async ({ page = 1, limit = 10 }) => {
  try {
    const data = await apiClient.get("/currency", {
      params: {
        page,
        limit,
      },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
