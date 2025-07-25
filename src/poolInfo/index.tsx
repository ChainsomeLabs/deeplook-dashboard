import type { Pool } from "../common/types";
import { hashEllision } from "../common/utils";

const Item = ({ left, right }: { left: string; right: string }) => (
  <div className="flex justify-between items-center gap-20">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

export const PoolInfo = ({ pool }: { pool: Pool }) => (
  <div className="flex flex-col gap-1 md:min-w-100">
    <Item left="Pool id:" right={hashEllision(pool.pool_id)} />
    <Item left="Base asset:" right={pool.base_asset_name} />
    <Item left="Base asset symbol:" right={pool.base_asset_symbol} />
    <Item
      left="Base asset decimals:"
      right={pool.base_asset_decimals.toString(10)}
    />
    <Item left="Quote asset:" right={pool.quote_asset_name} />
    <Item left="Quote asset symbol:" right={pool.quote_asset_symbol} />
    <Item
      left="Quote asset decimals:"
      right={pool.quote_asset_decimals.toString(10)}
    />
    <Item left="Tick size:" right={pool.tick_size.toString(10)} />
    <Item left="Lot size:" right={pool.lot_size.toString(10)} />
  </div>
);
