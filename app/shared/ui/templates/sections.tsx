import type { PropsWithChildren } from "react";

export const ContentSection = ({ children }: PropsWithChildren) => {
  return (
    <section className="py-8">
      <div className="max-w-screen-xl w-full px-4 mx-auto space-y-8">
        {children}
      </div>
    </section>
  );
};
