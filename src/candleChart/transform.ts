import type { CandlestickData, Time, UTCTimestamp } from "lightweight-charts";
import type { CandleGraphData, OHLCV, VolumeData } from "../common/types";

export const transform = (ohlcv: OHLCV[]): CandleGraphData => {
  const res: CandleGraphData = ohlcv.reduce(
    (agg: CandleGraphData, v: OHLCV) => {
      const time = v.timestamp as UTCTimestamp;
      const ohlc: CandlestickData<Time> = {
        ...v,
        time,
      };
      const volume: VolumeData = {
        time,
        value: Number(v.volume_base),
        color: v.close > v.open ? "#2ebd85" : "#f6465d",
      };

      return { ohlc: [...agg.ohlc, ohlc], volume: [...agg.volume, volume] };
    },
    { ohlc: [], volume: [] } as CandleGraphData
  );

  const ordered = {
    ohlc: res.ohlc.sort((a, b) => Number(a.time) - Number(b.time)),
    volume: res.volume.sort((a, b) => Number(a.time) - Number(b.time)),
  };

  return ordered;
};
