import { useQuery } from "@tanstack/react-query";
import { getTimezones } from "../api/timezoneApi";

export const useTimezones = ({ page, limit }) => {
  return useQuery({
    queryKey: ["timezones", { page, limit }],
    queryFn: () => getTimezones({ limit, page }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
