import apiClient from "./index";

export const getCategory = async () => {
  try {
    const data = await apiClient.get("/category");
    console.log("category", data);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
