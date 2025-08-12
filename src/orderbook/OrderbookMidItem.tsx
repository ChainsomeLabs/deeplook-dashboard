import { formatLargeNumber } from "../common/utils";

type Props = {
  mid: number;
  spread: number;
  spreadPercentage: number;
  priceDec: number;
};

export const Mid = ({ mid, spread, spreadPercentage, priceDec }: Props) => {
  return (
    <div className="flex items-center justify-around text-lg bg-surface-container-highest">
      <div>
        <span className="text-sm text-secondary">mid:</span>{" "}
        {formatLargeNumber(mid, priceDec)}
      </div>
      <div>
        <span className="text-sm text-secondary">spread:</span>{" "}
        {formatLargeNumber(spread, priceDec)} / {spreadPercentage.toFixed(2)}%
      </div>
    </div>
  );
};
