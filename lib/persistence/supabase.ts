import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";

import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { parseEnv } from "@/lib/env";
import type { SurveySubmissionRecord } from "@/lib/survey/transformers";
import type { SurveySubmissionInput } from "@/lib/validation/survey";
import type { z } from "zod";
import { subscriberSubmissionSchema } from "@/lib/validation/subscriber";

type SubscriberSubmission = z.infer<typeof subscriberSubmissionSchema>;

interface SubscriberRecord {
  anonymous_response_token: string;
  consented_to_email: true;
  created_at: string;
  email: string;
  first_name: string | null;
  landing_page_variant: string | null;
  referrer_code: string | null;
  unsubscribed_at: null;
  utm_campaign: string | null;
  utm_medium: string | null;
  utm_source: string | null;
}

class PersistenceConfigurationError extends Error {
  code = "PERSISTENCE_CONFIGURATION_ERROR" as const;
}

function isTestEnvironment() {
  return process.env.NODE_ENV === "test" || process.env.VITEST === "true";
}

function nullIfBlank(value: string | null | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function createAdminClient(): SupabaseClient {
  try {
    const env = parseEnv();

    return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    throw new PersistenceConfigurationError(
      error instanceof Error
        ? error.message
        : "Supabase environment variables are missing or invalid.",
    );
  }
}

function createSubscriberRecord(
  submission: SubscriberSubmission,
  acceptedAt: string,
): SubscriberRecord {
  return {
    anonymous_response_token: submission.anonymousToken,
    consented_to_email: true,
    created_at: acceptedAt,
    email: submission.email,
    first_name: nullIfBlank(submission.firstName),
    landing_page_variant: nullIfBlank(submission.attribution.landingPageVariant),
    referrer_code: nullIfBlank(submission.attribution.referrerCode),
    unsubscribed_at: null,
    utm_campaign: nullIfBlank(submission.attribution.utmCampaign),
    utm_medium: nullIfBlank(submission.attribution.utmMedium),
    utm_source: nullIfBlank(submission.attribution.utmSource),
  };
}

async function sendSubscriberConfirmationEmail(
  submission: SubscriberSubmission,
): Promise<void> {
  if (isTestEnvironment()) {
    return;
  }

  const env = parseEnv();

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const firstName = submission.firstName.trim();
  const greeting = firstName ? `Hi ${firstName},` : "Hello,";

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    replyTo: CONTACT_EMAIL,
    subject: "You’re on the list for the Massachusetts Aesthetic Compensation Report",
    to: submission.email,
    text: [
      greeting,
      "",
      `Thanks for joining ${SITE_NAME}.`,
      "",
      "We recorded your request for the 2026 Massachusetts Aesthetic Compensation Report.",
      "You’ll receive your benchmark update and the full report once enough qualified responses have been reviewed.",
      "",
      "You can unsubscribe from future benchmark emails at any time by replying to this message.",
    ].join("\n"),
  });
}

export async function persistSurveySubmission(
  submission: SurveySubmissionInput,
  record: SurveySubmissionRecord,
): Promise<void> {
  if (isTestEnvironment()) {
    return;
  }

  const client = createAdminClient();
  const surveyPayload = {
    ...record,
    current_brand: SITE_NAME,
  };

  const { error } = await client
    .from("survey_responses")
    .upsert(surveyPayload, { onConflict: "anonymous_token" });

  if (error) {
    throw error;
  }

  if (record.referrer_code) {
    const { error: referralError } = await client.from("referral_events").upsert(
      {
        created_at: record.completed_at,
        referred_response_token: submission.anonymousToken,
        referrer_code: record.referrer_code,
      },
      { onConflict: "referred_response_token" },
    );

    if (referralError) {
      throw referralError;
    }
  }
}

export async function persistSubscriberSubmission(
  submission: SubscriberSubmission,
): Promise<{ acceptedAt: string }> {
  const acceptedAt = new Date().toISOString();

  if (isTestEnvironment()) {
    return { acceptedAt };
  }

  const client = createAdminClient();
  const subscriberRecord = createSubscriberRecord(submission, acceptedAt);

  const { error } = await client.from("report_subscribers").upsert(subscriberRecord, {
    onConflict: "email",
  });

  if (error) {
    throw error;
  }

  await sendSubscriberConfirmationEmail(submission);

  return { acceptedAt };
}

export function isPersistenceConfigurationError(error: unknown): error is PersistenceConfigurationError {
  return error instanceof PersistenceConfigurationError;
}
