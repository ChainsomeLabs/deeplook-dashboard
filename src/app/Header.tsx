import { Link } from "react-router";

export const Header = () => (
  <header className="bg-surface flex items-center justify-between p-3 border-b-normal border-surface-container">
    <Link to="/">
      <span>Deeplook | Dashboard</span>
    </Link>
  </header>
);
