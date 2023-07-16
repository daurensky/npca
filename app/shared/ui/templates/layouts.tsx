import type { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  return <main className="flex-grow">{children}</main>;
};
