import type { CandlestickData, Time } from "lightweight-charts";

export type Order = {
  price: number;
  size: number;
};

export type Orderbook = {
  bids: Order[];
  asks: Order[];
};

export type OrderWithTotal = {
  order: Order;
  total: number;
  quoteTotal: number;
};

export interface OrderbookWithTotal {
  bids: OrderWithTotal[];
  asks: OrderWithTotal[];
  max: number;
}

export interface OrderbookWithTotalMidSpread extends OrderbookWithTotal {
  mid: number;
  spreadAbsolute: number;
  spreadPercentage: number;
}

export interface Pool {
  pool_id: string;
  pool_name: string;
  base_asset_id: string;
  base_asset_decimals: number;
  base_asset_symbol: string;
  base_asset_name: string;
  quote_asset_id: string;
  quote_asset_decimals: number;
  quote_asset_symbol: string;
  quote_asset_name: string;
  min_size: number;
  lot_size: number;
  tick_size: number;
}

export interface PropsPool {
  pool: Pool;
}

export interface PropsOrderbook {
  orderbook: Orderbook;
}

export interface PropsOrderbookWithTotal {
  orderbook: OrderbookWithTotal;
}

export type OHLCV = {
  high: number;
  low: number;
  close: number;
  volume_base: string;
  open: number;
  timestamp: number;
  volume_quote: string;
};

export interface FillsSummary {
  pool_id: string;
  price_open_24h: number;
  price_close_24h: number;
  trade_count_24h: string;
  base_volume_24h: string;
}

export interface FillsSummaryWithPrice extends FillsSummary {
  base_price: number;
}

export type PoolWithFillsSummary = Pool & FillsSummaryWithPrice;

export type TradeInfo = {
  digest: string;
  checkpoint: number;
  timestamp: string;
  price: number;
  base_quantity: number;
  quote_quantity: number;
  taker_is_bid: boolean;
};

export type AverageTradeSizes = {
  "5min": number;
  "15min": number;
  "1h": number;
  "24h": number;
};

export type VolumeMultiwindow = {
  "1d": number;
  "7d": number;
  "30d": number;
};

export type VolumeData = {
  time: Time;
  value: number;
  color: string;
};

export type CandleGraphData = {
  ohlc: CandlestickData<Time>[];
  volume: VolumeData[];
};
