import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import config from "@/lib/config";
import { FOOTER_TOOL_LINKS } from "@/lib/homeTools";

const Footer = () => {
  return (
    <footer className="border-t border-ink-soft bg-ink">
      <ContentContainer className="flex flex-col gap-10 !py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="flex flex-col items-start gap-5 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center"
              aria-label={config.SITE_NAME}
            >
              <Image
                src="/logo-footer.webp"
                alt={config.SITE_NAME}
                width={200}
                height={39}
                className="h-8 w-auto"
              />
            </Link>
            <p className="max-w-md text-copy text-mute-soft">
              Practical freelancing tips on platforms, profiles, proposals,
              and landing clients. Written for people who need a clear next
              step, not another theory dump.
            </p>
          </div>
          <FooterLink title="Pages" links={config.FOOTER_LINKS} />
          <FooterLink title="Tools" links={FOOTER_TOOL_LINKS} />
          <FooterLink title="Legal" links={config.LEGAL_LINKS} />
          <FooterLink title="Follow" links={config.SOCIAL_LINKS} />
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-ui text-mute-soft">
            © {new Date().getFullYear()} {config.SITE_NAME}. All rights
            reserved. Built by{" "}
            <a
              href={config.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
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
  const external = (href: string) => href.startsWith("http");

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-white/80">
        {title}
      </h2>
      <ul className="m-0 flex list-none flex-col">
        {links.map((link) => (
          <li key={link.href} className="m-0 list-none">
            <Link
              className="flex min-h-[44px] items-center text-ui text-white/80 transition-colors hover:text-white hover:underline hover:underline-offset-4"
              href={link.href}
              {...(external(link.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
