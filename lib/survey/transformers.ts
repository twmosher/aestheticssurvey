import type { SurveySubmissionInput } from "@/lib/validation/survey";
import { parseCurrencyInput } from "@/lib/validation/survey";

function nullIfEmpty(value: string) {
  return value.length > 0 ? value : null;
}

function nullIfBlankString(value: string | null | undefined) {
  const trimmedValue = value?.trim() ?? "";

  return trimmedValue.length > 0 ? trimmedValue : null;
}

export interface SurveySubmissionRecord {
  anonymous_token: string;
  role: string;
  region: string;
  aesthetics_experience: string;
  healthcare_experience: string;
  workplace_type: string;
  employer_location_count: string;
  employment_arrangement: string;
  weekly_hours: string;
  employer_tenure: string;
  restrictive_agreement: string;
  compensation_structure: string;
  hourly_rate: number | null;
  annual_salary: number | null;
  receives_commission: string;
  commission_type: string | null;
  commission_value: string | null;
  total_annual_earnings_range: string;
  benefits: string[];
  services_performed: string[];
  injectable_volume_range: string;
  monthly_revenue_range: string;
  brings_patient_following: string;
  requested_patient_percentage_range: string;
  sales_expectation: string;
  compensation_fairness_score: number;
  job_mobility: string;
  reasons_to_leave: string[];
  compensation_frustration: string;
  employer_retention_feedback: string;
  consented: true;
  completed_at: string;
  referrer_code: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  user_agent: string | null;
  landing_page_variant: string | null;
}

export function toSurveySubmissionRecord(
  submission: SurveySubmissionInput,
  options: {
    submittedAt?: Date;
    userAgent?: string | null;
  } = {},
): SurveySubmissionRecord {
  const submittedAt = options.submittedAt ?? new Date();
  const { answers, attribution } = submission;

  return {
    anonymous_token: submission.anonymousToken,
    role: answers.role,
    region: answers.region,
    aesthetics_experience: answers.aestheticsExperience,
    healthcare_experience: answers.healthcareExperience,
    workplace_type: answers.workplaceType,
    employer_location_count: answers.employerLocationCount,
    employment_arrangement: answers.employmentArrangement,
    weekly_hours: answers.weeklyHours,
    employer_tenure: answers.employerTenure,
    restrictive_agreement: answers.restrictiveAgreement,
    compensation_structure: answers.compensationStructure,
    hourly_rate: parseCurrencyInput(answers.hourlyRate),
    annual_salary: parseCurrencyInput(answers.annualSalary),
    receives_commission: answers.receivesCommission,
    commission_type: nullIfEmpty(answers.commissionType),
    commission_value: nullIfBlankString(answers.commissionValue),
    total_annual_earnings_range: answers.totalAnnualEarningsRange,
    benefits: [...answers.benefits],
    services_performed: [...answers.servicesPerformed],
    injectable_volume_range: answers.injectableVolumeRange,
    monthly_revenue_range: answers.monthlyRevenueRange,
    brings_patient_following: answers.bringsPatientFollowing,
    requested_patient_percentage_range: answers.requestedPatientPercentageRange,
    sales_expectation: answers.salesExpectation,
    compensation_fairness_score: Number.parseInt(answers.compensationFairnessScore, 10),
    job_mobility: answers.jobMobility,
    reasons_to_leave: [...answers.reasonsToLeave],
    compensation_frustration: answers.compensationFrustration,
    employer_retention_feedback: answers.employerRetentionFeedback,
    consented: true,
    completed_at: submittedAt.toISOString(),
    referrer_code: nullIfBlankString(attribution.referrerCode),
    utm_source: nullIfBlankString(attribution.utmSource),
    utm_medium: nullIfBlankString(attribution.utmMedium),
    utm_campaign: nullIfBlankString(attribution.utmCampaign),
    user_agent: nullIfBlankString(options.userAgent),
    landing_page_variant: nullIfBlankString(attribution.landingPageVariant),
  };
}
