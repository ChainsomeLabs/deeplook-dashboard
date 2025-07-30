import { Loading } from "../common";
import type { PropsPool } from "../common/types";
import { LatestTradeItem } from "./LatestTradeItem";
import { useLatestTrades } from "./useLatestTrades";

export const LatestTrades = ({ pool }: PropsPool) => {
  const trades = useLatestTrades(pool);

  if (trades === null) {
    return (
      <div>
        <h3 className="pb-2">Latest Trades</h3>
        <div className="w-8">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="pb-2">Orderbook</h3>
      <div className="w-fit">
        {trades.map((t, i) => (
          <LatestTradeItem key={i} trade={t} pool={pool} />
        ))}
      </div>
    </div>
  );
};
