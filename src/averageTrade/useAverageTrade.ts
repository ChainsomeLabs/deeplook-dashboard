import { useQuery } from "@tanstack/react-query";
import type { Pool } from "../common/types";
import { api } from "../api";

export const useAverageTrade = (pool: Pool) => {
  return useQuery({
    queryKey: ["average-trade"],
    queryFn: async () => api.getAverageTrade(pool.pool_name),
  });
};
