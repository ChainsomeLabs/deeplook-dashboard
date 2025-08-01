import { formatPriceNum, formatSizeNum } from "./../common/utils";
import type { CandlestickData, Time, UTCTimestamp } from "lightweight-charts";
import type { CandleGraphData, OHLCV, Pool, VolumeData } from "../common/types";

export const transform = (ohlcv: OHLCV[], pool: Pool): CandleGraphData => {
  const res: CandleGraphData = ohlcv.reduce(
    (agg: CandleGraphData, v: OHLCV) => {
      const time = v.timestamp as UTCTimestamp;
      const ohlc: CandlestickData<Time> = {
        time,
        open: formatPriceNum(v.open, pool),
        high: formatPriceNum(v.high, pool),
        low: formatPriceNum(v.low, pool),
        close: formatPriceNum(v.close, pool),
      };
      const volume: VolumeData = {
        time,
        value: formatSizeNum(v.volume_base, pool),
        color: v.close > v.open ? "#2ebd85" : "#f6465d",
      };

      return { ohlc: [...agg.ohlc, ohlc], volume: [...agg.volume, volume] };
    },
    { ohlc: [], volume: [] } as CandleGraphData
  );

  return res;
};
