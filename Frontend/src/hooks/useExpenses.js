import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expensesApi";

export const useExpenses = ({ page, limit }) => {
  return useQuery({
    queryKey: ["expenses", { page, limit }],
    queryFn: () => getExpenses({ page, limit }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
