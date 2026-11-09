import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import InvoiceGenerator from "@/components/tools/InvoiceGenerator";
import InvoiceGuide from "@/components/tools/InvoiceGuide";
import InvoiceSheet from "@/components/tools/InvoiceSheet";
import ToolHero from "@/components/tools/ToolHero";
import FaqSection from "@/components/tools/FaqSection";
import RelatedResources, { CALCULATOR_RESOURCES } from "@/components/tools/RelatedResources";
import config from "@/lib/config";
import { computeInvoice, defaultDraft } from "@/lib/invoice";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";

const OG_IMAGE = {
  url: "/freelance-invoice-generator.png",
  width: 1200,
  height: 630,
  alt: "Freelance invoice generator with a form on the left and a live invoice preview on the right",
};

const TITLE = "Free Invoice Generator for Freelancers | Digital Dialogue";
const DESCRIPTION =
  "Create a freelance invoice in the browser, with a live preview and PDF download. No sign-up, no watermark. Optional PKR total line.";
const PATH = "/tools/freelance-invoice-generator";

const FAQ = [
  {
    question: "Is this invoice generator really free?",
    text: "Yes. There is no account, no watermark and no limit on how many invoices you create. The invoice is built in your browser. Print it, or download a PDF or a Word file; the filename uses the invoice number.",
  },
  {
    question: "Where is my invoice data stored?",
    text: "On this device only. Your name, email, address, tax ID and payment details are saved in this browser so the next invoice starts filled in. Client names and line items are not saved. Nothing is uploaded unless you send the PDF yourself.",
  },
  {
    question: "Can I invoice in Pakistani rupees?",
    text: "Yes. Choose PKR as the invoice currency, or keep the invoice in US dollars and tick Show a PKR total line to print an approximate rupee figure for your records.",
  },
  {
    question: "Should I invoice Upwork or Fiverr clients with this?",
    text: "No. Marketplace clients should be billed on the platform. Use this generator for direct clients. Record marketplace income from the platform statement, after fees.",
  },
  {
    question: "Is this FBR-compliant e-invoicing?",
    text: "No. Sales-tax-registered businesses that must issue FBR-integrated e-invoices need licensed software. This tool makes a numbered PDF for freelancers who need a normal bill, not an e-invoice.",
  },
  {
    question: "What tax rate should I put on the invoice?",
    text: "Only add tax if it applies to that client and that work. Leave Tax % at 0 if you are not charging tax on the invoice. Confirm the current rate with a tax practitioner; this page does not set one for you.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function FreelanceInvoiceGeneratorPage() {
  const sample = defaultDraft();
  const sampleTotals = computeInvoice(sample);

  return (
    <div className="fee-page">
      <JsonLdScript
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Invoice Generator", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Freelance Invoice Generator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            url: `${config.BASE_URL}${PATH}`,
            description: DESCRIPTION,
            dateModified: "2026-11-06",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: config.SITE_NAME,
              url: config.BASE_URL,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.text },
            })),
          },
        ]}
      />

      <section className="fee-hero inv-hero bg-[#f4f6f8]">
        <div className="inv-hero-grid mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-14 min-[1024px]:pt-10">
          <div>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Invoice Generator" },
              ]}
            />
            <ToolHero
              title="Create a freelance invoice in minutes"
              intro="Fill in your details and line items. A live preview updates as you type. Download a clean PDF with no sign-up and no watermark."
              action={
                <a className="fee-btn fee-btn-primary inv-hero-cta" href="#invoice-form">
                  Create an invoice
                </a>
              }
              points={[
                "Live preview beside the form, with nine templates",
                "Nothing is uploaded; the PDF is made on this device",
                "USD by default, with PKR and other currencies",
              ]}
            />
          </div>
          <aside className="inv-hero-sample" aria-hidden="true">
            <InvoiceSheet draft={sample} totals={sampleTotals} />
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-[#f4f6f8] py-8 min-[1024px]:py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 min-[1024px]:px-8">
          <InvoiceGenerator />
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <InvoiceGuide />
      </section>

      <FaqSection
        title="Invoice generator questions"
        intro="Short answers. This tool makes a PDF bill. It is not tax software and it is not affiliated with any marketplace."
        items={FAQ.map((item) => ({ question: item.question, answer: <p>{item.text}</p> }))}
      />

      <RelatedResources
        items={[CALCULATOR_RESOURCES.invoiceAccounting, CALCULATOR_RESOURCES.fee, CALCULATOR_RESOURCES.fiverr]}
      />

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6">
          <p className="text-ui text-[#475569]">
            <strong className="font-semibold text-ink">Disclaimer:</strong> Digital Dialogue is an independent publication. This generator is not affiliated with Upwork, Fiverr or any tax authority. It is not FBR e-invoicing software. Amounts, tax treatment and legal invoice requirements depend on where you work and who you bill. Confirm those with a tax practitioner.
          </p>
        </div>
      </section>
    </div>
  );
}
