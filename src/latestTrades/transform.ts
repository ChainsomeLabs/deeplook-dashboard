import { Decimal } from "decimal.js";
import { roundPriceNum } from "./../common/utils";
import type { Pool, TradeInfo } from "../common/types";

const merge = (trades: TradeInfo[], pool: Pool): TradeInfo => {
  const firstTrade = trades[0];
  let priceAgg = new Decimal(0);
  let base_quantity = 0;
  let quote_quantity = 0;
  const digest = firstTrade.digest;
  const checkpoint = firstTrade.checkpoint;
  const timestamp = firstTrade.timestamp;
  const taker_is_bid = firstTrade.taker_is_bid;

  trades.forEach((t) => {
    priceAgg = priceAgg.plus(new Decimal(t.price));
    base_quantity += t.base_quantity;
    quote_quantity += t.quote_quantity;
  });

  return {
    price: roundPriceNum(
      priceAgg.div(new Decimal(trades.length)).toNumber(),
      pool
    ),
    base_quantity,
    quote_quantity,
    digest,
    timestamp,
    checkpoint,
    taker_is_bid,
  };
};

export const transform = (trades: TradeInfo[], pool: Pool): TradeInfo[] => {
  const grouped = new Map<string, TradeInfo[]>();

  trades
    .map((t) => ({ ...t, timestamp: t.timestamp + "Z" }))
    .forEach((t) => {
      const prev = grouped.get(t.digest);

      if (!prev) {
        grouped.set(t.digest, [t]);
      } else {
        grouped.set(t.digest, [...prev, t]);
      }
    });

  const merged = [...grouped.values()].map((ts) => merge(ts, pool));

  return merged
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 23);
};
