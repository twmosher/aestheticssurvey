import Link from "next/link";

import { REPORT_NAME, SITE_NAME, SURVEY_PATH } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--ivory)/0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="min-w-0 text-left" href="/">
          <span className="block font-[family:var(--font-body)] text-[0.7rem] uppercase tracking-[0.28em] text-[hsl(var(--clay))]">
            {SITE_NAME}
          </span>
          <span className="block truncate font-[family:var(--font-display)] text-lg leading-none text-[hsl(var(--charcoal))]">
            {REPORT_NAME}
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 text-sm text-[hsl(var(--muted-ink))] sm:gap-5"
        >
          <Link className="transition hover:text-[hsl(var(--charcoal))]" href="/about">
            About
          </Link>
          <Link className="transition hover:text-[hsl(var(--charcoal))]" href="/privacy">
            Privacy
          </Link>
          <Link className="button-primary hidden sm:inline-flex" href={SURVEY_PATH}>
            Start Survey
          </Link>
        </nav>
      </div>
      <div className="border-t border-[hsl(var(--border))] px-4 py-3 sm:hidden">
        <div className="mx-auto max-w-6xl">
          <Link className="button-primary w-full justify-center" href={SURVEY_PATH}>
            Start Survey
          </Link>
        </div>
      </div>
    </header>
  );
}
