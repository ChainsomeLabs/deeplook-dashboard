import type { OrderWithTotal, Pool } from "../common/types";
import { formatLargeNumber, getPriceDec, getSizeDec } from "../common/utils";

type Props = {
  data: OrderWithTotal;
  max: number;
  type: "ask" | "bid";
  pool: Pool;
  quotePrice?: number;
};

export const OrderbookItemView = ({
  data,
  type,
  max,
  pool,
  quotePrice,
}: Props) => {
  const { order, total } = data;

  const totalUsd =
    quotePrice === undefined
      ? "--"
      : formatLargeNumber(data.quoteTotal * quotePrice, 2);

  return (
    <div className="relative flex">
      <p
        className={`${
          type === "ask" ? "text-ui-ask" : "text-ui-bid"
        } flex-[0.5] text-start relative tabular-nums`}
      >
        {formatLargeNumber(order.price, getPriceDec(pool))}
      </p>
      <p className="text-ui-offwhite flex-1 text-end tabular-nums">
        {formatLargeNumber(order.size, getSizeDec(pool))}
      </p>
      <p className="text-ui-offwhite flex-1 text-end tabular-nums">
        {formatLargeNumber(total, getSizeDec(pool))}
      </p>
      <p className="text-ui-offwhite flex-1 text-end tabular-nums">
        ${totalUsd}
      </p>
      <div
        className={`${
          type === "ask" ? "bg-ui-ask" : "bg-ui-bid"
        } opacity-10 absolute right-0 top-0 bottom-0`}
        style={{ width: `${(total / max) * 100}%` }}
      />
    </div>
  );
};
