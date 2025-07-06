import type { Orderbook, Pool } from "./response";

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
  getOrderbook: async (poolName: string) =>
    await apiFetch<Orderbook>(`/orderbook/${poolName}`),
};
