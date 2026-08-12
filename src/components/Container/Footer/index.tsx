import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/icon/logo";
import config from "@/lib/config";
import { ICategoryData } from "@/types";

type IFooterProps = { categories?: ICategoryData[] };

const Footer = ({ categories: _categories }: IFooterProps) => {
  return (
    <footer className="border-t border-ink-soft bg-ink">
      <ContentContainer className="flex flex-col gap-10 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-5 md:col-span-2">
            <Logo className="h-10 w-auto brightness-0 invert" />
            <p className="max-w-md text-base leading-relaxed text-mute-soft">
              {config.SITE_NAME} — freelancing, technology, design, and
              creativity for builders who ship.
            </p>
          </div>
          <FooterLink title="Pages" links={config.NAV_LINKS} />
          <div className="flex w-full flex-col gap-3">
            <h3 className="font-display text-lg font-bold text-white">
              Contact
            </h3>
            <p className="text-sm text-mute-soft">{config.EMAIL}</p>
            <p className="text-sm text-mute-soft">{config.PHONE}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-sm text-mute-soft">
            © {new Date().getFullYear()} {config.SITE_NAME}. All rights
            reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-wide text-mute-soft">
            Built for builders
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
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
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
