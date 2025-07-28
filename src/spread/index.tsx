import { Loading } from "../common";
import type { PropsPool } from "../common/types";
import { transformOrderbook } from "../orderbook/transform";
import { useOrderbook } from "../orderbook/useOrderbook";
import { calcSpread } from "./calcSpread";
import { SpreadView } from "./SpreadView";

export const Spread = ({ pool }: PropsPool) => {
  const orderbook = useOrderbook(pool);

  if (orderbook === null) {
    return (
      <div>
        <h2>Spread</h2>
        <div className="w-8">
          <Loading />
        </div>
      </div>
    );
  }

  const spread = calcSpread(transformOrderbook(orderbook), pool);

  if (spread === null) {
    return (
      <div>
        <h2>Spread</h2>
        <div className="w-8">
          <p>Missing data I guess...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Spread</h2>
      <SpreadView spread={spread} />
    </div>
  );
};
