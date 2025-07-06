import type { OrderWithTotal } from ".";

type Props = { data: OrderWithTotal; max: number; type: "ask" | "bid" };

export const OrderbookItemView = ({ data, type, max }: Props) => {
  const { order, total } = data;

  return (
    <div className="relative flex cursor-pointer">
      <p
        className={`${
          type === "ask" ? "text-ui-ask" : "text-ui-bid"
        } flex-[0.5] text-start relative tabular-nums`}
      >
        {order[0]}
      </p>
      <p className="text-ui-offwhite flex-1 text-end tabular-nums">
        {order[1]}
      </p>
      <p className="text-ui-offwhite flex-1 text-end tabular-nums">{total}</p>
      <div
        className={`${
          type === "ask" ? "bg-ui-ask" : "bg-ui-bid"
        } opacity-10 absolute right-0 top-0 bottom-0`}
        style={{ width: `${(total / max) * 100}%` }}
      />
    </div>
  );
};
