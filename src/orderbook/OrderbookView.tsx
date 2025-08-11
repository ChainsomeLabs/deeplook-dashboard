import type { OrderbookWithTotalMidSpread, Pool } from "../common/types";
import { usePrices } from "../common/usePrice";
import { formatLargeNumber, getPriceDec } from "../common/utils";
import { OrderbookItemView } from "./OrderbookItemView";

type Props = { orderbook: OrderbookWithTotalMidSpread; pool: Pool };

export const OrderbookView = ({ orderbook, pool }: Props) => {
  const { data: prices } = usePrices();
  const { asks, bids, max, mid, spreadAbsolute, spreadPercentage } = orderbook;
  const { base_asset_symbol, quote_asset_symbol } = pool;

  const quotePrice =
    quote_asset_symbol === "USDC"
      ? 1
      : prices === undefined
      ? undefined
      : prices[quote_asset_symbol];

  const priceDec = getPriceDec(pool);

  return (
    <div>
      <div className="relative flex pb-2">
        <h5 className="flex-[0.5] text-start relative text-xs sm:text-lg">
          Price ({quote_asset_symbol})
        </h5>
        <h5 className="flex-1 text-end text-xs sm:text-lg">
          Quantity ({base_asset_symbol})
        </h5>
        <h5 className="flex-1 text-end text-xs sm:text-lg">
          Total ({base_asset_symbol})
        </h5>
        <h5 className="flex-1 text-end text-xs sm:text-lg">Total (USD)</h5>
      </div>
      {asks.map((ask, i) => (
        <OrderbookItemView
          key={i}
          data={ask}
          max={max}
          type="ask"
          pool={pool}
          quotePrice={quotePrice}
        />
      ))}
      <div className="flex items-center justify-between text-lg bg-surface-container-highest">
        <div>{/* empty div for alignment */}</div>
        <div>{formatLargeNumber(mid, priceDec)}</div>
        <div>{formatLargeNumber(spreadAbsolute, priceDec)}</div>
        <div>{spreadPercentage.toFixed(2)}%</div>
        <div>{/* empty div for alignment */}</div>
      </div>
      {bids.map((bid, i) => (
        <OrderbookItemView
          key={i}
          data={bid}
          max={max}
          type="bid"
          pool={pool}
          quotePrice={quotePrice}
        />
      ))}
    </div>
  );
};
