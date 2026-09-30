"use client";

import { usePathname } from "next/navigation";
import HomeGuide from "@/components/HomeGuide";

/** Homepage-only: render after Popular Tags in the site chrome. */
const HomeGuideOnHome = () => {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <HomeGuide />;
};

export default HomeGuideOnHome;
