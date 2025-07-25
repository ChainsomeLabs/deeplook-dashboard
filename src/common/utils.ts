import type { Pool } from "./types";

export const hashEllision = (hash: string, length?: number) => {
  const n = length || 3;
  const withoutLeadingZeroes = BigInt(hash).toString(16);
  return "0x" + withoutLeadingZeroes.slice(0, n) + "..." + hash.slice(-n);
};

const poolNameTicksizeMap: { [key: string]: number } = {
  DEEP_SUI: 5,
  DEEP_USDC: 5,
  SUI_USDC: 4,
  BWETH_USDC: 1,
  WUSDC_USDC: 5,
  WUSDT_USDC: 5,
  NS_SUI: 5,
  NS_USDC: 5,
  TYPUS_SUI: 5,
  SUI_AUSD: 4,
  AUSD_USDC: 4,
  SEND_USDC: 4,
  WAL_USDC: 6,
  WAL_SUI: 6,
  XBTC_USDC: 0,
  DRF_SUI: 6,
};

/// This function returns tick size, currently this is hardcoded
/// as tick_size from pool does not reflect the precission we want
export const getPriceDec = (pool: Pool): number => {
  const fromMap = poolNameTicksizeMap[pool.pool_name];
  if (fromMap !== undefined) {
    return fromMap;
  }
  return 5; // magical constant for pools not listed in the map
};

export const roundPrice = (price: number, pool: Pool): string =>
  price.toFixed(getPriceDec(pool));
