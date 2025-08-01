import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  createChart,
  type CandlestickData,
  type Time,
} from "lightweight-charts";

import type { Pool } from "../common/types";
import { Loading } from "../common";
import { useOHLCV } from "./useOHLCV";

type ChartProps = {
  data: CandlestickData<Time>[];
  pool: Pool;
};

const Chart = ({ data }: ChartProps) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: { textColor: "#43444d", background: { color: "#100e1c" } },
      grid: {
        vertLines: { color: "#666" },
        horzLines: { color: "#666" },
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
    });

    candleStickSeries.setData(data);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
};

type Props = {
  pool: Pool;
  start: number;
  end: number;
};

export const CandleChart = ({ pool, start, end }: Props) => {
  const { data, isLoading, isError } = useOHLCV(pool, start, end);

  if (isLoading) {
    return (
      <div>
        <h3 className="pb-2">OHLC</h3>
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
        <h3 className="pb-2">OHLC</h3>
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 m-12">
            <p>Something went wrong</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <h3 className="pb-2">OHLC</h3>
      <div className="aspect-video">
        <Chart pool={pool} data={data} />
      </div>
    </>
  );
};
