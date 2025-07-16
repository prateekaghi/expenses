import apiClient from "./index";

export const signupUser = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  try {
    const res = await apiClient.post("/auth/signup", {
      first_name,
      last_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error;
  }
};
