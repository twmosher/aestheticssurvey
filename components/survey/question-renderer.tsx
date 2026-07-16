import Link from "next/link";

import { MultiSelect } from "@/components/survey/multi-select";
import { RangeScale } from "@/components/survey/range-scale";
import type { SurveyQuestion } from "@/lib/survey/types";

export type RenderableSurveyAnswer = string | string[] | boolean;

interface QuestionRendererProps {
  question: SurveyQuestion;
  value: RenderableSurveyAnswer;
  onChange: (value: RenderableSurveyAnswer) => void;
}

export function QuestionRenderer({ onChange, question, value }: QuestionRendererProps) {
  switch (question.input) {
    case "single_select":
      return (
        <fieldset className="grid gap-3">
          <legend className="sr-only">{question.label}</legend>
          {question.options?.map((option) => {
            const id = `${question.id}-${option.value}`;
            const checked = value === option.value;

            return (
              <label
                className="flex cursor-pointer items-start gap-3 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-4 py-4 text-left transition hover:border-[hsl(var(--clay))]"
                htmlFor={id}
                key={option.value}
              >
                <input
                  checked={checked}
                  className="mt-1 h-4 w-4 border-[hsl(var(--border))] text-[hsl(var(--clay-deep))] focus:ring-[hsl(var(--clay-deep))]"
                  id={id}
                  name={question.id}
                  onChange={() => onChange(option.value)}
                  type="radio"
                  value={option.value}
                />
                <span className="text-sm leading-6 text-[hsl(var(--charcoal))]">{option.label}</span>
              </label>
            );
          })}
        </fieldset>
      );
    case "multi_select":
      return (
        <MultiSelect
          name={question.id}
          onChange={(nextValue) => onChange(nextValue)}
          options={question.options ?? []}
          selectedValues={Array.isArray(value) ? value : []}
        />
      );
    case "rating":
      return (
        <RangeScale
          name={question.id}
          onChange={(nextValue) => onChange(nextValue)}
          options={question.options ?? []}
          value={typeof value === "string" ? value : ""}
        />
      );
    case "currency":
      return (
        <div className="rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-5 py-4">
          <input
            aria-label={question.label}
            className="w-full border-0 bg-transparent p-0 text-lg text-[hsl(var(--charcoal))] outline-none placeholder:text-[hsl(var(--stone-strong))]"
            inputMode="decimal"
            onChange={(event) => onChange(event.target.value)}
            placeholder="$0"
            type="text"
            value={typeof value === "string" ? value : ""}
          />
        </div>
      );
    case "text":
      return (
        <div className="rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-5 py-4">
          <input
            aria-label={question.label}
            className="w-full border-0 bg-transparent p-0 text-base text-[hsl(var(--charcoal))] outline-none placeholder:text-[hsl(var(--stone-strong))]"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Type your answer"
            type="text"
            value={typeof value === "string" ? value : ""}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-5 py-4">
          <textarea
            aria-label={question.label}
            className="min-h-36 w-full resize-y border-0 bg-transparent p-0 text-base leading-7 text-[hsl(var(--charcoal))] outline-none placeholder:text-[hsl(var(--stone-strong))]"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Share what would make this benchmark more useful."
            value={typeof value === "string" ? value : ""}
          />
        </div>
      );
    case "consent":
      return (
        <label className="flex items-start gap-3 rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-5 py-5 text-left">
          <input
            checked={value === true}
            className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--clay-deep))] focus:ring-[hsl(var(--clay-deep))]"
            onChange={(event) => onChange(event.target.checked)}
            type="checkbox"
          />
          <span className="space-y-2 text-sm leading-6 text-[hsl(var(--charcoal))]">
            <span className="block">{question.label}</span>
            <span className="block text-[hsl(var(--stone-strong))]">
              Review the{" "}
              <Link className="underline decoration-[hsl(var(--clay))] underline-offset-4" href="/privacy">
                privacy policy
              </Link>{" "}
              for more detail on anonymity and deletion requests.
            </span>
          </span>
        </label>
      );
    default:
      return null;
  }
}
