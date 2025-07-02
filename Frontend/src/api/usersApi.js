import apiClient from "./index";

export const getUser = async () => {
  try {
    const data = await apiClient.get("/users");
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
