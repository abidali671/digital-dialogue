"use client";

import React, { FormEvent, useState } from "react";
import config from "@/lib/config";

const MESSAGES = {
  invalid: "Enter your email address, like name@example.com.",
  ok: "Thanks, your email is on the list. You will get one email when a new guide goes live.",
  err: "Sorry, that did not go through. Check your connection and try again.",
};

type Status = "" | "invalid" | "ok" | "err";

/** Email capture. Posts to the same Formspree endpoint as the contact form. */
const Newsletter = () => {
  const [status, setStatus] = useState<Status>("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;

    if (!email.value.trim() || !email.validity.valid) {
      setStatus("invalid");
      email.focus();
      return;
    }

    setPending(true);
    try {
      const body = new FormData(form);
      const res = await fetch(config.FORM_ACTION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        setStatus("err");
        return;
      }
      setStatus("ok");
      email.value = "";
    } catch {
      setStatus("err");
    } finally {
      setPending(false);
    }
  };

  return (
    <section aria-labelledby="nl-h" className="bg-white">
      <div className="home-inner py-14 lg:py-20">
        <div className="grid gap-6 rounded-2xl border border-line bg-[#f0fdfa] p-6 lg:grid-cols-[1fr_minmax(18rem,32rem)] lg:items-center lg:gap-10 lg:p-10">
          <div>
            <h2 id="nl-h" className="home-h2 mt-0">
              New posts, straight to your inbox
            </h2>
            <p className="home-body mt-2 text-[16px] leading-relaxed">
              One email when something worth reading goes live. No spam, no daily
              noise.
            </p>
          </div>
          <form onSubmit={onSubmit} noValidate className="min-w-0">
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                opacity: 0,
              }}
            />
            <input type="hidden" name="subject" value="Newsletter signup" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="nl-email"
                  className="block text-[16px] font-semibold text-ink"
                >
                  Email address
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  aria-invalid={status === "invalid" || undefined}
                  aria-describedby="nl-msg"
                  className="mt-1.5 h-10 max-h-10 w-full rounded-lg border border-[#7b8798] bg-white px-3 text-[16px] leading-none text-ink placeholder:text-[#64748b] aria-[invalid=true]:border-[#b91c1c]"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-10 max-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#0f766e] px-5 text-[16px] font-semibold leading-none text-white transition hover:bg-[#115e59] hover:text-white disabled:opacity-70"
              >
                {pending ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            <p
              id="nl-msg"
              className="mt-2 min-h-[1.5rem] text-[16px] leading-snug"
              role={status === "err" ? "alert" : "status"}
              aria-live="polite"
              style={{
                color:
                  status === "ok"
                    ? "#0f766e"
                    : status === "invalid" || status === "err"
                      ? "#b91c1c"
                      : undefined,
              }}
            >
              {status ? MESSAGES[status] : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
