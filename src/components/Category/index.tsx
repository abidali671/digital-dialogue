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
      className="w-full bg-[#C4C4C4] p-2"
    >
      <p className="bg-white font-semibold p-2 w-fit text-base leading-none">
        {label}
      </p>
    </Link>
  );
};

export default Category;
