import { SmallLoading } from "../common";
import type { PropsPool } from "../common/types";
import { usePrices } from "../common/usePrice";
import { formatLargeNumber, formatSizeNum, getSizeDec } from "../common/utils";
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
      {Object.entries(data).map(([period, size], i) => {
        const volumeReadable = formatSizeNum(size, pool);
        const volume = formatLargeNumber(volumeReadable, sizeDec);
        const volumeUsd = formatLargeNumber(volumeReadable * price, 2);
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
