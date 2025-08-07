import { SmallLoading } from "../common";
import { type PropsPool, type VolumeMultiwindow } from "../common/types";
import { usePrices } from "../common/usePrice";
import { formatLargeNumber, formatSizeNum, getSizeDec } from "../common/utils";
import { useVolumeMultiwindow } from "./useVolumeMultiwindow";

const VolumeItem = ({
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

export const Volume = ({ pool }: PropsPool) => {
  const { data, isLoading, isError } = useVolumeMultiwindow(pool);
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
      <h4 className="mt-4">Volume</h4>
      <div className="grid grid-cols-3 border-b-thin border-on-surface-variant">
        <div>Period</div>
        <div>Volume ({pool.base_asset_symbol})</div>
        <div>Volume (USD)</div>
      </div>
      {["1d", "7d", "30d"].map((period, i) => {
        const size = data[period as keyof VolumeMultiwindow];
        const volumeReadable = formatSizeNum(size, pool);
        const volume = formatLargeNumber(volumeReadable, sizeDec);
        const volumeUsd = formatLargeNumber(volumeReadable * price, 2);
        return (
          <VolumeItem
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
