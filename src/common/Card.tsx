import type { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-surface-container p-4 flex-grow">
      {children}
    </div>
  );
};
