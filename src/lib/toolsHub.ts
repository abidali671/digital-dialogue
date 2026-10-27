import { USD_PKR, usdPkrAsOfLabel } from "@/lib/usdPkr";

/** Document title before the site-name suffix. Resolved length stays under 60 characters. */
export const TOOLS_PAGE_TITLE = "Freelance Calculators for Pakistan";

export const TOOLS_PAGE_DESCRIPTION =
  "Free calculators for Pakistani freelancers: Upwork take-home pay in rupees, Connects cost per contract, and an hourly rate that covers fees and unpaid time.";

export const TOOLS_INTRO = [
  "These three calculators are for freelancers in Pakistan planning Upwork work. They estimate take-home pay, what a batch of proposals costs, and the hourly rate that covers unpaid time.",
  "Choose PKR on a calculator to convert US dollar amounts into rupees with an exchange rate you can edit. The fee and rate calculators start at 10%, which you should replace with the percentage on your offer. The Connects calculator does not fill in a price. None of them estimate tax.",
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
    copy: "Shows what you keep from an hourly or fixed-price Upwork contract after the service fee and any withdrawal costs you add. For freelancers who want the rupee figure before they accept an offer.",
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
    href: "/blogs/freelancing/best-freelancing-platform-for-beginners-in-pakistan",
    title: "Best Freelancing Platform for Beginners in Pakistan",
    copy: "How Upwork, Fiverr and Freelancer differ if you are starting from Pakistan and choosing where to send a first offer.",
  },
];

export type HubFaq = {
  question: string;
  answer: string;
};

export const TOOL_FAQS: HubFaq[] = [
  {
    question: "Do the calculators convert amounts into Pakistani rupees?",
    answer: `Choose PKR. You still enter amounts in US dollars, and the results are converted with the rate in the field. The default is the ${USD_PKR.sourceName} weighted average: 1 USD = ${USD_PKR.rate} PKR as of ${usdPkrAsOfLabel()}. Edit it if your payout rate is different. The other currencies only change the symbol and number format.`,
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
    question: "Do these include income tax in Pakistan?",
    answer:
      "No. The calculators leave tax out, because it depends on how you are registered. If you pay tax on freelance income, raise the take-home goal to allow for it, or check with a tax adviser.",
  },
  {
    question: "Which calculator should I open first?",
    answer:
      "If you are setting a rate, start with the freelance rate calculator, then open the fee calculator from the link on the result to see take-home pay. If you are about to send proposals, use the Connects calculator with the Connects count shown on the job.",
  },
];
