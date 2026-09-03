import type { Metadata } from "next";
import constants from "@/constants";
import config from "@/lib/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: constants.descriptions.PRIVACY_POLICY,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy",
    description: constants.descriptions.PRIVACY_POLICY,
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-7xl w-full px-4 md:px-6 py-10 mx-auto flex flex-col gap-4">
      <h1>Privacy Policy for Digital Dialogue</h1>

      <p>
        This Privacy Policy explains how Digital Dialogue (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;), accessible at{" "}
        <b>{config.BASE_URL}</b>, collects, uses, and shares information when
        you visit our website. Last updated: 2 September 2026.
      </p>

      <p>
        If you have questions about this policy, use our{" "}
        <Link href="/contact-us" className="underline">
          contact page
        </Link>
        .
      </p>

      <p>
        This policy applies only to information collected through this website.
        It does not apply to offline activity or to third-party websites we link
        to.
      </p>

      <h2>Consent</h2>
      <p>
        By using Digital Dialogue, you agree to this Privacy Policy. If you do
        not agree, please stop using the site.
      </p>

      <h2>Information we collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <b>Contact details you send us.</b> If you email us or use the contact
          form, we receive your name, email address, subject, message, and any
          other details you choose to include.
        </li>
        <li>
          <b>Technical and usage data.</b> Like most websites, our hosting and
          server logs may record IP address, browser type, device type, pages
          visited, referring URL, and date/time of access. This data is used to
          run, secure, and improve the site.
        </li>
        <li>
          <b>Cookies and similar technologies.</b> We and third parties may use
          cookies, pixels, or similar tools as described below.
        </li>
      </ul>
      <p>
        Digital Dialogue does not require user accounts or registration to read
        articles.
      </p>

      <h2>How we use information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Operate, maintain, and secure the website</li>
        <li>Respond to messages and support requests</li>
        <li>Understand how visitors use the site and improve content</li>
        <li>Measure performance and fix technical issues</li>
        <li>
          Show advertising (including Google AdSense) and understand ad
          effectiveness, when ads are enabled
        </li>
        <li>Comply with legal obligations and prevent abuse</li>
      </ul>

      <h2>Log files</h2>
      <p>
        Our hosting environment may keep standard log files. These can include
        IP addresses, browser type, internet service provider, timestamps,
        referring/exit pages, and click data. Log data is generally not combined
        with information that directly identifies you. We use it for trends,
        administration, and security.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        Cookies are small files stored on your device. Digital Dialogue may use
        cookies or similar technologies to remember preferences, understand
        traffic, and support advertising features.
      </p>
      <p>
        You can control or delete cookies through your browser settings. Blocking
        some cookies may affect how parts of the site work.
      </p>

      <h2>Google AdSense and advertising</h2>
      <p>
        Digital Dialogue uses, or may use, Google AdSense and related Google
        advertising services to display ads. Third parties, including Google,
        may use cookies, web beacons, IP addresses, or similar technologies to
        collect information as a result of ad serving on this site.
      </p>
      <p>
        These technologies help Google and other ad partners deliver ads,
        measure campaigns, and personalize advertising based on visits to this
        site and other sites on the internet.
      </p>
      <p>
        Digital Dialogue does not control third-party advertiser cookies. For
        details on how Google uses data when you use sites or apps that partner
        with Google, see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          How Google uses information from sites or apps that use our services
        </a>
        .
      </p>
      <p>
        You can manage Google ad personalization settings at{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Settings
        </a>
        . You can also learn more about ads and cookies at{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Advertising Policies
        </a>
        .
      </p>

      <h2>Third-party services</h2>
      <p>
        We may use trusted third parties to run the site, including hosting,
        content delivery, contact form processing (for example Formspree), and
        advertising partners such as Google. Those providers process data under
        their own privacy policies.
      </p>
      <p>
        This Privacy Policy does not cover other websites linked from Digital
        Dialogue. Review their policies before providing personal information.
      </p>

      <h2>How we share information</h2>
      <p>We may share information:</p>
      <ul>
        <li>
          With service providers who help us operate the site (hosting, forms,
          analytics, advertising)
        </li>
        <li>When required by law or to protect rights, safety, or security</li>
        <li>
          With advertising partners such as Google as described in the AdSense
          section above
        </li>
      </ul>
      <p>
        We do not sell your personal information as a standalone product.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep contact messages and technical logs only as long as needed for
        the purposes above, unless a longer period is required by law or for
        legitimate security reasons.
      </p>

      <h2>Your privacy rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or restrict processing of your personal data, or to object to
        certain processing. To make a request, use our{" "}
        <Link href="/contact-us" className="underline">
          contact page
        </Link>
        . We will respond within a reasonable time and as required by applicable
        law.
      </p>
      <p>
        California residents may have additional rights under the CCPA,
        including the right to know what personal information is collected and
        to request deletion. If you believe we sell personal information and
        wish to opt out, contact us using the details below.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Digital Dialogue is not directed at children under 13, and we do not
        knowingly collect personal information from children under 13. If you
        believe a child provided personal information to us, contact us and we
        will delete it where appropriate.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes take effect
        when posted on this page. The &ldquo;Last updated&rdquo; date at the top
        reflects the latest revision. Continued use of the site after changes
        means you accept the updated policy.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this Privacy Policy can be sent through the{" "}
        <Link href="/contact-us" className="underline">
          contact page
        </Link>
        .
      </p>
      <div>
        <p className="text-gray-800 tracking-wide">
          Site: <b>{config.SITE_NAME}</b> ({config.BASE_URL})
        </p>
        <p className="text-gray-800 tracking-wide">
          Operator: <b>{config.AUTHOR_NAME}</b>
        </p>
      </div>
    </div>
  );
}
