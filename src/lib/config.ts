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

const config = {
  EMAIL: "abid.saeed.ali92@gmail.com",
  PHONE: "+92 3248218854",
  NAV_LINKS,
  FOOTER_LINKS,
  FORM_ACTION: "https://formspree.io/f/xoqoddgp",
  BASE_URL: "https://www.digitaldialogue.pk",
  BLOGS_PER_PAGE: 15,
  SITE_NAME: "Digital Dialogue",
  DEFAULT_DESCRIPTION:
    "Practical guides on freelancing, technology, digital marketing, content creation, and design for people building skills and careers online.",
  AUTHOR_NAME: "Abid Ali",
  LINKEDIN_URL: "https://www.linkedin.com/in/abid-ali-89ab4a1bb/",
};

export default config;