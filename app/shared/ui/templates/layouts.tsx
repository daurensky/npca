import type { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  return <main className="py-8 flex-grow">{children}</main>;
};
