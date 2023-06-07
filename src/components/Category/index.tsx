import React from "react";
import Categories from "@/constants/categories";

interface CategoryT {
  slug: string;
  label: string;
}
const Category = ({ slug, label }: CategoryT) => {
  return (
    <div className="w-full bg-[#C4C4C4] p-4">
      <button className="bg-white font-medium p-2">{label}</button>
    </div>
  );
};

export default Category;
