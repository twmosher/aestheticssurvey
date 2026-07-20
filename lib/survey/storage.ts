import { createEmptySurveyAnswers, createEmptySurveyAttribution, createEmptySurveyDraft } from "@/lib/survey/defaults";
import { getSurveyQuestionOptionValues, SURVEY_MAX_STEP_INDEX } from "@/lib/survey/logic";
import type {
  SurveyAnswers,
  SurveyAttribution,
  SurveyDraft,
  SurveyMultiSelectQuestionId,
  SurveyQuestionId,
} from "@/lib/survey/types";

export const SURVEY_DRAFT_STORAGE_KEY = "aesthetic-workforce.survey-draft";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function dedupeStrings(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function includesString<TValue extends string>(
  allowedValues: readonly TValue[],
  value: string,
): value is TValue {
  return (allowedValues as readonly string[]).includes(value);
}

function normalizeSelectableValue<TId extends SurveyQuestionId>(
  questionId: TId,
  value: unknown,
): SurveyAnswers[TId] {
  const fallback = createEmptySurveyAnswers()[questionId];

  if (typeof value !== "string") {
    return fallback;
  }

  const allowedValues = getSurveyQuestionOptionValues(questionId);

  return includesString(allowedValues, value) ? (value as SurveyAnswers[TId]) : fallback;
}

function normalizeSelectableArray<TId extends SurveyMultiSelectQuestionId>(
  questionId: TId,
  value: unknown,
): SurveyAnswers[TId] {
  const allowedValues = getSurveyQuestionOptionValues(questionId);

  return dedupeStrings(normalizeStringArray(value)).filter((entry) =>
    includesString(allowedValues, entry),
  ) as SurveyAnswers[TId];
}

function normalizeStepIndex(value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), SURVEY_MAX_STEP_INDEX);
}

function normalizeAnswers(value: unknown): SurveyAnswers {
  const defaults = createEmptySurveyAnswers();

  if (!isRecord(value)) {
    return defaults;
  }

  return {
    role: normalizeSelectableValue("role", value.role),
    roleTrack: normalizeSelectableValue("roleTrack", value.roleTrack),
    personallyPerformsProcedures: normalizeSelectableValue(
      "personallyPerformsProcedures",
      value.personallyPerformsProcedures,
    ),
    supervisesClinicians: normalizeSelectableValue(
      "supervisesClinicians",
      value.supervisesClinicians,
    ),
    ownershipStatus: normalizeSelectableValue("ownershipStatus", value.ownershipStatus),
    primaryState: normalizeSelectableValue("primaryState", value.primaryState),
    practicesInMassachusetts: normalizeSelectableValue(
      "practicesInMassachusetts",
      value.practicesInMassachusetts,
    ),
    practicesInMultipleStates: normalizeSelectableValue(
      "practicesInMultipleStates",
      value.practicesInMultipleStates,
    ),
    activeStates: normalizeSelectableArray("activeStates", value.activeStates),
    region: normalizeSelectableValue("region", value.region),
    aestheticsExperience: normalizeSelectableValue(
      "aestheticsExperience",
      value.aestheticsExperience,
    ),
    healthcareExperience: normalizeSelectableValue(
      "healthcareExperience",
      value.healthcareExperience,
    ),
    workplaceType: normalizeSelectableValue("workplaceType", value.workplaceType),
    employerLocationCount: normalizeSelectableValue(
      "employerLocationCount",
      value.employerLocationCount,
    ),
    primaryLicense: normalizeSelectableValue("primaryLicense", value.primaryLicense),
    additionalLicenses: normalizeSelectableArray("additionalLicenses", value.additionalLicenses),
    massachusettsLicenseActive: normalizeSelectableValue(
      "massachusettsLicenseActive",
      value.massachusettsLicenseActive,
    ),
    prescriptiveAuthority: normalizeSelectableValue(
      "prescriptiveAuthority",
      value.prescriptiveAuthority,
    ),
    boardCertified: normalizeSelectableValue("boardCertified", value.boardCertified),
    boardCertificationType: normalizeSelectableValue(
      "boardCertificationType",
      value.boardCertificationType,
    ),
    independentAssessment: normalizeSelectableValue(
      "independentAssessment",
      value.independentAssessment,
    ),
    independentPrescribing: normalizeSelectableValue(
      "independentPrescribing",
      value.independentPrescribing,
    ),
    treatmentPlanSignoffRequired: normalizeSelectableValue(
      "treatmentPlanSignoffRequired",
      value.treatmentPlanSignoffRequired,
    ),
    prescribingSignoffRequired: normalizeSelectableValue(
      "prescribingSignoffRequired",
      value.prescribingSignoffRequired,
    ),
    worksUnderMedicalDirector: normalizeSelectableValue(
      "worksUnderMedicalDirector",
      value.worksUnderMedicalDirector,
    ),
    isMedicalDirector: normalizeSelectableValue("isMedicalDirector", value.isMedicalDirector),
    injectorStatus: normalizeSelectableValue("injectorStatus", value.injectorStatus),
    laserUnderOwnLicense: normalizeSelectableValue(
      "laserUnderOwnLicense",
      value.laserUnderOwnLicense,
    ),
    licenseArrangement: normalizeSelectableValue("licenseArrangement", value.licenseArrangement),
    advancedTraining: normalizeSelectableArray("advancedTraining", value.advancedTraining),
    deviceCertifications: normalizeSelectableArray(
      "deviceCertifications",
      value.deviceCertifications,
    ),
    employmentArrangement: normalizeSelectableValue(
      "employmentArrangement",
      value.employmentArrangement,
    ),
    weeklyHours: normalizeSelectableValue("weeklyHours", value.weeklyHours),
    employerTenure: normalizeSelectableValue("employerTenure", value.employerTenure),
    restrictiveAgreement: normalizeSelectableValue(
      "restrictiveAgreement",
      value.restrictiveAgreement,
    ),
    compensationStructure: normalizeSelectableValue(
      "compensationStructure",
      value.compensationStructure,
    ),
    hourlyRate: typeof value.hourlyRate === "string" ? value.hourlyRate : defaults.hourlyRate,
    annualSalary:
      typeof value.annualSalary === "string" ? value.annualSalary : defaults.annualSalary,
    receivesCommission: normalizeSelectableValue("receivesCommission", value.receivesCommission),
    commissionType: normalizeSelectableValue("commissionType", value.commissionType),
    commissionValue:
      typeof value.commissionValue === "string" ? value.commissionValue : defaults.commissionValue,
    totalAnnualEarningsRange: normalizeSelectableValue(
      "totalAnnualEarningsRange",
      value.totalAnnualEarningsRange,
    ),
    benefits: normalizeSelectableArray("benefits", value.benefits),
    servicesPerformed: normalizeSelectableArray("servicesPerformed", value.servicesPerformed),
    injectableVolumeRange: normalizeSelectableValue(
      "injectableVolumeRange",
      value.injectableVolumeRange,
    ),
    monthlyRevenueRange: normalizeSelectableValue(
      "monthlyRevenueRange",
      value.monthlyRevenueRange,
    ),
    bringsPatientFollowing: normalizeSelectableValue(
      "bringsPatientFollowing",
      value.bringsPatientFollowing,
    ),
    requestedPatientPercentageRange: normalizeSelectableValue(
      "requestedPatientPercentageRange",
      value.requestedPatientPercentageRange,
    ),
    salesExpectation: normalizeSelectableValue("salesExpectation", value.salesExpectation),
    compensationFairnessScore: normalizeSelectableValue(
      "compensationFairnessScore",
      value.compensationFairnessScore,
    ),
    jobMobility: normalizeSelectableValue("jobMobility", value.jobMobility),
    reasonsToLeave: normalizeSelectableArray("reasonsToLeave", value.reasonsToLeave),
    compensationFrustration:
      typeof value.compensationFrustration === "string"
        ? value.compensationFrustration
        : defaults.compensationFrustration,
    employerRetentionFeedback:
      typeof value.employerRetentionFeedback === "string"
        ? value.employerRetentionFeedback
        : defaults.employerRetentionFeedback,
    consented: typeof value.consented === "boolean" ? value.consented : defaults.consented,
  };
}

function normalizeAttribution(value: unknown): SurveyAttribution {
  const defaults = createEmptySurveyAttribution();

  if (!isRecord(value)) {
    return defaults;
  }

  return {
    referrerCode:
      typeof value.referrerCode === "string" ? value.referrerCode : defaults.referrerCode,
    utmSource: typeof value.utmSource === "string" ? value.utmSource : defaults.utmSource,
    utmMedium: typeof value.utmMedium === "string" ? value.utmMedium : defaults.utmMedium,
    utmCampaign: typeof value.utmCampaign === "string" ? value.utmCampaign : defaults.utmCampaign,
    landingPageVariant:
      typeof value.landingPageVariant === "string"
        ? value.landingPageVariant
        : defaults.landingPageVariant,
  };
}

function normalizeDraft(value: unknown): SurveyDraft {
  const defaults = createEmptySurveyDraft();

  if (!isRecord(value)) {
    return defaults;
  }

  return {
    currentStepIndex: normalizeStepIndex(value.currentStepIndex),
    anonymousToken:
      typeof value.anonymousToken === "string" ? value.anonymousToken : defaults.anonymousToken,
    answers: normalizeAnswers(value.answers),
    attribution: normalizeAttribution(value.attribution),
    hasSubmittedSurvey:
      typeof value.hasSubmittedSurvey === "boolean"
        ? value.hasSubmittedSurvey
        : defaults.hasSubmittedSurvey,
  };
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function saveSurveyDraft(draft: SurveyDraft): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(SURVEY_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    return;
  }
}

export function loadSurveyDraft(): SurveyDraft {
  const storage = getStorage();

  if (!storage) {
    return createEmptySurveyDraft();
  }

  let rawDraft: string | null;

  try {
    rawDraft = storage.getItem(SURVEY_DRAFT_STORAGE_KEY);
  } catch {
    return createEmptySurveyDraft();
  }

  if (!rawDraft) {
    return createEmptySurveyDraft();
  }

  try {
    return normalizeDraft(JSON.parse(rawDraft));
  } catch {
    return createEmptySurveyDraft();
  }
}

export function clearSurveyDraft(): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(SURVEY_DRAFT_STORAGE_KEY);
  } catch {
    return;
  }
}
