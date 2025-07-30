import type { Pool, TradeInfo } from "../common/types";
import {
  formatUtcTimestamp,
  getSuiExplorerLink,
  roundPrice,
  shortInt,
} from "../common/utils";

type Props = {
  trade: TradeInfo;
  pool: Pool;
};

export const LatestTradeItem = ({ trade, pool }: Props) => {
  const { base_quantity, price, digest, timestamp } = trade;
  const parsedPrice = roundPrice(
    shortInt(price, 9 - pool.base_asset_decimals + pool.quote_asset_decimals),
    pool
  );
  const datetime = formatUtcTimestamp(timestamp);

  return (
    <a
      href={getSuiExplorerLink(digest, "tx")}
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <div className="flex gap-4">
        <div>{datetime}</div>
        <div>
          {pool.quote_asset_symbol} {parsedPrice}
        </div>
        <div>{shortInt(base_quantity, pool.base_asset_decimals)}</div>
      </div>
    </a>
  );
};
