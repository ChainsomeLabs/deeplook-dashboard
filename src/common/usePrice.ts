import { useQuery } from "@tanstack/react-query";

const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  SUI: "sui",
  USDC: "usd-coin",
  DEEP: "deep",
  BETH: "ethereum",
  WUSDC: "usd-coin",
  WUSDT: "tether",
  NS: "suins-token",
  TYPUS: "typus-finance",
  AUSD: "alpaca-usd",
  SEND: "send-token",
  WAL: "walrus-2",
  XBTC: "wrapped-bitcoin",
  DRF: "drife",
};

const SYMBOLS = Object.keys(SYMBOL_TO_COINGECKO_ID);

export async function fetchTokenPricesUSD(
  symbols: string[]
): Promise<Record<string, number>> {
  const validSymbols = symbols.filter((s) => s in SYMBOL_TO_COINGECKO_ID);
  const ids = validSymbols.map((s) => SYMBOL_TO_COINGECKO_ID[s]);
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
    ","
  )}&vs_currencies=usd`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch token prices");
  const data = await res.json(); // { sui: { usd: 0.5 }, ... }

  console.log("GECKO DATA", { symbols, validSymbols, ids, data });

  const result: Record<string, number> = {};
  for (const symbol of validSymbols) {
    const id = SYMBOL_TO_COINGECKO_ID[symbol];
    const price = data[id]?.usd ?? null;
    if (price !== null) result[symbol] = price;
  }

  return result;
}

export const usePrices = () => {
  return useQuery({
    queryKey: ["gecko-prices"],
    queryFn: async () => fetchTokenPricesUSD(SYMBOLS),
  });
};
