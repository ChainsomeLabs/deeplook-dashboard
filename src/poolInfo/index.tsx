import type { ReactNode } from "react";
import type { Pool } from "../common/types";
import { getSuiExplorerLink, hashEllision } from "../common/utils";
import { AverageTrade } from "../averageTrade";

const Item = ({ left, right }: { left: ReactNode; right: ReactNode }) => (
  <div className="flex justify-between items-center gap-20">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

export const PoolInfo = ({ pool }: { pool: Pool }) => (
  <div>
    <h3 className="pb-2">Pool Info</h3>

    <div className="flex flex-col gap-1 md:min-w-100">
      <Item
        left="Pool id:"
        right={
          <a
            href={getSuiExplorerLink(pool.pool_id, "object")}
            target="_blank"
            rel="noopener nofollow noreferrer"
            className="text-blue-500 underline"
            title="See pool object on sui explorer"
          >
            {hashEllision(pool.pool_id)}
          </a>
        }
      />
      <Item
        left="Base asset:"
        right={
          <a
            href={getSuiExplorerLink(pool.base_asset_id, "coin")}
            target="_blank"
            rel="noopener nofollow noreferrer"
            className="text-blue-500 underline"
            title="See base asset on sui explorer"
          >
            {pool.base_asset_name}
          </a>
        }
      />
      <Item left="Base asset symbol:" right={pool.base_asset_symbol} />
      <Item
        left="Base asset decimals:"
        right={pool.base_asset_decimals.toString(10)}
      />
      <Item
        left="Quote asset:"
        right={
          <a
            href={getSuiExplorerLink(pool.quote_asset_id, "coin")}
            target="_blank"
            rel="noopener nofollow noreferrer"
            className="text-blue-500 underline"
            title="See quote asset on sui explorer"
          >
            {pool.quote_asset_name}
          </a>
        }
      />
      <Item left="Quote asset symbol:" right={pool.quote_asset_symbol} />
      <Item
        left="Quote asset decimals:"
        right={pool.quote_asset_decimals.toString(10)}
      />
      <Item left="Tick size:" right={pool.tick_size.toString(10)} />
      <Item left="Lot size:" right={pool.lot_size.toString(10)} />
      <AverageTrade pool={pool} />
    </div>
  </div>
);
