import { SmallLoading } from "../common/Loading";
import { PoolsDropdownView } from "./PoolsDropdownView";
import { usePools } from "./usePools";

export const PoolsDropdown = () => {
  const { data, isLoading, isError } = usePools();

  if (isLoading) {
    return <SmallLoading />;
  }

  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  return <PoolsDropdownView data={data} />;
};
