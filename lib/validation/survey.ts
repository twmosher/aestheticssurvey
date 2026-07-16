import { z } from "zod";

import {
  getSurveyQuestion,
  getSurveyQuestionOptionValues,
  getVisibleSurveyQuestions,
} from "@/lib/survey/logic";
import { createEmptySurveyAttribution } from "@/lib/survey/defaults";
import type { SurveyAnswers, SurveyMultiSelectQuestionId, SurveyQuestionId } from "@/lib/survey/types";

type SelectableSurveyQuestionId = Exclude<
  SurveyQuestionId,
  SurveyMultiSelectQuestionId |
    "hourlyRate" |
    "annualSalary" |
    "commissionValue" |
    "compensationFrustration" |
    "employerRetentionFeedback" |
    "consented"
>;

type StringSurveyAnswer<TId extends SurveyQuestionId> = Extract<SurveyAnswers[TId], string>;
type MultiSelectSurveyAnswer<TId extends SurveyMultiSelectQuestionId> = Extract<
  SurveyAnswers[TId],
  string[]
>;

function trimString(value: string) {
  return value.trim();
}

function createSelectableAnswerSchema<TId extends SelectableSurveyQuestionId>(questionId: TId) {
  const allowedValues = getSurveyQuestionOptionValues(questionId) as readonly string[];

  return z
    .string()
    .transform(trimString)
    .refine((value): value is StringSurveyAnswer<TId> => value === "" || allowedValues.includes(value), {
      message: `Invalid ${questionId} selection.`,
    });
}

function createMultiSelectAnswerSchema<TId extends SurveyMultiSelectQuestionId>(questionId: TId) {
  const allowedValues = getSurveyQuestionOptionValues(questionId) as readonly string[];

  return z
    .array(z.string().transform(trimString))
    .refine(
      (values): values is MultiSelectSurveyAnswer<TId> =>
        values.every((value) => allowedValues.includes(value)),
      {
      message: `Invalid ${questionId} selection.`,
      },
    );
}

function createTrimmedStringSchema() {
  return z.string().transform(trimString);
}

function parseCurrencyValue(value: string): number | null {
  const normalizedValue = value.replace(/[$,\s]/g, "");

  if (!normalizedValue) {
    return null;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalizedValue)) {
    return Number.NaN;
  }

  return Number(normalizedValue);
}

function createRequiredAnswerMessage(questionId: Parameters<typeof getSurveyQuestion>[0]) {
  switch (questionId) {
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
      return `${getSurveyQuestion(questionId).label} is required.`;
  }
}

function createInvalidCurrencyMessage(questionId: "hourlyRate" | "annualSalary") {
  return questionId === "hourlyRate"
    ? "Hourly rate must be a valid positive currency amount."
    : "Annual salary must be a valid positive currency amount.";
}

const surveyAnswersSchema = z
  .object({
    role: createSelectableAnswerSchema("role"),
    region: createSelectableAnswerSchema("region"),
    aestheticsExperience: createSelectableAnswerSchema("aestheticsExperience"),
    healthcareExperience: createSelectableAnswerSchema("healthcareExperience"),
    workplaceType: createSelectableAnswerSchema("workplaceType"),
    employerLocationCount: createSelectableAnswerSchema("employerLocationCount"),
    employmentArrangement: createSelectableAnswerSchema("employmentArrangement"),
    weeklyHours: createSelectableAnswerSchema("weeklyHours"),
    employerTenure: createSelectableAnswerSchema("employerTenure"),
    restrictiveAgreement: createSelectableAnswerSchema("restrictiveAgreement"),
    compensationStructure: createSelectableAnswerSchema("compensationStructure"),
    hourlyRate: createTrimmedStringSchema(),
    annualSalary: createTrimmedStringSchema(),
    receivesCommission: createSelectableAnswerSchema("receivesCommission"),
    commissionType: createSelectableAnswerSchema("commissionType"),
    commissionValue: createTrimmedStringSchema(),
    totalAnnualEarningsRange: createSelectableAnswerSchema("totalAnnualEarningsRange"),
    benefits: createMultiSelectAnswerSchema("benefits"),
    servicesPerformed: createMultiSelectAnswerSchema("servicesPerformed"),
    injectableVolumeRange: createSelectableAnswerSchema("injectableVolumeRange"),
    monthlyRevenueRange: createSelectableAnswerSchema("monthlyRevenueRange"),
    bringsPatientFollowing: createSelectableAnswerSchema("bringsPatientFollowing"),
    requestedPatientPercentageRange: createSelectableAnswerSchema("requestedPatientPercentageRange"),
    salesExpectation: createSelectableAnswerSchema("salesExpectation"),
    compensationFairnessScore: createSelectableAnswerSchema("compensationFairnessScore"),
    jobMobility: createSelectableAnswerSchema("jobMobility"),
    reasonsToLeave: createMultiSelectAnswerSchema("reasonsToLeave"),
    compensationFrustration: createTrimmedStringSchema(),
    employerRetentionFeedback: createTrimmedStringSchema(),
    consented: z.boolean(),
  })
  .superRefine((answers, context) => {
    const visibleQuestions = getVisibleSurveyQuestions(answers);

    for (const question of visibleQuestions) {
      const value = answers[question.id];

      if (question.input === "consent" && value !== true) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: createRequiredAnswerMessage(question.id),
          path: [question.id],
        });
        continue;
      }

      if (Array.isArray(value) && value.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: createRequiredAnswerMessage(question.id),
          path: [question.id],
        });
        continue;
      }

      if (typeof value === "string" && value.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: createRequiredAnswerMessage(question.id),
          path: [question.id],
        });
        continue;
      }

      if (
        (question.id === "hourlyRate" || question.id === "annualSalary") &&
        typeof value === "string"
      ) {
        const parsedCurrency = parseCurrencyValue(value);

        if (typeof parsedCurrency !== "number" || !Number.isFinite(parsedCurrency) || parsedCurrency <= 0) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: createInvalidCurrencyMessage(question.id),
            path: [question.id],
          });
        }
      }
    }
  });

const surveyAttributionSchema = z
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

export const surveySubmissionSchema = z.object({
  anonymousToken: z.string().trim().min(1, "Anonymous token is required."),
  answers: surveyAnswersSchema,
  attribution: surveyAttributionSchema,
});

export type SurveySubmissionInput = z.infer<typeof surveySubmissionSchema>;

export function flattenSurveySubmissionIssues(issues: z.ZodIssue[]) {
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

export function parseCurrencyInput(value: string) {
  const parsedValue = parseCurrencyValue(value);

  if (typeof parsedValue !== "number" || !Number.isFinite(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
}
