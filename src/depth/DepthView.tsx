import type { ReactNode } from "react";
import type { DepthData } from "./calc";
import { DepthChart } from "./Chart";

const Item = ({ left, right }: { left: ReactNode; right: ReactNode }) => (
  <div className="flex justify-between items-center gap-20">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

export const DepthView = ({ data }: { data: DepthData }) => {
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
          <div className="w-full h-72 bg-gray-900 rounded-lg p-4">
            <DepthChart asks={asks} bids={bids} />
          </div>
        ) : (
          <p className="text-center py-5">No orders withing range</p>
        )}
      </div>
    </div>
  );
};
