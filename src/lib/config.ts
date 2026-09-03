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
  (link) => link.href !== "/privacy-policy"
);

const LINKEDIN_URL = "https://www.linkedin.com/in/abid-ali-89ab4a1bb/";
const UPWORK_URL = "https://www.upwork.com/freelancers/~014093a104f15a71c0";
const FIVERR_URL = "https://www.fiverr.com/abidsaeed92";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Upwork", href: UPWORK_URL },
  { label: "Fiverr", href: FIVERR_URL },
];

const config = {
  NAV_LINKS,
  FOOTER_LINKS,
  SOCIAL_LINKS,
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