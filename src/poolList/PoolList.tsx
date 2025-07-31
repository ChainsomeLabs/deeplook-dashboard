import { SmallLoading } from "../common";
import { PoolListItem } from "./PoolListItem";
import { usePoolsWithFillSummary } from "./usePoolsFillSummary";

export const PoolList = () => {
  const { data, isLoading, isError } = usePoolsWithFillSummary();

  if (isLoading) {
    return <SmallLoading />;
  }
  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="m-4 flex flex-col gap-2">
      <div className="grid grid-cols-4 border-b-thin border-onsurface">
        <div>Market</div>
        <div>24H trade count</div>
        <div>24H price change</div>
        <div>24H volume</div>
      </div>
      {data.map((p) => (
        <PoolListItem poolWithFills={p} />
      ))}
    </div>
  );
};
