import Decimal from "decimal.js";
import type {
  Order,
  Orderbook,
  OrderbookWithTotal,
  OrderWithTotal,
} from "../common/types";

const calculateRunningTotal = (orders: Order[]): OrderWithTotal[] => {
  const result: { order: Order; total: number; quoteTotal: number }[] = [];
  let total = new Decimal(0);
  let quoteTotal = new Decimal(0);

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    total = total.plus(new Decimal(order.size));
    quoteTotal = quoteTotal.plus(
      new Decimal(order.size).mul(new Decimal(order.price))
    );
    result.push({
      order,
      total: total.toNumber(),
      quoteTotal: quoteTotal.toNumber(),
    });
  }

  return result;
};

type OrderbookTransformOptions = {
  levels?: number;
};

/**
 * Keeps chosen amount of levels from the center and calculates running total.
 */
export const transformOrderbook = (
  ob: Orderbook,
  options: OrderbookTransformOptions = {}
): OrderbookWithTotal => {
  const { levels = 12 } = options;
  const asks = calculateRunningTotal(
    ob.asks.sort((a, b) => Number(a.price) - Number(b.price)).slice(0, levels)
  ).sort((a, b) => b.order.price - a.order.price);
  const bids = calculateRunningTotal(
    ob.bids.sort((a, b) => Number(b.price) - Number(a.price)).slice(0, levels)
  );

  const max = Math.max(...[...asks, ...bids].map((o) => Number(o.total)));

  return {
    asks,
    bids,
    max,
  };
};
