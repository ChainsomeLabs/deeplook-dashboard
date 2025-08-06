import { useParams } from "react-router";
import { Orderbook } from "../orderbook";
import { usePools } from "../poolSelect/usePools";
import { SmallLoading } from "../common/Loading";
import type { Pool } from "../common/types";
import { PoolInfo } from "../poolInfo";
import { Card } from "../common";
import { Depth } from "../depth/Depth";
import { LatestTrades } from "../latestTrades";
import { CandleChart } from "../candleChart";
import { getNowToMinute } from "../common/utils";
import { AverageTrade } from "../averageTrade";
import { VolumeMultiwindow } from "../volumeMultiwindow";

export const PoolWithPool = ({ pool }: { pool: Pool }) => (
  <>
    <div className="grid grid-cols-12 mb-4 gap-4">
      {/* Chart - wide */}
      <Card className="order-1 col-span-12 xl:col-span-5 min-w-0 min-h-100">
        <div className="w-full h-full flex flex-col aspect-square sm:aspect-video lg:aspect-auto">
          <CandleChart
            pool={pool}
            start={getNowToMinute() - 24 * 60 * 60}
            end={getNowToMinute()}
          />
        </div>
      </Card>

      {/* Orderbook - medium */}
      <Card className="order-2 col-span-12 sm:col-span-7 xl:col-span-4 min-w-0">
        <Orderbook pool={pool} />
      </Card>

      {/* Latest Trades - narrow */}
      <Card className="order-3 col-span-12 sm:col-span-5 xl:col-span-3 min-w-[200px]">
        <LatestTrades pool={pool} />
      </Card>

      {/* Pool Info - narrow */}
      <Card className="order-5 xl:order-5 col-span-12 xl:col-span-3 flex-[0.8]">
        <PoolInfo pool={pool} />
      </Card>

      {/* Volume + Average Trade - medium */}
      <Card className="order-6 xl:order-4 col-span-12 xl:col-span-3 min-w-0">
        <div className="flex flex-col h-full justify-between gap-4">
          <VolumeMultiwindow pool={pool} />
          <AverageTrade pool={pool} />
        </div>
      </Card>

      {/* Depth - wide */}
      <Card className="order-4 xl:order-6 col-span-12 xl:col-span-6">
        <Depth pool={pool} />
      </Card>
    </div>
  </>
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
