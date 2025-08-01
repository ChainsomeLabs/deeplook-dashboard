import { SmallLoading } from "../common";
import type { PropsPool } from "../common/types";
import { formatSize } from "../common/utils";
import { useVolumeMultiwindow } from "./useVolumeMultiwindow";

export const VolumeMultiwindow = ({ pool }: PropsPool) => {
  const { data, isLoading, isError } = useVolumeMultiwindow(pool);

  if (isLoading) {
    return <SmallLoading />;
  }

  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <h4 className="mt-4">Volume</h4>
      <div className="flex items-center justify-between border-b-thin border-on-surface-variant">
        <div>Period</div>
        <div>Volume ({pool.base_asset_symbol})</div>
      </div>
      {Object.entries(data).map(([key, value], i) => (
        <div key={i} className="flex items-center justify-between">
          <div>{key}</div>
          <div>{formatSize(value, pool)}</div>
        </div>
      ))}
    </div>
  );
};
