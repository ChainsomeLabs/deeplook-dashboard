import { SmallLoading } from "../common";
import type { AverageTradeSizes, PropsPool } from "../common/types";
import { usePrices } from "../common/usePrice";
import { formatLargeNumber, getSizeDec } from "../common/utils";
import { useAverageTrade } from "./useAverageTrade";

const AverageItem = ({
  period,
  volume,
  volumeUsd,
}: {
  period: string;
  volume: string;
  volumeUsd: string;
}) => (
  <div className="grid grid-cols-3">
    <div>{period}</div>
    <div>{volume}</div>
    <div>${volumeUsd}</div>
  </div>
);

export const AverageTrade = ({ pool }: PropsPool) => {
  const { data, isLoading, isError } = useAverageTrade(pool);
  const { data: prices } = usePrices();

  const price =
    pool.base_asset_symbol === "USDC"
      ? 1
      : prices === undefined
      ? undefined
      : prices[pool.base_asset_symbol];

  if (isLoading || price === undefined) {
    return <SmallLoading />;
  }

  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  const sizeDec = getSizeDec(pool);

  return (
    <div>
      <h4 className="mt-4">Average trade volumes</h4>
      <div className="grid grid-cols-3 border-b-thin border-on-surface-variant">
        <div>Period</div>
        <div>Average size ({pool.base_asset_symbol})</div>
        <div>Average size (USD)</div>
      </div>
      {["5min", "15min", "1h", "24h"].map((period, i) => {
        const size = data[period as keyof AverageTradeSizes];
        const volume = formatLargeNumber(size, sizeDec);
        const volumeUsd = formatLargeNumber(size * price, 2);
        return (
          <AverageItem
            key={i}
            period={period}
            volume={volume}
            volumeUsd={volumeUsd}
          />
        );
      })}
    </div>
  );
};
