import apiClient from "./index";

export const getUser = async () => {
  try {
    const data = await apiClient.get("/users");
    if (data.status === 200) {
      if (data?.data?.length > 0) {
        return data.data;
      } else {
        return "No Data";
      }
    }
  } catch (error) {
    return "API Error" + error;
  }
};
