import type { Metadata } from "next";

import { SectionShell } from "@/components/site/section-shell";
import { ABOUT_PAGE_SECTIONS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn why Aesthetic Career Club is building a Massachusetts-first compensation benchmark for medical-aesthetic professionals.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <SectionShell
        description="An editorial-quality benchmark is only useful if professionals trust both the purpose and the method."
        title="About Aesthetic Career Club"
      >
        <div className="space-y-8">
          {ABOUT_PAGE_SECTIONS.map((section) => (
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
