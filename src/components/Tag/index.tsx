import React from "react";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return <span className="tag-span">{children}</span>;
};

export default Tag;
