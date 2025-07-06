import { useParams } from "react-router";
import { Orderbook } from "../orderbook";

export const Pool = () => {
  const { poolName } = useParams<{ poolName: string }>();

  return (
    <div>
      <h4>{poolName}</h4>
      <Orderbook poolName={poolName!} />
    </div>
  );
};
