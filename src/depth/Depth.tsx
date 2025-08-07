import { useState } from "react";
import { SmallLoading } from "../common";
import type { PropsPool } from "../common/types";
import { transformOrderbook } from "../orderbook/transform";
import { useOrderbook } from "../orderbook/useOrderbook";
import { calcDepth } from "./calc";
import { DepthView } from "./DepthView";
import { usePrices } from "../common/usePrice";

type ButtonsProps = {
  options: number[];
  spread: number;
  setSpread: (n: number) => void;
};

const Buttons = ({ options, spread, setSpread }: ButtonsProps) => {
  return (
    <div className="inline-flex rounded-md shadow-sm border border-gray-700 overflow-hidden">
      {options.map((o, i) => (
        <button
          key={i}
          onClick={() => setSpread(o)}
          className={`
        px-3 py-1 text-sm font-medium transition-colors
        ${
          spread === o
            ? "bg-white text-black"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }
        ${i === 0 ? "rounded-l-md" : ""}
        ${i === options.length - 1 ? "rounded-r-md" : ""}
        ${i > 0 ? "border-l border-gray-700" : ""}
      `}
        >
          ±{o}%
        </button>
      ))}
    </div>
  );
};

const Header = ({ spread }: { spread: number }) => (
  <h3 className="pb-2">Depth (±{spread}%)</h3>
);

export const Depth = ({ pool }: PropsPool) => {
  const orderbook = useOrderbook(pool);
  const { data: prices } = usePrices();

  const price =
    pool.quote_asset_symbol === "USDC"
      ? 1
      : prices === undefined
      ? undefined
      : prices[pool.quote_asset_symbol];

  const spreadOptions = [2, 5, 10];
  const [spread, setSpread] = useState(spreadOptions[0]);

  if (orderbook === null || price === undefined) {
    return (
      <div>
        <Header spread={spread} />
        <Buttons
          spread={spread}
          options={spreadOptions}
          setSpread={setSpread}
        />
        <SmallLoading />
      </div>
    );
  }

  const depthData = calcDepth(
    pool,
    transformOrderbook(orderbook, { levels: 100 }),
    spread
  );

  if (depthData === null) {
    return (
      <div>
        <Header spread={spread} />
        <Buttons
          spread={spread}
          options={spreadOptions}
          setSpread={setSpread}
        />
        <div>
          <p>Not enough orders to calculate.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header spread={spread} />
      <Buttons spread={spread} options={spreadOptions} setSpread={setSpread} />
      <DepthView data={depthData} pool={pool} quotePrice={price} />
    </div>
  );
};
