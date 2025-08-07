import { SmallLoading } from "../common";
import type { PropsPool } from "../common/types";
import { LatestTradeItem } from "./LatestTradeItem";
import { useLatestTrades } from "./useLatestTrades";

export const LatestTrades = ({ pool }: PropsPool) => {
  const trades = useLatestTrades(pool);

  if (trades === null) {
    return (
      <div>
        <h3 className="pb-2">Latest Trades</h3>
        <SmallLoading />
      </div>
    );
  }

  return (
    <div>
      <h3 className="pb-2">Latest Trades</h3>
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2 px-2">
          <div>Time</div>
          <div>Price ({pool.quote_asset_symbol})</div>
          <div>Volume ({pool.base_asset_symbol})</div>
        </div>
        {trades.map((t, i) => (
          <LatestTradeItem key={i} trade={t} pool={pool} />
        ))}
      </div>
    </div>
  );
};
