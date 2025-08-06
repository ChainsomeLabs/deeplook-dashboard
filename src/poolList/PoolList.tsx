import { useState } from "react";
import { SmallLoading } from "../common";
import { PoolListItem } from "./PoolListItem";
import { usePoolsWithFillSummary } from "./usePoolsFillSummary";

const Arrow = ({
  active,
  direction,
}: {
  active: boolean;
  direction: "up" | "down";
}) => (
  <span
    className={`ml-1 text-[8px] ${active ? "text-onsurface" : "text-surface"}`}
  >
    {direction === "up" ? "▲" : "▼"}
  </span>
);

const Arrows = ({
  activeUp,
  activeDown,
}: {
  activeUp: boolean;
  activeDown: boolean;
}) => {
  if (activeUp) {
    return <Arrow active={activeUp} direction="up" />;
  }
  if (activeDown) {
    return <Arrow active={activeDown} direction="down" />;
  }
  return null;
};

export const PoolList = () => {
  const { data, isLoading, isError } = usePoolsWithFillSummary();
  const [sortKey, setSortKey] = useState<
    "market" | "trade_count" | "price_change" | "volume"
  >("market");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  if (isLoading) {
    return <SmallLoading />;
  }
  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  const handleSort = (key: typeof sortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("desc"); // default to desc on new key
    }
  };

  const HeaderItem = ({ id, title }: { id: typeof sortKey; title: string }) => {
    return (
      <div
        onClick={() => handleSort(id)}
        className="cursor-pointer flex gap-2 items-center"
      >
        {title}
        <Arrows
          activeUp={sortKey === id && sortDirection === "asc"}
          activeDown={sortKey === id && sortDirection === "desc"}
        />
      </div>
    );
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal, bVal;

    switch (sortKey) {
      case "market":
        aVal = a.pool_name;
        bVal = b.pool_name;
        break;
      case "trade_count":
        aVal = Number(a.trade_count_24h);
        bVal = Number(b.trade_count_24h);
        break;
      case "price_change":
        aVal =
          ((a.price_close_24h - a.price_open_24h) / a.price_open_24h) * 100;
        bVal =
          ((b.price_close_24h - b.price_open_24h) / b.price_open_24h) * 100;
        break;
      case "volume":
        aVal = Number(a.base_volume_24h) * a.base_price;
        bVal = Number(b.base_volume_24h) * b.base_price;
        break;
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="m-4 flex flex-col gap-2">
      <div className="grid grid-cols-4 border-b-thin border-onsurface">
        <HeaderItem title="Market" id="market" />
        <HeaderItem title="24H trade count" id="trade_count" />
        <HeaderItem title="24H price change" id="price_change" />
        <HeaderItem title="24H volume" id="volume" />
      </div>
      {sortedData.map((p, i) => (
        <PoolListItem key={i} poolWithFills={p} />
      ))}
    </div>
  );
};
