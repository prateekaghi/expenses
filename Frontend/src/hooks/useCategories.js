import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategory, addCategory } from "../api/categoryApi";

export const useGetCategories = ({ page, limit }) => {
  return useQuery({
    queryKey: ["categories", { page, limit }],
    queryFn: () => getCategory({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => addCategory({ payload }),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};
