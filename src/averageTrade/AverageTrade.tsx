import { SmallLoading } from "../common";
import type { PropsPool } from "../common/types";
import { useAverageTrade } from "./useAverageTrade";

export const AverageTrade = ({ pool }: PropsPool) => {
  const { data, isLoading, isError } = useAverageTrade(pool);

  if (isLoading) {
    return <SmallLoading />;
  }

  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <h4 className="mt-4">Average trade volumes</h4>
      {Object.entries(data).map(([key, value], i) => (
        <div key={i} className="flex items-center justify-between">
          <div>{key}</div>
          <div>
            {(Number(value) / 10 ** pool.base_asset_decimals).toFixed(0)}
          </div>
        </div>
      ))}
    </div>
  );
};
