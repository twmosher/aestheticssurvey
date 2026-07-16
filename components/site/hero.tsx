import Link from "next/link";

import { HERO_CONTENT, SURVEY_PATH } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24">
      <div className="hero-wash" aria-hidden="true" />
      <div className="dot-motif left-[8%] top-16 hidden sm:block" aria-hidden="true" />
      <div className="dot-motif right-[10%] top-24" aria-hidden="true" />
      <div className="grid-motif" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.7fr)] lg:items-end">
        <div className="relative space-y-7">
          <div className="space-y-5">
            <h1 className="max-w-4xl font-[family:var(--font-display)] text-[3.3rem] leading-[0.95] tracking-[-0.05em] text-[hsl(var(--charcoal))] sm:text-[4.8rem]">
              {HERO_CONTENT.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-ink))] sm:text-xl">
              {HERO_CONTENT.subheadline}
            </p>
          </div>
          <div className="space-y-6">
            <p className="max-w-2xl text-base leading-7 text-[hsl(var(--muted-ink))] sm:text-lg">
              {HERO_CONTENT.supportingCopy}
            </p>
            <div>
              <Link className="button-primary justify-center sm:justify-start" href={SURVEY_PATH}>
                {HERO_CONTENT.primaryCta}
              </Link>
            </div>
            <div className="trust-capsule">{HERO_CONTENT.trustLine}</div>
          </div>
        </div>
        <div aria-hidden="true" className="relative hidden lg:block">
          <div className="hero-panel">
            <div className="hero-panel__topline" />
            <div className="hero-panel__monogram">MA</div>
            <div className="hero-panel__bars">
              <div className="hero-panel__bar" />
              <div className="hero-panel__bar hero-panel__bar--short" />
              <div className="hero-panel__bar hero-panel__bar--accent" />
            </div>
            <div className="hero-panel__details">
              <div className="hero-panel__detail" />
              <div className="hero-panel__detail hero-panel__detail--wide" />
              <div className="hero-panel__detail" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
