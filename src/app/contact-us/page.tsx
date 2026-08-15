import type { Metadata } from "next";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "Contact Us",
  description: constants.descriptions.CONTACT_US,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Us",
    description: constants.descriptions.CONTACT_US,
    url: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="grid max-w-2xl gap-8">
        <Title>Contact us</Title>
        <p className="text-mute">
          Questions, partnerships, or feedback — send a message and we’ll get
          back to you.
        </p>
        <form
          action={config.FORM_ACTION}
          method="POST"
          className="grid gap-4"
        >
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-mute">
              Name
            </span>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="form-input"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-mute">
              Email
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              className="form-input"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-mute">
              Subject
            </span>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              className="form-input"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-mute">
              Message
            </span>
            <textarea
              placeholder="Write your message"
              name="message"
              className="form-input"
              rows={5}
              required
            />
          </label>
          <button className="btn-primary w-fit" type="submit">
            Send message
          </button>
        </form>
      </div>
    </ContentContainer>
  );
}
