import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useLoginAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { token, id } = data.data;
      setAuth({ token, id });
    },
  });
};

export const useSignupAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      const { token, id } = data.data;
      setAuth({ token, id });
    },
  });
};
