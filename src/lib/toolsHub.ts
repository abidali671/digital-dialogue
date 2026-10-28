/** Document title before the site-name suffix. Resolved length stays under 60 characters. */
export const TOOLS_PAGE_TITLE = "Free Freelance Calculators for Upwork";

export const TOOLS_PAGE_DESCRIPTION =
  "Free calculators for freelancers: Upwork take-home pay after fees, Connects cost per contract, and the hourly rate you need. No sign-up. PKR optional.";

export const TOOLS_INTRO = [
  "Freelancing pays well only when you know what you keep. These free calculators help with the three numbers that matter most on Upwork: what you take home after fees, what your proposals cost you, and the hourly rate you need to charge.",
  "Each one works in your browser, with no sign-up. Enter amounts in US dollars. To see results in Pakistani rupees (PKR), choose PKR and enter your exchange rate. Other currencies change the symbol only. Each page lists the Upwork pages its fee rules come from and the date they were checked.",
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
    copy: "See your take-home pay after the 0%–15% Freelancer Service Fee and withdrawal costs.",
    image: "/upwork-fee-calculator.png",
    alt: "Upwork Fee Calculator showing take-home pay split into what you keep, the service fee, and withdrawal costs.",
  },
  {
    href: "/tools/upwork-connects-calculator",
    title: "Upwork Connects Calculator",
    copy: "Find out what your proposals cost and what you paid for each reply, interview and contract.",
    image: "/upwork-connects-calculator.png",
    alt: "Upwork Connects Calculator showing a proposal funnel from proposals to replies, interviews, and contracts.",
  },
  {
    href: "/tools/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    copy: "Work out the minimum hourly rate that covers your costs, platform fees and unpaid hours.",
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
    answer:
      "Only PKR does. Enter amounts in US dollars, then enter your exchange rate. The State Bank of Pakistan weighted average and its date are shown as a reference. Until you enter a rate, results stay in US dollars. Other currencies only change the symbol and number format.",
  },
  {
    question: "What fee percentage should I use?",
    answer:
      "The fee and rate calculators start at 10% as an estimate. On Upwork, the freelancer service fee is shown on each offer and can be from 0% to 15% for that contract. Replace 10% with the percentage on your offer.",
  },
  {
    question: "Is the $0.15 Connects price my real price?",
    answer:
      "No. The $0.15 in the Connects calculator is an example only (Upwork’s listed price for extra Connects, checked 29 Oct 2026). It is not assumed to be your price. Replace it with what you actually pay. Bundles, Freelancer Plus and free monthly Connects can change what you pay.",
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
