import type { Pool, TradeInfo } from "../common/types";
import {
  formatLargeNumber,
  formatUtcTimestamp,
  getPriceDec,
  getSizeDec,
  getSuiExplorerLink,
  roundPriceNum,
  shortInt,
} from "../common/utils";

type Props = {
  trade: TradeInfo;
  pool: Pool;
};

export const LatestTradeItem = ({ trade, pool }: Props) => {
  const { base_quantity, price, digest, timestamp, taker_is_bid } = trade;
  const parsedPrice = roundPriceNum(
    shortInt(price, 9 - pool.base_asset_decimals + pool.quote_asset_decimals),
    pool
  );
  const parsedBaseVolume = shortInt(base_quantity, pool.base_asset_decimals);
  const priceDec = getPriceDec(pool);
  const sizeDec = getSizeDec(pool);
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
        <div>{formatLargeNumber(parsedPrice, priceDec)}</div>
        <div>{formatLargeNumber(parsedBaseVolume, sizeDec)}</div>
      </div>
    </a>
  );
};
