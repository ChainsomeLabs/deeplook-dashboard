import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { transform } from "./transform";
import type { Pool } from "../common/types";

export const useOHLCV = (pool: Pool, start: number, end: number) => {
  return useQuery({
    queryKey: ["ohlcv", pool.pool_name, start, end],
    queryFn: async () =>
      api.getOHLCV(pool.pool_name, start, end).then((v) => transform(v)),
  });
};
