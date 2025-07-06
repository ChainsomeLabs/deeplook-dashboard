import { Link } from "react-router";

export const Header = () => (
  <header className="bg-background-primary flex items-center justify-between p-3 border-b-normal border-background-secondary">
    <Link to="/">
      <h1>Deeplook | Dashboard</h1>
    </Link>
  </header>
);
