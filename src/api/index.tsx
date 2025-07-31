import type {
  AverageTradeSizes,
  FillsSummary,
  OHLCV,
  Pool,
} from "../common/types";

const BASE_URL = "https://api.sui.carmine.finance";

const buildUrl = (path: string, params?: Record<string, string>) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }
  return url.toString();
};

async function apiFetch<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const res = await fetch(buildUrl(path, params), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getPools: async () => await apiFetch<Pool[]>("/get_pools"),
  getOHLCV: async (poolName: string, startTime: number, endTime: number) =>
    await apiFetch<OHLCV[]>(`/ohlcv/${poolName}`, {
      start_time: startTime.toString(10),
      end_time: endTime.toString(10),
    }),
  getFills24hSummary: async () =>
    await apiFetch<FillsSummary[]>("/fills_24h_summary"),
  getAverageTrade: async (poolName: string) =>
    await apiFetch<AverageTradeSizes>(
      `/average_trade_multi_window/${poolName}`
    ),
};
