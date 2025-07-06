import type { OrderWithTotal } from ".";
import { OrderbookItemView } from "./OrderbookItemView";

type Props = { asks: OrderWithTotal[]; bids: OrderWithTotal[]; max: number };

export const OrderbookView = ({ asks, bids, max }: Props) => (
  <div>
    {asks.map((ask, i) => (
      <OrderbookItemView key={i} data={ask} max={max} type="ask" />
    ))}
    {bids.map((bid, i) => (
      <OrderbookItemView key={i} data={bid} max={max} type="bid" />
    ))}
  </div>
);
