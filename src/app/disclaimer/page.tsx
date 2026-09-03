import type { Metadata } from "next";
import Link from "next/link";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: {
    absolute: "Disclaimer | How to Use Digital Dialogue Content",
  },
  description: constants.descriptions.DISCLAIMER,
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | How to Use Digital Dialogue Content",
    description: constants.descriptions.DISCLAIMER,
    url: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="reading-column article-wrapper">
        <Title>Disclaimer</Title>
        <p>
          The information on Digital Dialogue ({config.BASE_URL}) is for
          general reading only. It is not legal, financial, tax, medical, or
          professional advice. Last updated: 2 September 2026.
        </p>

        <h2>No guarantees</h2>
        <p>
          Articles on freelancing, earning online, marketing, and technology
          describe common approaches and tradeoffs. Results depend on your
          skills, market, location, and effort. We do not promise income,
          rankings, job offers, or specific outcomes.
        </p>

        <h2>Accuracy</h2>
        <p>
          We try to keep guides accurate and up to date. Tools, platform
          fees, features, and laws change. Check the original product or
          official documentation before you make a decision. Digital Dialogue
          is not liable for actions you take based on this site.
        </p>

        <h2>External links</h2>
        <p>
          Posts may link to other websites, products, or platforms. We do not
          control those sites and are not responsible for their content,
          policies, or practices. A link is not an endorsement.
        </p>

        <h2>Opinions</h2>
        <p>
          Views on this site belong to Digital Dialogue and its{" "}
          <Link href="/authors">authors</Link> unless stated otherwise. They
          do not represent any employer, client, or company mentioned in an
          article.
        </p>

        <h2>Your responsibility</h2>
        <p>
          You are responsible for how you use this information, including
          compliance with local laws and the terms of any platform you join.
          If you need advice for your situation, speak to a qualified
          professional.
        </p>

        <h2>Advertising</h2>
        <p>
          Digital Dialogue may display third-party advertisements, including
          ads served by Google AdSense. Ad partners may use cookies or similar
          technologies as described in our{" "}
          <Link href="/privacy-policy">privacy policy</Link>. Ads do not change
          our editorial standards: we aim to publish useful guides first.
        </p>
        <p>
          Some articles may mention tools, platforms, or services. Unless a
          post clearly says otherwise, a mention is not a paid endorsement.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclaimer can go to the{" "}
          <Link href="/contact-us">contact page</Link>, {config.EMAIL}. See
          also the <Link href="/privacy-policy">privacy policy</Link> and{" "}
          <Link href="/about">about page</Link>.
        </p>
      </div>
    </ContentContainer>
  );
}
