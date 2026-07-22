import { z } from "zod";

import { createEmptySurveyAttribution } from "@/lib/survey/defaults";

function trimString(value: string) {
  return value.trim();
}

const subscriberAttributionSchema = z
  .object({
    referrerCode: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    landingPageVariant: z.string().optional(),
  })
  .optional()
  .transform((attribution) => {
    const defaults = createEmptySurveyAttribution();

    return {
      referrerCode: trimString(attribution?.referrerCode ?? defaults.referrerCode),
      utmSource: trimString(attribution?.utmSource ?? defaults.utmSource),
      utmMedium: trimString(attribution?.utmMedium ?? defaults.utmMedium),
      utmCampaign: trimString(attribution?.utmCampaign ?? defaults.utmCampaign),
      landingPageVariant: trimString(attribution?.landingPageVariant ?? defaults.landingPageVariant),
    };
  });

export const subscriberSubmissionSchema = z.object({
  anonymousToken: z.string().trim().min(1, "Anonymous token is required."),
  email: z.string().trim().email("Enter a valid email address."),
  firstName: z.string().optional().transform((value) => trimString(value ?? "")),
  consentedToEmail: z.boolean().refine((value) => value, {
    message: "Email consent is required to subscribe for benchmark updates.",
  }),
  attribution: subscriberAttributionSchema,
});

export function flattenSubscriberSubmissionIssues(issues: z.ZodIssue[]) {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of issues) {
    const path = issue.path.join(".");

    if (!path) {
      continue;
    }

    fieldErrors[path] ??= [];
    fieldErrors[path].push(issue.message);
  }

  return fieldErrors;
}
