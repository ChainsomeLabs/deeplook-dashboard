import { SmallLoading } from "../common";
import type { Pool } from "../common/types";
import { OrderbookView } from "./OrderbookView";
import { transformOrderbook } from "./transform";
import { useOrderbook } from "./useOrderbook";

export const Orderbook = ({ pool }: { pool: Pool }) => {
  const orderbook = useOrderbook(pool);

  if (orderbook === null) {
    return (
      <div>
        <h3 className="pb-2">Orderbook</h3>
        <SmallLoading />
      </div>
    );
  }

  return (
    <div>
      <h3 className="pb-2">Orderbook</h3>
      <OrderbookView orderbook={transformOrderbook(orderbook)} pool={pool} />
    </div>
  );
};
