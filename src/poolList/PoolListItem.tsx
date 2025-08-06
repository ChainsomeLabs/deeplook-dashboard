import { Link } from "react-router";
import type { PoolWithFillsSummary } from "../common/types";
import Decimal from "decimal.js";
import { formatLargeNumber } from "../common/utils";

type Props = {
  poolWithFills: PoolWithFillsSummary;
};

export const PoolListItem = ({ poolWithFills }: Props) => {
  const {
    pool_name,
    trade_count_24h,
    price_open_24h,
    price_close_24h,
    base_volume_24h,
    base_asset_decimals,
    base_price,
  } = poolWithFills;
  const percentChange =
    ((price_close_24h - price_open_24h) / price_open_24h) * 100;

  const volumeUsd = new Decimal(base_volume_24h)
    .div(Decimal.pow(10, base_asset_decimals))
    .mul(new Decimal(base_price))
    .toNumber();

  return (
    <Link to={`/pool/${pool_name}`}>
      <div className="grid grid-cols-4 bg-surface-container rounded-xl px-4 py-2 border-1 border-transparent hover:bg-surface-container-highest hover:border-white transition-colors duration-150">
        <div>{pool_name}</div>
        <div>{trade_count_24h}</div>
        <div className={percentChange < 0 ? "text-ui-red" : "text-ui-green"}>
          {percentChange.toFixed(2)}%
        </div>
        <div>
          {volumeUsd < 1 ? "< $1" : `$${formatLargeNumber(volumeUsd, 0)}`}
        </div>
      </div>
    </Link>
  );
};
