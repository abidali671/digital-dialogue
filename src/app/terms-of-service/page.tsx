import type { Metadata } from "next";
import Link from "next/link";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";

const TERMS_TITLE = "Terms of Service | Digital Dialogue";

export const metadata: Metadata = {
  title: pageTitle(TERMS_TITLE),
  description: constants.descriptions.TERMS,
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: resolvePageTitle(TERMS_TITLE),
    description: constants.descriptions.TERMS,
    url: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="reading-column article-wrapper">
        <Title>Terms of Service</Title>
        <p>
          These Terms of Service (“Terms”) govern your use of Digital Dialogue
          ({config.BASE_URL}), operated by {config.AUTHOR_NAME} (“we,” “us,” or
          “our”). Last updated: 30 September 2026.
        </p>
        <p>
          By using this website, you agree to these Terms. If you do not agree,
          please stop using the site.
        </p>

        <h2>What this site is</h2>
        <p>
          Digital Dialogue publishes practical freelancing tips for general
          information. Content is not legal, financial, tax, or professional
          advice. Outcomes depend on your skills, market, and effort. See our{" "}
          <Link href="/disclaimer">disclaimer</Link> for more detail.
        </p>

        <h2>Using the site</h2>
        <p>You agree to use Digital Dialogue only for lawful purposes. You may not:</p>
        <ul>
          <li>Attempt to disrupt, scrape at harmful scale, or misuse the site</li>
          <li>Copy or republish our articles without permission</li>
          <li>
            Misrepresent yourself when contacting us or submitting forms
          </li>
          <li>
            Use the site to send spam, malware, or abusive messages
          </li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          Unless stated otherwise, the text, branding, and original materials on
          Digital Dialogue belong to us or our licensors. You may read and share
          links for personal, non-commercial use. You may not republish full
          articles, sell our content, or remove attribution without written
          permission.
        </p>

        <h2>User messages</h2>
        <p>
          If you send a message through our{" "}
          <Link href="/contact-us">contact form</Link>, newsletter signup, or
          email, you grant us permission to read it and respond. Do not send
          confidential information you are not comfortable sharing. How we
          handle personal data is explained in the{" "}
          <Link href="/privacy-policy">privacy policy</Link>.
        </p>

        <h2>Third-party links and tools</h2>
        <p>
          Articles may link to freelance platforms, tools, or other websites. We
          do not control those sites and are not responsible for their content,
          terms, or practices. Your use of third-party services is between you
          and that provider.
        </p>

        <h2>Advertising and affiliates</h2>
        <p>
          The site may show ads (including Google AdSense) and may include
          affiliate or referral links. Those relationships are described in our{" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link> and{" "}
          <Link href="/privacy-policy">privacy policy</Link>. Ads and affiliate
          links do not change our aim to publish useful guides first.
        </p>

        <h2>No warranties</h2>
        <p>
          The site is provided “as is.” We do not guarantee that content is
          always complete, current, or error-free, or that the site will be
          uninterrupted or secure. Platform fees, features, and policies change;
          check official sources before you act.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, Digital Dialogue and{" "}
          {config.AUTHOR_NAME} are not liable for any loss or damage arising
          from your use of the site or reliance on its content, including lost
          income, freelance opportunities, or decisions you make based on our
          articles.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these Terms from time to time. Changes take effect when
          posted on this page. The “Last updated” date reflects the latest
          revision. Continued use of the site after changes means you accept the
          updated Terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms can go to the{" "}
          <Link href="/contact-us">contact page</Link>. See also the{" "}
          <Link href="/privacy-policy">privacy policy</Link>,{" "}
          <Link href="/disclaimer">disclaimer</Link>, and{" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
        </p>
      </div>
    </ContentContainer>
  );
}
