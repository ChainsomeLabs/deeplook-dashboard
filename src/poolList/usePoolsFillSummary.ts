import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { usePools } from "../poolSelect/usePools";
import type { PoolWithFillsSummary } from "../common/types";

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

  const isLoading = pLoading || fLoading;
  const isError = pError || fError;

  if (pools === undefined || fillsSummary === undefined) {
    return { isLoading, isError, data: undefined };
  }

  const fillsMap = new Map(fillsSummary.map((f) => [f.pool_id, f]));

  // Merge each Pool with its matching FillsSummary
  const data = pools
    .map((pool) => {
      const fill = fillsMap.get(pool.pool_id);
      if (!fill) return null;
      return { ...pool, ...fill };
    })
    .filter((item): item is PoolWithFillsSummary => item !== null);

  return { isLoading, isError, data };
};
