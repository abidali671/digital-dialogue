import React from "react";
import ContentContainer from "../ContentContainer";
import config from "@/lib/config";

/** Email capture band. Posts to the same Formspree endpoint as the contact form. */
const Newsletter = () => {
  return (
    <section className="border-y border-line bg-white">
      <ContentContainer className="grid gap-8 py-14 md:grid-cols-[1fr_1fr] md:items-center md:py-16">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            Newsletter
          </p>
          <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            New posts, straight to your inbox
          </h2>
          <p className="max-w-md text-base text-mute">
            One email when something worth reading goes live. No spam, no daily
            noise.
          </p>
        </div>
        <form
          action={config.FORM_ACTION}
          method="POST"
          className="flex w-full flex-col gap-3 sm:flex-row"
        >
          <input type="hidden" name="subject" value="Newsletter signup" />
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="form-input"
            />
          </label>
          <button type="submit" className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </ContentContainer>
    </section>
  );
};

export default Newsletter;
