import React from "react";
import { useRouter } from "next/router";

const searchResult = () => {
  const router = useRouter();
  return <div>searchResult {router.query.slug}</div>;
};

export default searchResult;
