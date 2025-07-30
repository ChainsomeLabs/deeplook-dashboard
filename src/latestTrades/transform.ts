import type { TradeInfo } from "../common/types";

export const transform = (trades: TradeInfo[]): TradeInfo[] => {
  return trades
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 20);
};
