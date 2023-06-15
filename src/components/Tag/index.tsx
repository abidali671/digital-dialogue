import { ITagData } from "@/types";
import React from "react";

interface ITagProps {
  data: ITagData;
}

const Tag = ({ data }: ITagProps) => {
  return <span className="tag-span">{data.fields.label}</span>;
};

export default Tag;
