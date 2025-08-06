import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { usePools } from "../poolSelect/usePools";
import type { PoolWithFillsSummary } from "../common/types";
import { usePrices } from "../common/usePrice";

export const usePoolsFillSummary = () => {
  return useQuery({
    queryKey: ["fills-summary"],
    queryFn: api.getFills24hSummary,
  });
};

export const usePoolsWithFillSummary = () => {
  const { data: pools, isLoading: pLoading, isError: pError } = usePools();
  const {
    data: fillsSummary,
    isLoading: fLoading,
    isError: fError,
  } = usePoolsFillSummary();
  const { data: prices, isLoading: gLoading, isError: gError } = usePrices();

  const isLoading = pLoading || fLoading || gLoading;
  const isError = pError || fError || gError;

  if (
    pools === undefined ||
    fillsSummary === undefined ||
    prices === undefined
  ) {
    return { isLoading, isError, data: undefined };
  }

  const fillsMap = new Map(fillsSummary.map((f) => [f.pool_id, f]));

  // Merge each Pool with its matching FillsSummary
  const data = pools
    .map((pool) => {
      const fill = fillsMap.get(pool.pool_id);
      if (!fill) return null;
      console.log({
        prices,
        symbol: pool.base_asset_symbol,
        price: prices[pool.base_asset_symbol],
      });
      return {
        ...pool,
        ...fill,
        base_price: prices[pool.base_asset_symbol],
      } as PoolWithFillsSummary;
    })
    .filter((item): item is PoolWithFillsSummary => item !== null);

  return { isLoading, isError, data };
};
