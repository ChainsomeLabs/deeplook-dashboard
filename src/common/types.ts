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
};

export type OrderbookWithTotal = {
  bids: OrderWithTotal[];
  asks: OrderWithTotal[];
  max: number;
};

export type Pool = {
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
};
