import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpenses, getUserExpenses, addExpenes } from "../api/expensesApi";

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
    mutationFn: ({ date, title, category, amount, currency }) =>
      addExpenes({ date, title, category, amount, currency }),
    onSuccess: () => {
      queryClient.invalidateQueries("user_expenses");
      queryClient.invalidateQueries("expenses");
    },
  });
};
