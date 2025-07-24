import type { OrderbookWithTotal, Pool } from "../common/types";
import { OrderbookItemView } from "./OrderbookItemView";

type Props = { orderbook: OrderbookWithTotal; pool: Pool };

export const OrderbookView = ({ orderbook, pool }: Props) => {
  const { asks, bids, max } = orderbook;
  const { base_asset_symbol, quote_asset_symbol } = pool;
  return (
    <div>
      <div className="relative flex pb-2">
        <p className="flex-[0.5] text-xl text-start relative">
          Price ({quote_asset_symbol})
        </p>
        <p className="flex-1 text-xl text-end">
          Quantity ({base_asset_symbol})
        </p>
        <p className="flex-1 text-xl text-end tabular-nums">
          Total quantity ({base_asset_symbol})
        </p>
      </div>
      {asks.map((ask, i) => (
        <OrderbookItemView key={i} data={ask} max={max} type="ask" />
      ))}
      {bids.map((bid, i) => (
        <OrderbookItemView key={i} data={bid} max={max} type="bid" />
      ))}
    </div>
  );
};
