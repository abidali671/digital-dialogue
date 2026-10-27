import { USD_PKR, usdPkrAsOfLabel } from "@/lib/usdPkr";

/** Document title before the site-name suffix. Resolved length stays under 60 characters. */
export const TOOLS_PAGE_TITLE = "Upwork Freelance Calculators";

export const TOOLS_PAGE_DESCRIPTION =
  "Free calculators for Upwork take-home pay, Connects cost per contract, and the hourly rate that covers fees and unpaid time.";

export const TOOLS_INTRO = [
  "These calculators estimate Upwork take-home pay, what a batch of proposals costs in Connects, and the hourly rate that covers unpaid time.",
  "The fee and rate calculators start at 10%, which you should replace with the percentage on your offer. The Connects calculator does not fill in a price. None of them estimate tax. Working in Pakistan? Choose PKR to convert US dollar amounts with an editable rate.",
];

export type HubTool = {
  href: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
};

export const HUB_TOOLS: HubTool[] = [
  {
    href: "/tools/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    copy: "Shows what you keep from an hourly or fixed-price Upwork contract after the service fee and any withdrawal costs you add. For freelancers who want a take-home figure before they accept an offer.",
    image: "/upwork-fee-calculator.png",
    alt: "Upwork Fee Calculator showing take-home pay split into what you keep, the service fee, and withdrawal costs.",
  },
  {
    href: "/tools/upwork-connects-calculator",
    title: "Upwork Connects Calculator",
    copy: "Turns the Connects on a job, plus your replies, interviews and contracts, into a cost per result. For freelancers deciding whether a proposal is worth sending.",
    image: "/upwork-connects-calculator.png",
    alt: "Upwork Connects Calculator showing a proposal funnel from proposals to replies, interviews, and contracts.",
  },
  {
    href: "/tools/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    copy: "Turns a monthly or yearly income goal into the hourly rate that covers expenses, a platform fee and unpaid hours. For freelancers setting a minimum rate before they write a proposal.",
    image: "/freelance-rate-calculator.png",
    alt: "Freelance Rate Calculator showing an hourly rate split into take-home goal, expenses, platform fee, and unbilled time.",
  },
];

export type HubArticle = {
  href: string;
  title: string;
  copy: string;
};

export const TOOL_ARTICLES: HubArticle[] = [
  {
    href: "/blogs/freelancing/upwork-fees-how-much-do-freelancers-earn",
    title: "Upwork fees: how much do freelancers earn",
    copy: "How the freelancer service fee comes out of a milestone or hourly payout, and how to turn a take-home target back into a client price.",
  },
  {
    href: "/blogs/freelancing/upwork-connects-when-a-job-is-worth-the-cost",
    title: "Upwork Connects: when a job is worth the cost",
    copy: "How to compare the Connects on a job with the budget and the scope before you spend them on a proposal.",
  },
  {
    href: "/blogs/freelancing/how-much-to-charge-for-a-website-as-a-freelancer",
    title: "How much to charge for a website as a freelancer",
    copy: "How to start from the days a site takes and add the fee back in so the client price still covers what you want to keep.",
  },
  {
    href: "/blogs/freelancing/how-to-write-an-upwork-proposal-that-wins-jobs",
    title: "How to Write an Upwork Proposal That Wins Jobs",
    copy: "A proposal structure, what to cut, and beginner mistakes that waste Connects.",
  },
  {
    href: "/blogs/freelancing/how-to-use-upwork-as-a-beginner-a-step-by-step-guide",
    title: "How to Use Upwork as a Beginner: A Step-by-Step Guide",
    copy: "How to set up an account, a profile, Connects, first proposals and payouts.",
  },
];

export type HubFaq = {
  question: string;
  answer: string;
};

export const TOOL_FAQS: HubFaq[] = [
  {
    question: "Does choosing a currency convert my amounts?",
    answer: `Only PKR does. Enter amounts in US dollars and the results use an editable exchange rate. The default is the ${USD_PKR.sourceName} weighted average: 1 USD = ${USD_PKR.rate} PKR as of ${usdPkrAsOfLabel()}. Edit it if your payout rate is different. The other currencies only change the symbol and number format.`,
  },
  {
    question: "What fee percentage should I use?",
    answer:
      "The fee and rate calculators start at 10% as an estimate. On Upwork, the freelancer service fee is shown on each offer and can be from 0% to 15% for that contract. Replace 10% with the percentage on your offer.",
  },
  {
    question: "Why is there no Connects price filled in?",
    answer:
      "The Connects calculator leaves the price blank on purpose. Upwork’s price, bundles and free monthly Connects can change and may differ by account, so you enter what you actually pay.",
  },
  {
    question: "Do these include income tax?",
    answer:
      "No. The calculators leave tax out, because it depends on where you live and how you are registered. If you pay tax on freelance income, raise the take-home goal to allow for it, or check with a tax adviser.",
  },
  {
    question: "Which calculator should I open first?",
    answer:
      "If you are setting a rate, start with the freelance rate calculator, then open the fee calculator from the link on the result to see take-home pay. If you are about to send proposals, use the Connects calculator with the Connects count shown on the job.",
  },
];
