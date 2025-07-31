import { formatPriceNum } from "./../common/utils";
import type { CandlestickData, Time, UTCTimestamp } from "lightweight-charts";
import type { OHLCV, Pool } from "../common/types";

export const transform = (
  ohlcv: OHLCV[],
  pool: Pool
): CandlestickData<Time>[] => {
  return ohlcv.map((v) => ({
    time: v.timestamp as UTCTimestamp,
    open: formatPriceNum(v.open, pool),
    high: formatPriceNum(v.high, pool),
    low: formatPriceNum(v.low, pool),
    close: formatPriceNum(v.close, pool),
  }));
};
