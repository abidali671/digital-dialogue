import type { Metadata } from "next";
import ToolsListing, { type ToolCard } from "@/components/tools/ToolsListing";
import { parseSearchQuery } from "@/lib/listing";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";

const TITLE = "Freelancing tools";
const DESCRIPTION =
  "Free calculators for Upwork fees and freelance planning. Estimate take-home pay before you send a proposal.";

export const metadata: Metadata = {
  title: pageTitle(TITLE),
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: {
    title: resolvePageTitle(TITLE),
    description: DESCRIPTION,
    url: "/tools",
    images: [DEFAULT_OG_IMAGE],
  },
};

const TOOLS: ToolCard[] = [
  {
    href: "/tools/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    copy: "Estimate take-home pay after the freelancer service fee and withdrawal costs.",
    image: "/upwork-fee-calculator.png",
  },
  {
    href: "/tools/upwork-connects-calculator",
    title: "Upwork Connects Calculator",
    copy: "See what a set of proposals costs in Connects, and the cost of each reply, interview and contract.",
    image: "/upwork-connects-calculator.png",
  },
  {
    href: "/tools/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    copy: "Turn a monthly or yearly income goal into an hourly rate that covers fees and unpaid time.",
    image: "/freelance-rate-calculator.png",
  },
];

type PageProps = {
  searchParams: { q?: string };
};

export default function ToolsPage({ searchParams }: PageProps) {
  const searchQuery = parseSearchQuery(searchParams.q);
  const needle = searchQuery.toLowerCase();
  const tools = needle
    ? TOOLS.filter((tool) => `${tool.title} ${tool.copy}`.toLowerCase().includes(needle))
    : TOOLS;

  return <ToolsListing tools={tools} searchQuery={searchQuery} />;
}
