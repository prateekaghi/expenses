import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "../api/currencyApi";

export const useCurrencies = ({ page, limit }) => {
  return useQuery({
    queryKey: ["currencies", { page, limit }],
    queryFn: () => getCurrency({ limit, page }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
