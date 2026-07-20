"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loadSurveyDraft } from "@/lib/survey/storage";

interface SubscriberFormState {
  consentedToEmail: boolean;
  email: string;
  firstName: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function EmailCaptureForm() {
  const router = useRouter();
  const [anonymousToken, setAnonymousToken] = useState("");
  const [attribution, setAttribution] = useState({
    referrerCode: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    landingPageVariant: "",
  });
  const [formState, setFormState] = useState<SubscriberFormState>({
    firstName: "",
    email: "",
    consentedToEmail: false,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const draft = loadSurveyDraft();

    if (!draft.hasSubmittedSurvey || !draft.anonymousToken) {
      startTransition(() => {
        router.push("/survey");
      });
      return;
    }

    setAnonymousToken(draft.anonymousToken);
    setAttribution(draft.attribution);
    setIsReady(true);
  }, [router]);

  function setFieldValue<Key extends keyof SubscriberFormState>(
    key: Key,
    value: SubscriberFormState[Key],
  ) {
    setFieldErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[key];
      return nextErrors;
    });

    setFormState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    const nextErrors: Record<string, string[]> = {};

    if (!isValidEmail(formState.email.trim())) {
      nextErrors.email = ["Enter a valid email address."];
    }

    if (!formState.consentedToEmail) {
      nextErrors.consentedToEmail = [
        "Email consent is required to subscribe for benchmark updates.",
      ];
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          anonymousToken,
          email: formState.email,
          firstName: formState.firstName,
          consentedToEmail: formState.consentedToEmail,
          attribution,
        }),
      });

      const responseBody = (await response.json()) as {
        ok: boolean;
        data?: {
          nextPath: string;
        };
        error?: {
          fieldErrors?: Record<string, string[]>;
        };
      };

      if (!response.ok || !responseBody.ok || !responseBody.data) {
        setFieldErrors(
          responseBody.error?.fieldErrors ?? {
            form: ["We could not save your benchmark subscription. Please try again."],
          },
        );
        return;
      }

      const { data } = responseBody;

      startTransition(() => {
        router.push(data.nextPath);
      });
    } catch {
      setFieldErrors({
        form: ["We could not save your benchmark subscription. Please try again."],
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isReady) {
    return (
      <section className="hero-panel">
        <div className="hero-panel__topline" />
        <p className="pt-8 text-sm leading-6 text-[hsl(var(--stone-strong))]">
          Preparing your next step…
        </p>
      </section>
    );
  }

  return (
    <section className="hero-panel space-y-8">
      <div className="hero-panel__topline" />
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--clay))]">
          Optional benchmark delivery
        </p>
        <h1 className="font-[family:var(--font-display)] text-4xl leading-tight tracking-[-0.04em] text-[hsl(var(--charcoal))] sm:text-5xl">
          Your comparison is being prepared.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[hsl(var(--muted-ink))] sm:text-lg">
          Your anonymous response has been recorded. If you want the preliminary comparison, the
          full Massachusetts report, and updated benchmarks as more people participate, add your
          email here.
        </p>
      </div>

      <div className="rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.84)] p-5 text-sm leading-6 text-[hsl(var(--muted-ink))]">
        Your email stays in a separate subscriber record and is not attached to any published
        survey response.
      </div>

      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--charcoal))]" htmlFor="subscriber-first-name">
            First name (optional)
          </label>
          <input
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-4 py-3 text-base text-[hsl(var(--charcoal))] outline-none placeholder:text-[hsl(var(--stone-strong))] focus:border-[hsl(var(--clay))]"
            id="subscriber-first-name"
            onChange={(event) => setFieldValue("firstName", event.target.value)}
            placeholder="If you'd like"
            type="text"
            value={formState.firstName}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--charcoal))]" htmlFor="subscriber-email">
            Email address
          </label>
          <input
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-4 py-3 text-base text-[hsl(var(--charcoal))] outline-none placeholder:text-[hsl(var(--stone-strong))] focus:border-[hsl(var(--clay))]"
            id="subscriber-email"
            onChange={(event) => setFieldValue("email", event.target.value)}
            type="email"
            value={formState.email}
          />
          {fieldErrors.email ? (
            <p className="text-sm leading-6 text-[hsl(var(--clay-deep))]">{fieldErrors.email[0]}</p>
          ) : null}
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-4 py-4">
          <input
            checked={formState.consentedToEmail}
            className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--clay-deep))] focus:ring-[hsl(var(--clay-deep))]"
            onChange={(event) => setFieldValue("consentedToEmail", event.target.checked)}
            type="checkbox"
          />
          <span className="text-sm leading-6 text-[hsl(var(--charcoal))]">
            I agree to receive benchmark updates and report emails from Aesthetic Career Club. You
            can unsubscribe at any time.
          </span>
        </label>
        {fieldErrors.consentedToEmail ? (
          <p className="text-sm leading-6 text-[hsl(var(--clay-deep))]">
            {fieldErrors.consentedToEmail[0]}
          </p>
        ) : null}
        {fieldErrors.form ? (
          <p className="text-sm leading-6 text-[hsl(var(--clay-deep))]">{fieldErrors.form[0]}</p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving…" : "Send My Benchmark"}
          </button>
          <button
            className="button-secondary justify-center"
            onClick={() => {
              startTransition(() => {
                router.push("/thank-you");
              });
            }}
            type="button"
          >
            Skip for now
          </button>
        </div>
      </form>
    </section>
  );
}
