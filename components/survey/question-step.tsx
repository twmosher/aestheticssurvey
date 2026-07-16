import type { ReactNode } from "react";

import type { SurveySection } from "@/lib/survey/types";

interface QuestionStepProps {
  children: ReactNode;
  description?: string;
  error?: string;
  label: string;
  section: SurveySection;
}

export function QuestionStep({
  children,
  description,
  error,
  label,
  section,
}: QuestionStepProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--clay))]">{section}</p>
        <h1 className="font-[family:var(--font-display)] text-4xl leading-tight tracking-[-0.04em] text-[hsl(var(--charcoal))] sm:text-5xl">
          {label}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-[hsl(var(--muted-ink))]">{description}</p>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="rounded-2xl border border-[hsl(var(--clay)/0.3)] bg-[hsl(var(--clay)/0.08)] px-4 py-3 text-sm leading-6 text-[hsl(var(--clay-deep))]">
          {error}
        </p>
      ) : null}
    </section>
  );
}
