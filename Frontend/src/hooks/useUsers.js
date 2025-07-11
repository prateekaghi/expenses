import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/usersApi";

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
