import React, { PropsWithChildren } from "react";
import cx from "clsx";

type PropsType = PropsWithChildren<{ className?: string }>;

const ContentContainer = ({ children, className }: PropsType) => {
  return (
    <div
      className={cx(
        "max-w-7xl w-full  p-4 mx-auto relative",
        className && className
      )}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
