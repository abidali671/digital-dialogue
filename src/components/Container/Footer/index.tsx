import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import config from "@/lib/config";

const Footer = () => {
  return (
    <footer className="border-t border-ink-soft bg-ink">
      <ContentContainer className="flex flex-col gap-10 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-5 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label={config.SITE_NAME}
            >
              <Image
                src="/logo-footer.webp"
                alt={config.SITE_NAME}
                width={200}
                height={39}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-md text-base leading-relaxed text-mute-soft">
              Practical guides on freelancing, web development, technology,
              marketing, and design. Written for people who need a clear next
              step, not another theory dump.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href="/privacy-policy"
                className="text-sm text-white/80 transition-colors hover:text-accent"
              >
                Privacy Policy
              </Link>
              <Link
                href="/disclaimer"
                className="text-sm text-white/80 transition-colors hover:text-accent"
              >
                Disclaimer
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-sm text-white/80 transition-colors hover:text-accent"
              >
                Sitemap
              </Link>
              <Link
                href="/feed.xml"
                className="text-sm text-white/80 transition-colors hover:text-accent"
              >
                RSS
              </Link>
            </div>
          </div>
          <FooterLink title="Pages" links={config.FOOTER_LINKS} />
          <div className="flex w-full flex-col gap-3">
            <h2 className="font-display text-lg font-bold text-white">
              Contact
            </h2>
            <a
              href={`mailto:${config.EMAIL}`}
              className="text-sm text-mute-soft transition-colors hover:text-accent"
            >
              {config.EMAIL}
            </a>
            <a
              href={`tel:${config.PHONE.replace(/\s+/g, "")}`}
              className="text-sm text-mute-soft transition-colors hover:text-accent"
            >
              {config.PHONE}
            </a>
            <div className="mt-1 flex flex-col gap-2">
              {config.SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mute-soft transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-sm text-mute-soft">
            © {new Date().getFullYear()} {config.SITE_NAME}. All rights
            reserved.
          </p>
          <p className="font-mono text-xs tracking-wide text-mute-soft">
            Built by{" "}
            <a
              href={config.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mute-soft underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {config.AUTHOR_NAME}
            </a>
          </p>
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;

interface FooterLinkPropsT {
  title?: string;
  links: { label: string; href: string }[];
}

const FooterLink = ({ title, links }: FooterLinkPropsT) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-lg font-bold text-white">{title}</h2>
      <ul className="m-0 flex list-none flex-col gap-2">
        {links.map((link) => (
          <li key={link.href} className="m-0 list-none">
            <Link
              className="text-sm text-mute-soft transition-colors hover:text-accent"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
