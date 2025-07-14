import apiClient from "./index";

export const getTimezones = async ({ page = 1, limit = 10 }) => {
  try {
    const data = await apiClient.get("/timezone", {
      params: {
        page,
        limit,
      },
    });
    console.log("time", data);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
