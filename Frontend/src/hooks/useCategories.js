import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/categoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
