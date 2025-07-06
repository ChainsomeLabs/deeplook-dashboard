import type { Order } from "../api/response";
import { Loading } from "../common/Loading";
import { OrderbookView } from "./OrderbookView";
import { useOrderbook } from "./usePools";

export type OrderWithTotal = {
  order: Order;
  total: number;
};

const calculateRunningTotal = (
  orders: Order[]
): { order: Order; total: number }[] => {
  const result: { order: Order; total: number }[] = [];
  let total = 0;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    total += Number(order[1]);
    result.push({ order, total });
  }

  return result;
};

export const Orderbook = ({ poolName }: { poolName: string }) => {
  const { data, isLoading, isError } = useOrderbook(poolName);

  if (isLoading) {
    return (
      <div className="w-8">
        <Loading />
      </div>
    );
  }

  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  const asks = calculateRunningTotal(
    data.asks.sort((a, b) => Number(a[0]) - Number(b[0]))
  );
  const bids = calculateRunningTotal(
    data.bids.sort((a, b) => Number(b[0]) - Number(a[0]))
  );

  const max = Math.max(
    ...[...data.asks, ...data.bids].map((o) => Number(o[1]))
  );

  return (
    <OrderbookView
      asks={asks.sort((a, b) => Number(b.order[0]) - Number(a.order[0]))}
      bids={bids}
      max={max}
    />
  );
};
