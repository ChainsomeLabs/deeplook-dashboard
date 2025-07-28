import type { OrderbookWithTotal, OrderWithTotal, Pool } from "../common/types";
import { roundPrice } from "../common/utils";

export type DepthData = {
  mid: string;
  askLimit: string;
  bidLimit: string;
  asks: OrderWithTotal[];
  bids: OrderWithTotal[];
  spread: number;
};

export const calcDepth = (
  pool: Pool,
  orderbook: OrderbookWithTotal,
  spread: number
): DepthData | null => {
  const minAsk = orderbook.asks.at(-1);
  const maxBid = orderbook.bids.at(0);

  if (minAsk === undefined || maxBid === undefined) {
    // TODO: could be calculated with only one side
    return null;
  }

  const mid = (minAsk.order.price + maxBid.order.price) / 2;
  const askLimit = ((100 + spread) / 100) * mid;
  const bidLimit = ((100 - spread) / 100) * mid;
  const asks = orderbook.asks.filter((o) => o.order.price <= askLimit);
  const bids = orderbook.bids.filter((o) => o.order.price >= bidLimit);

  return {
    mid: roundPrice(mid, pool),
    askLimit: roundPrice(askLimit, pool),
    bidLimit: roundPrice(bidLimit, pool),
    asks,
    bids,
    spread,
  };
};
