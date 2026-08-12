import React from "react";
import Link from "next/link";
import { ICategoryData } from "@/types";

interface ICategoryProps {
  data: ICategoryData;
}

const Category = ({ data }: ICategoryProps) => {
  const { label, slug } = data.fields;

  return (
    <Link
      href={{
        pathname: "/blogs/[category]",
        query: { category: slug },
      }}
      className="block border-b border-line py-3 font-body text-sm font-semibold text-ink transition-colors hover:text-accent"
    >
      {label}
    </Link>
  );
};

export default Category;
