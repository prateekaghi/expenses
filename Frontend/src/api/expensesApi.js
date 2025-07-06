import apiClient from "./index";

export const getExpenses = async () => {
  try {
    const data = await apiClient.get("/expenses");
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addExpenes = async ({
  date,
  title,
  category,
  amount,
  currency,
}) => {
  try {
    const data = await apiClient.post("/expenses", {
      date,
      title,
      category,
      amount,
      currency,
      user: "68658bc9c9c6de4430b5ce11",
    });
    if (data.status === 203) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
