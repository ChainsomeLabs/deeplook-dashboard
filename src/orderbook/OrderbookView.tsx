import type { OrderbookWithTotal, Pool } from "../common/types";
import { OrderbookItemView } from "./OrderbookItemView";

type Props = { orderbook: OrderbookWithTotal; pool: Pool };

export const OrderbookView = ({ orderbook, pool }: Props) => {
  const { asks, bids, max } = orderbook;
  const { base_asset_symbol, quote_asset_symbol } = pool;
  return (
    <div>
      <div className="relative flex pb-2">
        <h5 className="flex-[0.5] text-start relative">
          Price{"\u00A0"}({quote_asset_symbol})
        </h5>
        <h5 className="flex-1 text-end">
          Quantity{"\u00A0"}({base_asset_symbol})
        </h5>
        <h5 className="flex-1 text-end tabular-nums">
          Total{"\u00A0"}({base_asset_symbol})
        </h5>
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
