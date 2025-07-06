import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const usePools = () => {
  return useQuery({
    queryKey: ["pools"],
    queryFn: api.getPools,
  });
};
