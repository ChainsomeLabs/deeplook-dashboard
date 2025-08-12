import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
} from "lightweight-charts";

import type { CandleGraphData, Pool } from "../common/types";
import { Loading } from "../common";
import { useOHLCV } from "./useOHLCV";
import { getPriceDec } from "../common/utils";

type ChartProps = {
  data: CandleGraphData;
  pool: Pool;
  dec: number;
  showVolume: boolean;
};

const Chart = ({ data, dec, showVolume }: ChartProps) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "#cccccc",
        background: { color: "#1d2024" },
      },
      grid: {
        vertLines: { color: "#37393e" },
        horzLines: { color: "#37393e" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        autoScale: true,
      },
      autoSize: true,
    });

    const candleStickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#2ebd85",
      downColor: "#f6465d",
      wickVisible: true,
      borderVisible: false,
      priceFormat: {
        type: "price",
        precision: dec,
        minMove: 1 / 10 ** dec,
      },
    });

    candleStickSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1, // highest point of the series will be 10% away from the top
        bottom: 0.3, // lowest point will be 40% away from the bottom
      },
    });

    candleStickSeries.setData(data.ohlc);

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    if (showVolume) {
      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });
      volumeSeries.setData(data.volume);
    }

    return () => {
      chart.remove();
    };
  }, [data, dec, showVolume]);

  return (
    <div
      ref={chartContainerRef}
      className="h-full w-full rounded-lg overflow-hidden border-2 border-surface-bright"
    />
  );
};

type Props = {
  pool: Pool;
};

const AVAILABLE_TIMEFRAMES = [
  { name: "1 minute", value: "1m" },
  { name: "15 minutes", value: "15m" },
  { name: "1 hour", value: "1h" },
  { name: "4 hours", value: "4h" },
];

export const CandleChart = ({ pool }: Props) => {
  const [showVolume, setShowVolume] = useState(true);
  const [timeFrame, setTimeFrame] = useState("1m");
  const { data, isLoading, isError } = useOHLCV(pool, timeFrame);

  if (isLoading) {
    return (
      <div>
        <h3 className="pb-2">OHLC last 24h</h3>
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 m-12">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <h3 className="pb-2">OHLC last 24h</h3>
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 m-12">
            <p>Something went wrong</p>
          </div>
        </div>
      </div>
    );
  }

  const dec = getPriceDec(pool);

  return (
    <>
      <h3 className="pb-2">OHLC last 24h</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0 w-fit">
        <label htmlFor="show-volume">Show volume:</label>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={showVolume}
            onChange={() => setShowVolume(!showVolume)}
            className="accent-black"
            id="show-volume"
          />
        </div>
        <label htmlFor="timeframe">Select timeframe:</label>
        <select
          id="timeframe"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          {AVAILABLE_TIMEFRAMES.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="h-full w-full">
        <Chart pool={pool} data={data} dec={dec} showVolume={showVolume} />
      </div>
    </>
  );
};
