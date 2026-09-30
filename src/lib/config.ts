const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

const FOOTER_LINKS = NAV_LINKS.filter(
  (link) => link.href !== "/privacy-policy",
);

const LINKEDIN_URL = "https://www.linkedin.com/in/abid-ali-89ab4a1bb/";
const UPWORK_URL = "https://www.upwork.com/freelancers/~014093a104f15a71c0";
const FIVERR_URL = "https://www.fiverr.com/abidsaeed92";
const X_URL = "https://x.com/digtldialogue";
const FACEBOOK_URL =
  "https://www.facebook.com/people/Digital-Dialogue/61594232400603/";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Upwork", href: UPWORK_URL },
  { label: "Fiverr", href: FIVERR_URL },
  { label: "Facebook", href: FACEBOOK_URL },
  { label: "X", href: X_URL },
];

/** Post slugs shown as featured cards above the footer on every page. */
const FEATURED_POST_SLUGS = [
  "what-is-upwork-and-how-does-it-work",
  "how-to-create-an-upwork-profile-that-gets-noticed",
  "how-to-write-an-upwork-proposal-that-wins-jobs",
] as const;

/** Home page Editor's picks (under the hero). Keep distinct from FEATURED_POST_SLUGS. */
const EDITOR_PICK_SLUGS = [
  "best-freelancing-platform-for-beginners-in-pakistan",
  "how-to-use-upwork-as-a-beginner-a-step-by-step-guide",
  "how-to-get-a-job-on-upwork-a-beginners-guide",
] as const;

/** Tag hubs linked from home and blogs listing. Freelancing niche only. */
const POPULAR_TAGS = [
  { label: "Upwork", slug: "upwork" },
  { label: "Fiverr", slug: "fiverr" },
  { label: "Freelancer", slug: "freelancer" },
  { label: "LinkedIn", slug: "linkedin" },
  { label: "Upwork Profile", slug: "upwork-profile" },
  { label: "Proposals", slug: "upwork-proposal" },
  { label: "Connects", slug: "upwork-connects" },
  { label: "Freelance Platforms", slug: "freelance-platforms" },
  { label: "Upwork for Beginners", slug: "upwork-for-beginners" },
  { label: "Upwork Fees", slug: "upwork-fees" },
] as const;

const config = {
  NAV_LINKS,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  FEATURED_POST_SLUGS,
  EDITOR_PICK_SLUGS,
  POPULAR_TAGS,
  FORM_ACTION: "https://formspree.io/f/xnpnokwe",
  BASE_URL: "https://www.digitaldialogue.pk",
  GA_MEASUREMENT_ID: "G-WTZCCLQ2FF",
  BLOGS_PER_PAGE: 15,
  SITE_NAME: "Digital Dialogue",
  DEFAULT_DESCRIPTION:
    "Practical freelancing guides for web developers and beginners: Upwork profiles, proposals, fees, Connects, and landing clients without fluff.",
  AUTHOR_NAME: "Abid Ali",
  LINKEDIN_URL,
  UPWORK_URL,
  FIVERR_URL,
  X_URL,
  FACEBOOK_URL,
};

export default config;
