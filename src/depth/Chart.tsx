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

type Payload = { price: number; cumulative: number; cumulativeUsd: number };

type TooltipProps = {
  active?: boolean;
  payload?: { payload: Payload }[];
};

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  const { price, cumulative, cumulativeUsd } = payload[0].payload;

  return (
    <div className="bg-[#1f1e31] p-2 rounded border border-[#333] text-sm text-white space-y-1">
      <div>
        <span className="text-gray-400">Price: </span>
        {price.toFixed(4)}
      </div>
      <div>
        <span className="text-gray-400">Cumulative: </span>
        {cumulative.toLocaleString()}
      </div>
      <div>
        <span className="text-gray-400">Cumulative USD: </span>$
        {cumulativeUsd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
};

type Props = {
  bids: OrderWithTotal[];
  asks: OrderWithTotal[];
  pool: Pool;
  quotePrice: number;
};

export const DepthChart = ({ bids, asks, pool, quotePrice }: Props) => {
  const data = [
    ...bids.map((d) => ({
      price: d.order.price,
      cumulative: d.total,
      cumulativeUsd: d.quoteTotal * quotePrice,
      side: "bid",
    })),
    ...asks.map((d) => ({
      price: d.order.price,
      cumulative: d.total,
      cumulativeUsd: d.quoteTotal * quotePrice,
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
        {/* Right Y Axis - cumulative USD */}
        <YAxis
          dataKey="cumulativeUsd"
          yAxisId="right"
          orientation="right"
          stroke="#aaa"
          tick={{ fontSize: 12 }}
          width={60}
          tickFormatter={(val) => formatLargeNumber(val, 2)} // or whatever you want
        />
        <Tooltip content={<CustomTooltip />} />
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
