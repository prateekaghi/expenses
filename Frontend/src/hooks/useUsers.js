import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUserByID, updateUser } from "../api/usersApi";

export const useUsers = ({ page, limit, filters }) => {
  return useQuery({
    queryKey: ["users", { page, limit, ...filters }],
    queryFn: () =>
      getUsers({
        page,
        limit,
        ...filters,
      }),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 1,
  });
};

export const useUserByID = ({ page, limit, filters }) => {
  return useQuery({
    queryKey: ["user", { page, limit, ...filters }],
    queryFn: () =>
      getUserByID({
        page,
        limit,
        ...filters,
      }),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 1,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ first_name, last_name, profile_image, timezone }) =>
      updateUser({ first_name, last_name, profile_image, timezone }),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};
