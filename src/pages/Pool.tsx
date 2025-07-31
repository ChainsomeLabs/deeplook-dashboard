import { useParams } from "react-router";
import { Orderbook } from "../orderbook";
import { usePools } from "../poolSelect/usePools";
import { SmallLoading } from "../common/Loading";
import type { Pool } from "../common/types";
import { PoolInfo } from "../poolInfo";
import { Card } from "../common";
import { Depth } from "../depth/Depth";
import { LatestTrades } from "../latestTrades";

export const PoolWithPool = ({ pool }: { pool: Pool }) => (
  <div>
    <h4>{pool.pool_name}</h4>
    <div className="flex flex-wrap gap-4">
      <Card>
        <PoolInfo pool={pool} />
      </Card>
      <Card className="flex-grow">
        <Orderbook pool={pool} />
      </Card>
      <Card className="max-w-[600px]">
        <Depth pool={pool} />
      </Card>
      <Card className="w-fit">
        <LatestTrades pool={pool} />
      </Card>
    </div>
  </div>
);

export const PoolPage = () => {
  const { poolName } = useParams<{ poolName: string }>();
  const { data: pools } = usePools();

  const thisPool = pools?.find((p) => p.pool_name === poolName);

  if (!thisPool) {
    return (
      <div>
        <h1>{poolName}</h1>
        <SmallLoading />
      </div>
    );
  }

  return <PoolWithPool pool={thisPool} />;
};
