import Link from "next/link";
import ContentContainer from "@/components/ContentContainer";

export default function NotFound() {
  return (
    <ContentContainer className="py-24 text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">
        404
      </p>
      <h1 className="mb-4 font-display text-4xl font-bold text-ink">
        Page not found
      </h1>
      <p className="mb-8 text-mute">
        That page doesn’t exist or was moved.
      </p>
      <Link href="/" className="btn-primary inline-flex">
        Back home
      </Link>
    </ContentContainer>
  );
}
