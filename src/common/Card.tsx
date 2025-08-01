import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  const baseCls = "rounded-lg bg-surface-container h-fit p-4";
  const cls = className ? baseCls + " " + className : baseCls;
  return <div className={cls}>{children}</div>;
};
