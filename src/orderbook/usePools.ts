import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useOrderbook = (poolName: string) => {
  return useQuery({
    queryKey: ["orderbook", poolName],
    queryFn: async () => api.getOrderbook(poolName),
  });
};
