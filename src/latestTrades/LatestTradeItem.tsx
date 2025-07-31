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
  const { base_quantity, price, digest, timestamp, taker_is_bid } = trade;
  const parsedPrice = roundPrice(
    shortInt(price, 9 - pool.base_asset_decimals + pool.quote_asset_decimals),
    pool
  );
  const [, time] = formatUtcTimestamp(timestamp);

  return (
    <a
      href={getSuiExplorerLink(digest, "tx")}
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <div
        className={`grid grid-cols-3 gap-2 px-2 ${
          taker_is_bid ? "text-ui-bid" : "text-ui-ask"
        }`}
      >
        <div>{time}</div>
        <div>{parsedPrice}</div>
        <div>{shortInt(base_quantity, pool.base_asset_decimals)}</div>
      </div>
    </a>
  );
};
