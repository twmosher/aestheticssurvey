"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  QuestionRenderer,
  type RenderableSurveyAnswer,
} from "@/components/survey/question-renderer";
import { QuestionStep } from "@/components/survey/question-step";
import { ProgressBar } from "@/components/survey/progress-bar";
import { createEmptySurveyAnswers, createEmptySurveyDraft } from "@/lib/survey/defaults";
import { SURVEY_QUESTIONS } from "@/lib/survey/questions";
import {
  loadSurveyDraft,
  saveSurveyDraft,
} from "@/lib/survey/storage";
import type { SurveyAnswers, SurveyDraft, SurveyQuestion, SurveyQuestionId } from "@/lib/survey/types";

const QUESTIONS_PER_MINUTE = 8;

function isQuestionVisible(question: SurveyQuestion, answers: SurveyAnswers) {
  return question.visibleWhen ? question.visibleWhen(answers) : true;
}

function getVisibleQuestionIndexes(answers: SurveyAnswers) {
  return SURVEY_QUESTIONS.flatMap((question, index) =>
    isQuestionVisible(question, answers) ? [index] : [],
  );
}

function resolveStepIndex(answers: SurveyAnswers, currentStepIndex: number) {
  const visibleIndexes = getVisibleQuestionIndexes(answers);

  if (visibleIndexes.length === 0) {
    return 0;
  }

  if (visibleIndexes.includes(currentStepIndex)) {
    return currentStepIndex;
  }

  const nextVisibleIndex = visibleIndexes.find((index) => index > currentStepIndex);

  if (typeof nextVisibleIndex === "number") {
    return nextVisibleIndex;
  }

  return visibleIndexes.at(-1) ?? 0;
}

function createAnonymousToken() {
  const tokenSource =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

  return `anon_${tokenSource}`;
}

function hasAnyAnswer(answers: SurveyAnswers) {
  return Object.values(answers).some((value) => {
    if (typeof value === "boolean") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value.trim().length > 0;
  });
}

function readAttributionFromLocation(draft: SurveyDraft) {
  if (typeof window === "undefined") {
    return draft;
  }

  const params = new URLSearchParams(window.location.search);

  return {
    ...draft,
    attribution: {
      referrerCode: draft.attribution.referrerCode || params.get("ref")?.trim() || "",
      utmSource: draft.attribution.utmSource || params.get("utm_source")?.trim() || "",
      utmMedium: draft.attribution.utmMedium || params.get("utm_medium")?.trim() || "",
      utmCampaign: draft.attribution.utmCampaign || params.get("utm_campaign")?.trim() || "",
      landingPageVariant:
        draft.attribution.landingPageVariant || params.get("variant")?.trim() || "",
    },
  };
}

function sanitizeAnswers(answers: SurveyAnswers) {
  const defaults = createEmptySurveyAnswers();
  const nextAnswers = createEmptySurveyAnswers(answers);

  for (const question of SURVEY_QUESTIONS) {
    if (!isQuestionVisible(question, nextAnswers)) {
      resetAnswer(nextAnswers, defaults, question.id);
    }
  }

  return nextAnswers;
}

function resetAnswer<TId extends SurveyQuestionId>(
  answers: SurveyAnswers,
  defaults: SurveyAnswers,
  questionId: TId,
) {
  answers[questionId] = defaults[questionId];
}

function getRequiredMessage(question: SurveyQuestion) {
  switch (question.id) {
    case "hourlyRate":
      return "Hourly rate is required for the selected compensation structure.";
    case "annualSalary":
      return "Annual salary is required for the selected compensation structure.";
    case "commissionType":
      return "Commission type is required when commission is selected.";
    case "commissionValue":
      return "Commission value is required when commission is selected.";
    case "consented":
      return "You must agree to aggregate workforce research and compensation benchmarking before submitting.";
    default:
      return `${question.label} is required.`;
  }
}

function isPositiveCurrency(value: string) {
  const normalizedValue = value.replace(/[$,\s]/g, "");

  if (!normalizedValue) {
    return false;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalizedValue)) {
    return false;
  }

  return Number(normalizedValue) > 0;
}

function validateQuestion(question: SurveyQuestion, answers: SurveyAnswers) {
  const value = answers[question.id];

  if (question.required === false) {
    return null;
  }

  if (question.input === "consent") {
    return value === true ? null : getRequiredMessage(question);
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? null : getRequiredMessage(question);
  }

  if (typeof value === "string" && value.trim().length === 0) {
    return getRequiredMessage(question);
  }

  if ((question.id === "hourlyRate" || question.id === "annualSalary") && typeof value === "string") {
    return isPositiveCurrency(value)
      ? null
      : question.id === "hourlyRate"
        ? "Hourly rate must be a valid positive currency amount."
        : "Annual salary must be a valid positive currency amount.";
  }

  return null;
}

export function SurveyShell() {
  const router = useRouter();
  const [draft, setDraft] = useState(createEmptySurveyDraft());
  const [isReady, setIsReady] = useState(false);
  const [hasBegun, setHasBegun] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const restoredDraft = readAttributionFromLocation(loadSurveyDraft());
    const sanitizedAnswers = sanitizeAnswers(restoredDraft.answers);
    const nextDraft = {
      ...restoredDraft,
      answers: sanitizedAnswers,
      currentStepIndex: resolveStepIndex(sanitizedAnswers, restoredDraft.currentStepIndex),
    };

    setDraft(nextDraft);
    setHasBegun(hasAnyAnswer(nextDraft.answers) || nextDraft.currentStepIndex > 0);
    setIsReady(true);

    if (nextDraft.hasSubmittedSurvey) {
      startTransition(() => {
        router.push("/survey/email");
      });
    }
  }, [router]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    saveSurveyDraft(draft);
  }, [draft, isReady]);

  const visibleQuestionIndexes = getVisibleQuestionIndexes(draft.answers);
  const resolvedStepIndex = resolveStepIndex(draft.answers, draft.currentStepIndex);
  const currentQuestion = SURVEY_QUESTIONS[resolvedStepIndex];
  const currentVisibleStep = Math.max(visibleQuestionIndexes.indexOf(resolvedStepIndex), 0) + 1;
  const totalVisibleSteps = visibleQuestionIndexes.length;
  const minutesRemaining = Math.max(
    1,
    Math.ceil((totalVisibleSteps - currentVisibleStep + 1) / QUESTIONS_PER_MINUTE),
  );
  const isLastStep = currentVisibleStep === totalVisibleSteps;

  function updateDraft(updater: (currentDraft: SurveyDraft) => SurveyDraft) {
    setDraft((currentDraft) => {
      const nextDraft = updater(currentDraft);
      const sanitizedAnswers = sanitizeAnswers(nextDraft.answers);

      return {
        ...nextDraft,
        answers: sanitizedAnswers,
        currentStepIndex: resolveStepIndex(sanitizedAnswers, nextDraft.currentStepIndex),
      };
    });
  }

  function handleAnswerChange(questionId: SurveyQuestionId, nextValue: RenderableSurveyAnswer) {
    setErrorMessage("");

    updateDraft((currentDraft) => ({
      ...currentDraft,
      answers: {
        ...currentDraft.answers,
        [questionId]: nextValue,
      } as SurveyAnswers,
    }));
  }

  function handleBegin() {
    setHasBegun(true);
    updateDraft((currentDraft) => ({
      ...currentDraft,
      anonymousToken: currentDraft.anonymousToken || createAnonymousToken(),
      currentStepIndex: 0,
    }));
  }

  function handleBack() {
    if (currentVisibleStep <= 1) {
      return;
    }

    setErrorMessage("");

    updateDraft((currentDraft) => ({
      ...currentDraft,
      currentStepIndex: visibleQuestionIndexes[currentVisibleStep - 2] ?? 0,
    }));
  }

  async function handleAdvance() {
    const validationError = validateQuestion(currentQuestion, draft.answers);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");

    if (!isLastStep) {
      updateDraft((currentDraft) => ({
        ...currentDraft,
        currentStepIndex: visibleQuestionIndexes[currentVisibleStep] ?? currentDraft.currentStepIndex,
      }));
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          anonymousToken: draft.anonymousToken || createAnonymousToken(),
          answers: draft.answers,
          attribution: draft.attribution,
        }),
      });

      const responseBody = (await response.json()) as {
        ok: boolean;
        data?: {
          anonymousToken: string;
          nextPath: string;
        };
        error?: {
          fieldErrors?: Record<string, string[]>;
          message?: string;
        };
      };

      if (!response.ok || !responseBody.ok || !responseBody.data) {
        setErrorMessage(
          responseBody.error?.fieldErrors?.[`answers.${currentQuestion.id}`]?.[0] ??
            responseBody.error?.message ??
            "We could not submit your anonymous response. Please try again.",
        );
        return;
      }

      updateDraft((currentDraft) => ({
        ...currentDraft,
        anonymousToken: responseBody.data?.anonymousToken || currentDraft.anonymousToken,
        hasSubmittedSurvey: true,
      }));

      const { data } = responseBody;

      startTransition(() => {
        router.push(data.nextPath);
      });
    } catch {
      setErrorMessage("We could not submit your anonymous response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isReady) {
    return (
      <section className="hero-panel">
        <div className="hero-panel__topline" />
        <p className="pt-8 text-sm leading-6 text-[hsl(var(--stone-strong))]">
          Restoring your survey…
        </p>
      </section>
    );
  }

  if (!hasBegun) {
    return (
      <section className="hero-panel space-y-8">
        <div className="hero-panel__topline" />
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--clay))]">
            Anonymous survey
          </p>
          <h1 className="font-[family:var(--font-display)] text-4xl leading-tight tracking-[-0.04em] text-[hsl(var(--charcoal))] sm:text-5xl">
            Let&apos;s find the right comparison group.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[hsl(var(--muted-ink))] sm:text-lg">
            Your answers are anonymous and will only be reported in aggregate. Most people finish
            in about 4 minutes on a phone.
          </p>
        </div>
        <div className="grid gap-3 rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.84)] p-5 sm:grid-cols-3 sm:gap-4">
          <p className="text-sm leading-6 text-[hsl(var(--muted-ink))]">
            One focused question at a time
          </p>
          <p className="text-sm leading-6 text-[hsl(var(--muted-ink))]">
            Autosaves if Instagram or your browser refreshes
          </p>
          <p className="text-sm leading-6 text-[hsl(var(--muted-ink))]">
            Email comes later and stays separate from your anonymous response
          </p>
        </div>
        <button className="button-primary" onClick={handleBegin} type="button">
          Begin
        </button>
      </section>
    );
  }

  return (
    <section className="hero-panel space-y-8">
      <div className="hero-panel__topline" />
      <ProgressBar
        currentStep={currentVisibleStep}
        minutesRemaining={minutesRemaining}
        section={currentQuestion.section}
        totalSteps={totalVisibleSteps}
      />
      <form
        className="space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          void handleAdvance();
        }}
      >
        <QuestionStep
          description={"description" in currentQuestion ? currentQuestion.description : undefined}
          error={errorMessage}
          label={currentQuestion.label}
          section={currentQuestion.section}
        >
          <QuestionRenderer
            onChange={(nextValue) => handleAnswerChange(currentQuestion.id, nextValue)}
            question={currentQuestion}
            value={draft.answers[currentQuestion.id]}
          />
        </QuestionStep>
        <div className="flex items-center justify-between gap-3">
          <button
            className="button-secondary"
            disabled={currentVisibleStep <= 1 || isSubmitting}
            onClick={handleBack}
            type="button"
          >
            Back
          </button>
          <button className="button-primary" disabled={isSubmitting} type="submit">
            {isLastStep
              ? isSubmitting
                ? "Submitting…"
                : "Submit anonymous response"
              : "Next"}
          </button>
        </div>
      </form>
    </section>
  );
}
