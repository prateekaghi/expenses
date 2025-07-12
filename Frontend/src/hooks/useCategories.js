import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/categoryApi";

export const useCategories = ({ page, limit }) => {
  return useQuery({
    queryKey: ["categories", { page, limit }],
    queryFn: () => getCategory({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
