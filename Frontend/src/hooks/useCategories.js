import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategory,
  getUserCategory,
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../api/categoryApi";

export const useGetCategories = ({ page, limit }) => {
  return useQuery({
    queryKey: ["categories", { page, limit }],
    queryFn: () => getCategory({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useGetUserCategories = ({ page, limit }) => {
  return useQuery({
    queryKey: ["userCategories", { page, limit }],
    queryFn: () => getUserCategory({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useGetCategoryById = ({ categoryId }) => {
  return useQuery({
    queryKey: ["singleCategory", { categoryId }],
    queryFn: () => getCategoryById({ categoryId }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, payload }) =>
      updateCategory({ categoryId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("userCategories");
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => addCategory({ payload }),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("userCategories");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId }) => deleteCategory({ categoryId }),
    onSettled: () => {
      queryClient.invalidateQueries("userCategories");
      queryClient.invalidateQueries("categories");
    },
  });
};
