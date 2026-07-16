import Link from "next/link";

import { BenefitCard } from "@/components/site/benefit-card";
import { Hero } from "@/components/site/hero";
import { SectionShell } from "@/components/site/section-shell";
import {
  BENEFIT_CARDS,
  HOME_QUESTIONS,
  HOME_QUESTIONS_CTA,
  HOME_QUESTIONS_SUPPORTING_COPY,
  PARTICIPANT_ROLES,
  PARTICIPANT_WORKPLACES,
  PRIVACY_CTA,
  PRIVACY_TRUST_STATEMENTS,
  SURVEY_PATH,
  WHY_THIS_MATTERS_BODY,
  WHY_THIS_MATTERS_HEADLINE,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <SectionShell
        description={HOME_QUESTIONS_SUPPORTING_COPY}
        id="questions"
        title="Massachusetts aesthetics still runs on private numbers and public guesswork."
      >
        <div className="space-y-6">
          <div className="grid gap-px overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--border))]">
            {HOME_QUESTIONS.map((question) => (
              <div
                className="bg-[hsl(var(--paper)/0.92)] px-5 py-6 sm:px-7 sm:py-7"
                key={question}
              >
                <p className="font-[family:var(--font-display)] text-[1.9rem] leading-tight tracking-[-0.035em] text-[hsl(var(--charcoal))] sm:text-[2.35rem]">
                  {question}
                </p>
              </div>
            ))}
          </div>
          <Link className="button-primary" href={SURVEY_PATH}>
            {HOME_QUESTIONS_CTA}
          </Link>
        </div>
      </SectionShell>

      <SectionShell
        description="Participating helps build a benchmark that is useful in real conversations about roles, offers, and compensation design."
        id="benefits"
        title="What participants get from contributing"
      >
        <div className="grid gap-px overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--border))] min-[390px]:grid-cols-2">
          {BENEFIT_CARDS.map((benefit, index) => (
            <BenefitCard
              description={benefit.description}
              index={index + 1}
              key={benefit.title}
              title={benefit.title}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        description="The report is intended for Massachusetts professionals across clinical, operational, and leadership roles working inside medical aesthetics."
        id="participants"
        title="Who should participate"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--clay))]">
              Roles
            </h3>
            <ul className="grid gap-3 text-sm leading-6 text-[hsl(var(--muted-ink))] min-[390px]:grid-cols-2">
              {PARTICIPANT_ROLES.map((role) => (
                <li
                  className="border-b border-[hsl(var(--border))] pb-3 last:border-b-0"
                  key={role}
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--clay))]">
              Workplaces
            </h3>
            <ul className="grid gap-3 text-sm leading-6 text-[hsl(var(--muted-ink))]">
              {PARTICIPANT_WORKPLACES.map((workplace) => (
                <li
                  className="border-b border-[hsl(var(--border))] pb-3 last:border-b-0"
                  key={workplace}
                >
                  {workplace}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="why-it-matters" title={WHY_THIS_MATTERS_HEADLINE}>
        <div className="space-y-5">
          {WHY_THIS_MATTERS_BODY.map((paragraph) => (
            <p
              className="text-base leading-7 text-[hsl(var(--muted-ink))] sm:text-lg"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        className="pb-20"
        description="This project is designed to earn trust before it asks for sensitive information."
        id="privacy"
        title="Privacy, anonymity, and discretion are part of the product."
      >
        <div className="space-y-8 border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.92)] p-6 sm:p-8">
          <div className="grid gap-4">
            {PRIVACY_TRUST_STATEMENTS.map((statement) => (
              <p
                className="border-b border-[hsl(var(--border))] pb-4 text-sm leading-6 text-[hsl(var(--muted-ink))] last:border-b-0 last:pb-0"
                key={statement}
              >
                {statement}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link className="button-primary justify-center sm:justify-start" href={SURVEY_PATH}>
              {PRIVACY_CTA}
            </Link>
            <p className="text-sm leading-6 text-[hsl(var(--stone-strong))]">
              The benchmark will remain in a preparation state until enough qualified responses
              exist to publish responsibly.
            </p>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
