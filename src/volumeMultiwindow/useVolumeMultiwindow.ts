import { useQuery } from "@tanstack/react-query";
import type { Pool } from "../common/types";
import { api } from "../api";

export const useVolumeMultiwindow = (pool: Pool) => {
  return useQuery({
    queryKey: ["volume-multiwindow"],
    queryFn: async () => api.getVolumeMultiwindow(pool.pool_name),
  });
};
