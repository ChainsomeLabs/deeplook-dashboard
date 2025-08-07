import type { ReactNode } from "react";
import type { DepthData } from "./calc";
import { DepthChart } from "./Chart";
import type { Pool } from "../common/types";

const Item = ({ left, right }: { left: ReactNode; right: ReactNode }) => (
  <div className="flex justify-between items-center gap-20">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

export const DepthView = ({
  data,
  pool,
  quotePrice,
}: {
  data: DepthData;
  pool: Pool;
  quotePrice: number;
}) => {
  const { mid, askLimit, bidLimit, asks, bids, spread } = data;
  const enoughData = asks.length + bids.length > 0;

  return (
    <div>
      <div className="flex flex-col">
        <Item left="Mid price:" right={`${mid} (${bidLimit} - ${askLimit})`} />
        <Item
          left="Selected range:"
          right={`±${spread}% → ${bidLimit} - ${askLimit}`}
        />
      </div>
      <div>
        {enoughData ? (
          <div className="w-full h-72 rounded-lg p-4 border-2 border-surface-bright">
            <DepthChart
              asks={asks}
              bids={bids}
              pool={pool}
              quotePrice={quotePrice}
            />
          </div>
        ) : (
          <p className="text-center py-5">No orders withing range</p>
        )}
      </div>
    </div>
  );
};
