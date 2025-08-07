import Decimal from "decimal.js";
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

const poolNameSizeDecMap: { [key: string]: number } = {
  DEEP_SUI: 0,
  DEEP_USDC: 0,
  SUI_USDC: 0,
  WAL_USDC: 0,
  BWETH_USDC: 3,
  XBTC_USDC: 3,
  DRF_SUI: 0,
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

export const getSizeDec = (pool: Pool): number => {
  const fromMap = poolNameSizeDecMap[pool.pool_name];
  if (fromMap !== undefined) {
    return fromMap;
  }
  return 1;
};

export const roundPrice = (price: number, pool: Pool): string =>
  price.toFixed(getPriceDec(pool));

export const roundSize = (size: number, pool: Pool): string => {
  const dec = pool.base_asset_decimals - Math.log10(pool.lot_size);
  if (dec > 0) {
    return size.toFixed(dec);
  }
  return size.toFixed(0);
};

export const roundPriceNum = (price: number, pool: Pool): number =>
  Number(price.toFixed(getPriceDec(pool)));

export const getSuiExplorerLink = (
  objId: string,
  objType: "object" | "coin" | "tx"
) => `https://suiscan.xyz/mainnet/${objType}/${objId}`;

export const shortInt = (num: bigint | string | number, dec: number): number =>
  new Decimal(num).div(Decimal.pow(10, dec)).toNumber();

export const formatUtcTimestamp = (
  timestamp: string | number
): [string, string] => {
  const date = new Date(timestamp);
  const d = new Intl.DateTimeFormat("en-GB", {
    month: "2-digit",
    day: "2-digit",
    hourCycle: "h23",
  }).format(date);
  const t = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);

  return [d, t];
};

export const formatSize = (
  num: bigint | string | number,
  pool: Pool
): string => {
  const short = shortInt(num, pool.base_asset_decimals);
  return formatLargeNumber(short, getSizeDec(pool));
};

export const formatPrice = (
  num: bigint | string | number,
  pool: Pool
): string => {
  const short = shortInt(
    num,
    9 - pool.base_asset_decimals + pool.quote_asset_decimals
  );

  return roundPrice(short, pool);
};

export const formatSizeNum = (
  num: bigint | string | number,
  pool: Pool
): number => {
  const short = shortInt(num, pool.base_asset_decimals);
  return Number(roundSize(short, pool));
};

export const formatPriceNum = (
  num: bigint | string | number,
  pool: Pool
): number => {
  const short = shortInt(
    num,
    9 - pool.base_asset_decimals + pool.quote_asset_decimals
  );

  return Number(roundPrice(short, pool));
};

export const getNowToMinute = (): number => {
  const now = Math.floor(Date.now() / 1000);
  const roundedToMinute = now - (now % 60);
  return roundedToMinute;
};

export const formatLargeNumber = (value: number, decimals = 2): string => {
  const parts = value.toFixed(decimals).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1];
  return decimalPart ? `${intPart}.${decimalPart}` : intPart;
};
