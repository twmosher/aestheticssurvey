import type { Metadata } from "next";

import { SectionShell } from "@/components/site/section-shell";
import { TERMS_PAGE_SECTIONS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description:
    "Review the launch terms for the Aesthetic Workforce website, survey, and future compensation reporting.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <SectionShell
        description="These launch terms describe the basic rules for using the public site and participating in the anonymous compensation survey."
        title="Terms"
      >
        <div className="space-y-8">
          {TERMS_PAGE_SECTIONS.map((section) => (
            <section className="space-y-3" key={section.title}>
              <h2 className="font-[family:var(--font-display)] text-3xl leading-tight text-[hsl(var(--charcoal))]">
                {section.title}
              </h2>
              <p className="text-base leading-7 text-[hsl(var(--muted-ink))]">{section.body}</p>
            </section>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
