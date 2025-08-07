import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { OrderWithTotal, Pool } from "../common/types";
import { formatLargeNumber, getPriceDec, getSizeDec } from "../common/utils";

type Props = {
  bids: OrderWithTotal[];
  asks: OrderWithTotal[];
  pool: Pool;
};

export const DepthChart = ({ bids, asks, pool }: Props) => {
  const data = [
    ...bids.map((d) => ({
      price: d.order.price,
      cumulative: d.total,
      side: "bid",
    })),
    ...asks.map((d) => ({
      price: d.order.price,
      cumulative: d.total,
      side: "ask",
    })),
  ];

  const priceDec = getPriceDec(pool);
  const sizeDec = getSizeDec(pool);

  // Sort ascending by price for smooth X-axis
  data.sort((a, b) => a.price - b.price);

  const formatPrice = (v: number) => formatLargeNumber(v, priceDec);
  const formatSize = (v: number) => formatLargeNumber(v, sizeDec);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis
          dataKey="price"
          type="number"
          domain={["dataMin", "dataMax"]}
          stroke="#aaa"
          tick={{ fontSize: 12 }}
          tickFormatter={formatPrice}
        />
        <YAxis
          dataKey="cumulative"
          stroke="#aaa"
          tick={{ fontSize: 12 }}
          width={60}
          tickFormatter={formatSize}
        />
        <Tooltip
          formatter={(value: number) => [
            `${formatLargeNumber(value, sizeDec)}`,
            "Cumulative",
          ]}
          contentStyle={{
            backgroundColor: "#1f1e31", // your dark background
            borderColor: "#333",
            borderRadius: "0.25rem",
          }}
          itemStyle={{
            color: "#f1f1f1", // light text
            fontSize: "0.875rem",
          }}
          labelStyle={{
            color: "#a0a0a0",
            fontWeight: 500,
          }}
        />
        <Area
          type="stepAfter"
          dataKey={(entry) => (entry.side === "bid" ? entry.cumulative : null)}
          stroke="#2ebd85"
          fill="#2ebd85"
          fillOpacity={0.2}
          isAnimationActive={false}
          name="Bids"
        />
        <Area
          type="stepAfter"
          dataKey={(entry) => (entry.side === "ask" ? entry.cumulative : null)}
          stroke="#f6465d"
          fill="#f6465d"
          fillOpacity={0.2}
          isAnimationActive={false}
          name="Asks"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
