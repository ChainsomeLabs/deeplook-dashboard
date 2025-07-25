import type { OrderbookWithTotal, Pool } from "../common/types";
import { roundPrice } from "../common/utils";

export type Spread = {
  bestBid: number;
  bestAsk: number;
  diff: string;
};

export const calcSpread = (
  ob: OrderbookWithTotal,
  pool: Pool
): Spread | null => {
  const bestAsk =
    ob.asks.length > 0
      ? Math.min(...ob.asks.map((entry) => entry.order.price))
      : null;

  const bestBid =
    ob.bids.length > 0
      ? Math.max(...ob.bids.map((entry) => entry.order.price))
      : null;

  if (bestAsk && bestBid && bestAsk > bestBid) {
    return { bestBid, bestAsk, diff: roundPrice(bestAsk - bestBid, pool) };
  }
  return null;
};
