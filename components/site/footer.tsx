import Link from "next/link";

import { CONTACT_EMAIL, REPORT_NAME, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--paper))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="font-[family:var(--font-display)] text-2xl text-[hsl(var(--charcoal))]">
            {SITE_NAME}
          </p>
          <p className="max-w-2xl text-sm leading-6 text-[hsl(var(--muted-ink))]">
            {REPORT_NAME}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[hsl(var(--muted-ink))]">
          <Link className="transition hover:text-[hsl(var(--charcoal))]" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-[hsl(var(--charcoal))]" href="/terms">
            Terms
          </Link>
          <a
            className="transition hover:text-[hsl(var(--charcoal))]"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            Contact
          </a>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--stone-strong))]">
          Copyright © 2026 {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
