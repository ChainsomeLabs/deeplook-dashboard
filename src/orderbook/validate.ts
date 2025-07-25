import type { Order, Orderbook, Pool } from "../common/types";
import { getPriceDec } from "../common/utils";

const isOrderbook = (data: unknown): data is Orderbook => {
  if (
    !data ||
    typeof data !== "object" ||
    !Object.hasOwn(data, "asks") ||
    !Object.hasOwn(data, "bids") ||
    !isOrderArray((data as Orderbook).bids) ||
    !isOrderArray((data as Orderbook).asks)
  ) {
    return false;
  }
  return true;
};

const isOrderArray = (data: unknown): data is Order => {
  const isValidNumber = (n: unknown): n is number =>
    typeof n === "number" && isFinite(n);
  if (!data || !Array.isArray(data)) {
    return false;
  }
  if (!data.every((o) => isValidNumber(o?.price) && isValidNumber(o?.size))) {
    return false;
  }
  return true;
};

export const validateOrderbook = (
  pool: Pool,
  data: unknown
): Orderbook | null => {
  if (!isOrderbook(data)) {
    return null;
  }

  const { lot_size, quote_asset_decimals } = pool;

  const tick = getPriceDec(pool);
  const lot = Math.log10(10 ** quote_asset_decimals / lot_size);

  const roundToStep = (value: number, step: number) => {
    if (step < 0) {
      return Number((value * 10 ** -step).toFixed(0));
    }
    return Number(value.toFixed(step));
  };

  const validateSide = (side: Order[]): Order[] =>
    side
      .map((entry) => ({
        price: Number(entry.price.toFixed(tick)),
        size: roundToStep(entry.size, lot),
      }))
      .filter((entry) => entry.size > 0); // avoid rounding to 0

  const bids = validateSide(data.bids);
  const asks = validateSide(data.asks);

  return { bids, asks };
};
