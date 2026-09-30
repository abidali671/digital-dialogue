import type { Metadata } from "next";
import Link from "next/link";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";

const AFFILIATE_TITLE = "Affiliate Disclosure | Digital Dialogue";

export const metadata: Metadata = {
  title: pageTitle(AFFILIATE_TITLE),
  description: constants.descriptions.AFFILIATE_DISCLOSURE,
  alternates: { canonical: "/affiliate-disclosure" },
  openGraph: {
    title: resolvePageTitle(AFFILIATE_TITLE),
    description: constants.descriptions.AFFILIATE_DISCLOSURE,
    url: "/affiliate-disclosure",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="reading-column article-wrapper">
        <Title>Affiliate Disclosure</Title>
        <p>
          This Affiliate Disclosure explains how Digital Dialogue (
          {config.BASE_URL}) may earn money when you click links or buy products
          mentioned on the site. Last updated: 30 September 2026.
        </p>
        <p>
          We believe in clear disclosure. If a post uses affiliate or referral
          links, this page is the standing explanation of what that means.
        </p>

        <h2>What affiliate links are</h2>
        <p>
          An affiliate (or referral) link is a special URL that tells a company
          you came from Digital Dialogue. If you sign up or buy through that
          link, we may receive a commission at no extra cost to you.
        </p>

        <h2>How we use them</h2>
        <p>
          Digital Dialogue may include affiliate links to tools, platforms,
          hosting, software, learning products, or other services related to
          freelancing and building client work. We may also display advertising,
          including Google AdSense, as described in our{" "}
          <Link href="/privacy-policy">privacy policy</Link>.
        </p>
        <p>
          Mentions of Upwork, Fiverr, Freelancer, or similar platforms are often
          informational. A brand name alone is not always an affiliate
          relationship. When a specific link is an affiliate link, we aim to
          disclose that in the article or keep this page as the site-wide
          notice.
        </p>

        <h2>Editorial independence</h2>
        <p>
          Affiliate relationships do not buy a positive review. We aim to
          recommend tools and approaches we believe can help freelancers make a
          clearer decision. If something is a poor fit, we say so—even when a
          commission is possible.
        </p>
        <p>
          Compensation may influence which products we can mention, but it
          should not change the facts we report about fees, features, or risks.
        </p>

        <h2>Your responsibility</h2>
        <p>
          Always read the seller’s own terms, pricing, and policies before you
          buy or sign up. Platform fees and product details change. Digital
          Dialogue is not responsible for third-party products or services.
        </p>

        <h2>Advertising</h2>
        <p>
          Separate from affiliate links, the site may show third-party ads. Ad
          partners may use cookies or similar technologies. Details are in the{" "}
          <Link href="/privacy-policy">privacy policy</Link>. Ads do not mean we
          endorse every advertiser that appears.
        </p>

        <h2>Questions</h2>
        <p>
          Questions about this disclosure can go to the{" "}
          <Link href="/contact-us">contact page</Link>. Operator:{" "}
          {config.AUTHOR_NAME}. See also the{" "}
          <Link href="/terms-of-service">terms of service</Link> and{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </ContentContainer>
  );
}
