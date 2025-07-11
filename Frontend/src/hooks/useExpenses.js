import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expensesApi";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
