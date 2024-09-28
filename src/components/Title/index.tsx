import React, { ElementType } from "react";

interface TitleProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | ElementType;
}

const Title = (props: TitleProps) => {
  const { children, as: Tag = "h1" } = props;
  return (
    <span className="flex gap-1 flex-col">
      <Tag className="font-bold">{children}</Tag>
      <hr className="w-24 h-[4px] border-1 rounded bg-orange-700" />
    </span>
  );
};

export default Title;
