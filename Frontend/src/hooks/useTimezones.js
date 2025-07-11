import { useQuery } from "@tanstack/react-query";
import { getTimezones } from "../api/timezoneApi";

export const useTimezones = () => {
  return useQuery({
    queryKey: ["timezones"],
    queryFn: getTimezones,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
