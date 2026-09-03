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
    label: "Authors",
    href: "/authors",
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
  (link) => link.href !== "/privacy-policy" && link.href !== "/contact-us",
);

const LINKEDIN_URL = "https://www.linkedin.com/in/abid-ali-89ab4a1bb/";
const UPWORK_URL = "https://www.upwork.com/freelancers/~014093a104f15a71c0";
const FIVERR_URL = "https://www.fiverr.com/abidsaeed92";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Upwork", href: UPWORK_URL },
  { label: "Fiverr", href: FIVERR_URL },
];

/** Post slugs shown as featured cards above the footer on every page. */
const FEATURED_POST_SLUGS = [
  "what-is-upwork-and-how-does-it-work",
  "7-design-thinking-principles-explained",
  "youtube-premium-vs-free-is-it-worth-it",
] as const;

/** Home page Editor's picks (under the hero). Keep distinct from FEATURED_POST_SLUGS. */
const EDITOR_PICK_SLUGS = [
  "best-freelancing-platform-for-beginners-in-pakistan",
  "how-to-earn-money-online-with-your-smartphone",
  "margin-vs-padding-whats-the-difference",
] as const;

/** Tag hubs linked from home and blogs listing. */
const POPULAR_TAGS = [
  { label: "Upwork", slug: "upwork" },
  { label: "Fiverr", slug: "fiverr" },
  { label: "LinkedIn", slug: "linkedin" },
  { label: "Accessibility", slug: "accessibility" },
  { label: "Instagram", slug: "instagram" },
  { label: "Design Thinking", slug: "design-thinking" },
  { label: "Web Design", slug: "web-design" },
  { label: "Empathize", slug: "empathize" },
  { label: "Ethereum", slug: "ethereum" },
  { label: "Hire Marketing Agency", slug: "hire-marketing-agency" },
  { label: "Digital Marketing", slug: "digital-marketing" },
  { label: "Sell Digital Products", slug: "sell-digital-products" },
] as const;

const config = {
  NAV_LINKS,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  FEATURED_POST_SLUGS,
  EDITOR_PICK_SLUGS,
  POPULAR_TAGS,
  FORM_ACTION: "https://formspree.io/f/xoqoddgp",
  BASE_URL: "https://www.digitaldialogue.pk",
  BLOGS_PER_PAGE: 15,
  SITE_NAME: "Digital Dialogue",
  DEFAULT_DESCRIPTION:
    "Practical guides on freelancing, technology, digital marketing, content creation, and design for people building skills and careers online.",
  AUTHOR_NAME: "Abid Ali",
  LINKEDIN_URL,
  UPWORK_URL,
  FIVERR_URL,
};

export default config;
