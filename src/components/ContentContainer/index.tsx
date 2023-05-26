import React, { PropsWithChildren } from "react";
import cx from "clsx";

type PropsType = PropsWithChildren<{ className?: string }>;

export default ({ children, className }: PropsType) => {
  return (
    <div
      className={cx(
        "max-w-7xl w-full sm:p-5 p-4 mx-auto relative",
        className && className
      )}
    >
      {children}
    </div>
  );
};
