import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { transform } from "./transform";
import type { Pool } from "../common/types";
import { getNowToMinute } from "../common/utils";

const DAY_SECONDS = 86400;

const TIMEFRAME_TO_DURATION: { [key: string]: number } = {
  "1m": DAY_SECONDS,
  "15m": DAY_SECONDS * 15,
  "1h": DAY_SECONDS * 60,
  "4h": DAY_SECONDS * 60 * 4,
};

export const useOHLCV = (pool: Pool, timeframe: string) => {
  const duration = TIMEFRAME_TO_DURATION[timeframe];
  if (duration === undefined) {
    throw Error("invalid OHLCV timeframe");
  }
  const end = getNowToMinute();
  const start = end - duration;

  return useQuery({
    queryKey: ["ohlcv", pool.pool_name, start, end, timeframe],
    queryFn: async () =>
      api
        .getOHLCV(pool.pool_name, start, end, timeframe)
        .then((v) => transform(v)),
  });
};
