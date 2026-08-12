import React, { ElementType } from "react";

interface TitleProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | ElementType;
}

const Title = (props: TitleProps) => {
  const { children, as: Tag = "h1" } = props;
  return (
    <span className="flex flex-col gap-3">
      {React.createElement(
        Tag,
        { className: "font-display font-bold tracking-tight text-ink" },
        children
      )}
      <hr className="m-0 h-1 w-14 rounded-none border-0 bg-accent" />
    </span>
  );
};

export default Title;
