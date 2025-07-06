import { Link } from "react-router";
import type { Pool } from "../api/response";

type Props = {
  data: Pool[];
};

export const PoolsDropdownView = ({ data }: Props) => (
  <div className="flex flex-col w-fit">
    {data.map((p, i) => (
      <Link key={i} to={`/pool/${p.pool_name}`}>
        {p.pool_name}
      </Link>
    ))}
  </div>
);
