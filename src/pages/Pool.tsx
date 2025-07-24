import { useParams } from "react-router";
import { Orderbook } from "../orderbook";
import { usePools } from "../pools/usePools";
import { Loading } from "../common/Loading";
import type { Pool } from "../common/types";

export const PoolWithPool = ({ pool }: { pool: Pool }) => (
  <div>
    <h4>{pool.pool_name}</h4>
    <div className="max-w-[840px] rounded-md border-2 border-gray-500 p-4">
      <Orderbook pool={pool} />
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
        <div className="w-8">
          <Loading />
        </div>
      </div>
    );
  }

  return <PoolWithPool pool={thisPool} />;
};
