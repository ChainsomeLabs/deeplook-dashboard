import { Loading } from "../common/Loading";
import { PoolsDropdownView } from "./PoolsDropdownView";
import { usePools } from "./usePools";

export const PoolsDropdown = () => {
  const { data, isLoading, isError } = usePools();

  if (isLoading) {
    return (
      <div className="w-8">
        <Loading />
      </div>
    );
  }

  if (isError || !data) {
    return <p>Something went wrong</p>;
  }

  return <PoolsDropdownView data={data} />;
};
