import apiClient from "./index";

export const getCategory = async ({ page, limit }) => {
  try {
    const data = await apiClient.get("/category", {
      params: { page, limit },
    });
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
