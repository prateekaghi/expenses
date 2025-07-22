import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTransactions,
  addTransaction,
  getUserTransactions,
  getUserTransactionsSummary,
  getUserTransactionCatgorySummary,
  deleteTransaction,
} from "../api/transactionsApi";

export const useTransactions = ({ page, limit }) => {
  return useQuery({
    queryKey: ["transactions", { page, limit }],
    queryFn: () => getAllTransactions({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUserTransactions = ({ page, limit }) => {
  return useQuery({
    queryKey: ["user_transactions", { page, limit }],
    queryFn: () => getUserTransactions({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUserTransactionSummary = () => {
  return useQuery({
    queryKey: ["user_transaction_summary"],
    queryFn: getUserTransactionsSummary,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUserTransactionCategorySummary = () => {
  return useQuery({
    queryKey: ["user_transaction_category_summary"],
    queryFn: getUserTransactionCatgorySummary,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ date, title, category, amount, type, currency }) =>
      addTransaction({ date, title, category, amount, type, currency }),
    onSuccess: () => {
      queryClient.invalidateQueries("user_transaction_category_summary");
      queryClient.invalidateQueries("user_transaction_summary");
      queryClient.invalidateQueries("user_transactions");
      queryClient.invalidateQueries("transactions");
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ transactionId }) => deleteTransaction({ transactionId }),
    onSuccess: () => {
      queryClient.invalidateQueries("user_transaction_category_summary");
      queryClient.invalidateQueries("user_transaction_summary");
      queryClient.invalidateQueries("user_transactions");
      queryClient.invalidateQueries("transactions");
    },
  });
};
