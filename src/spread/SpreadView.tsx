import type { Spread } from "./calcSpread";

const Item = ({ left, right }: { left: string; right: string }) => (
  <div className="flex justify-between items-center gap-20">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

export const SpreadView = ({ spread }: { spread: Spread }) => {
  const { bestAsk, bestBid, diff } = spread;
  return (
    <div className="flex flex-col gap-4">
      <Item left="Lowest ask:" right={bestAsk.toString(10)} />
      <Item left="Highest bid:" right={bestBid.toString(10)} />
      <Item left="Spread:" right={diff} />
    </div>
  );
};
