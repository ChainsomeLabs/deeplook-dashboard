import { Loading } from "../common/Loading";
import type { Pool } from "../common/types";
import { OrderbookView } from "./OrderbookView";
import { transformOrderbook } from "./transform";
import { useOrderbook } from "./useOrderbook";

export const Orderbook = ({ pool }: { pool: Pool }) => {
  const orderbook = useOrderbook(pool);

  if (orderbook === null) {
    return (
      <div className="w-8">
        <Loading />
      </div>
    );
  }

  return (
    <OrderbookView orderbook={transformOrderbook(orderbook)} pool={pool} />
  );
};
