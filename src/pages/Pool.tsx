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
    <div className="flex flex-col md:flex-row gap-4 items-stretch mb-4">
      {/* Chart - wide */}
      <Card className="basis-4/7 min-w-0 flex flex-col">
        <CandleChart
          pool={pool}
          start={getNowToMinute() - 24 * 60 * 60}
          end={getNowToMinute()}
        />
      </Card>

      {/* Orderbook - medium */}
      <Card className="basis-2/7 min-w-0 flex flex-col">
        <Orderbook pool={pool} />
      </Card>

      {/* Latest Trades - narrow */}
      <Card className="basis-1/7 min-w-[200px] flex flex-col">
        <LatestTrades pool={pool} />
      </Card>
    </div>

    {/* Second row */}

    <div className="flex flex-col md:flex-row gap-4 items-stretch mb-4">

      {/* Pool Info - narrow */}
      <Card className="flex-[0.8] flex flex-col">
        <PoolInfo pool={pool} />
      </Card>

      {/* Volume + Average Trade - medium */}
      <Card className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex flex-col h-full justify-between gap-4">
          <VolumeMultiwindow pool={pool} />
          <AverageTrade pool={pool} />
        </div>
      </Card>


      {/* Depth - wide */}
      <Card className="flex-[2] min-w-0 flex flex-col">
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
