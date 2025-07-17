import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../api/categoryApi";
import { getExpenses, getUserExpenses } from "../api/expensesApi";

export const useExpenses = ({ page, limit }) => {
  return useQuery({
    queryKey: ["expenses", { page, limit }],
    queryFn: () => getExpenses({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUserExpenses = ({ page, limit }) => {
  return useQuery({
    queryKey: ["user_expenses", { page, limit }],
    queryFn: () => getUserExpenses({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => addCategory({ payload }),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};
