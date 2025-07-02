import apiClient from "./index";

export const signupUser = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  try {
    const res = await apiClient.post("/users/signup", {
      first_name,
      last_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
