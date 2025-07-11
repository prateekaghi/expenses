import apiClient from "./index";

export const getTimezones = async () => {
  try {
    const data = await apiClient.get("/timezone");
    console.log("time", data);
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
