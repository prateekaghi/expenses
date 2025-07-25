import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useLoginAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { token, id, first_name, last_name, email, profile_image } =
        data.data;
      setAuth({ token, id, first_name, last_name, email, profile_image });
    },
  });
};

export const useSignupAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      const { token, id, first_name, last_name, email, profile_image } =
        data.data;
      setAuth({ token, id, first_name, last_name, email, profile_image });
    },
  });
};
