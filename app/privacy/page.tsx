import type { Metadata } from "next";

import { SectionShell } from "@/components/site/section-shell";
import { PRIVACY_PAGE_SECTIONS, PRIVACY_TRUST_STATEMENTS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Read the plain-English privacy commitments for the Aesthetic Career Club compensation benchmark.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <SectionShell
        description="This page explains, in plain English, how survey information is handled and how anonymity is protected."
        title="Privacy"
      >
        <div className="space-y-8">
          {PRIVACY_PAGE_SECTIONS.map((section) => (
            <section className="space-y-3" key={section.title}>
              <h2 className="font-[family:var(--font-display)] text-3xl leading-tight text-[hsl(var(--charcoal))]">
                {section.title}
              </h2>
              <p className="text-base leading-7 text-[hsl(var(--muted-ink))]">{section.body}</p>
            </section>
          ))}
          <section className="space-y-4 border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.92)] p-6">
            <h2 className="font-[family:var(--font-display)] text-3xl leading-tight text-[hsl(var(--charcoal))]">
              Trust commitments
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-[hsl(var(--muted-ink))]">
              {PRIVACY_TRUST_STATEMENTS.map((statement) => (
                <li className="border-b border-[hsl(var(--border))] pb-3 last:border-b-0" key={statement}>
                  {statement}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SectionShell>
    </main>
  );
}
