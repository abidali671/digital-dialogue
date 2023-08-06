import React from "react";

const Title = ({ children }: { children: string }) => {
  return (
    <span className="flex gap-1 flex-col">
      <h1 className="font-bold">{children}</h1>
      <hr className="w-24 h-[4px] border-1 rounded bg-orange-700" />
    </span>
  );
};

export default Title;
