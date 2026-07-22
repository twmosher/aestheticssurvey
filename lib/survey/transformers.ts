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
  role_track: string;
  personally_performs_procedures: string;
  supervises_clinicians: string;
  ownership_status: string;
  primary_state: string;
  practices_in_massachusetts: string;
  practices_in_multiple_states: string;
  active_states: string[];
  region: string;
  aesthetics_experience: string;
  healthcare_experience: string;
  workplace_type: string;
  employer_location_count: string;
  primary_license: string;
  additional_licenses: string[];
  massachusetts_license_active: string;
  prescriptive_authority: string;
  board_certified: string;
  board_certification_type: string | null;
  independent_assessment: string;
  independent_prescribing: string | null;
  treatment_plan_signoff_required: string;
  prescribing_signoff_required: string | null;
  works_under_medical_director: string;
  is_medical_director: string;
  injector_status: string | null;
  laser_under_own_license: string | null;
  license_arrangement: string;
  advanced_training: string[];
  device_certifications: string[];
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
    role_track: answers.roleTrack,
    personally_performs_procedures: answers.personallyPerformsProcedures,
    supervises_clinicians: answers.supervisesClinicians,
    ownership_status: answers.ownershipStatus,
    primary_state: answers.primaryState,
    practices_in_massachusetts: answers.practicesInMassachusetts,
    practices_in_multiple_states: answers.practicesInMultipleStates,
    active_states: [...answers.activeStates],
    region: answers.region,
    aesthetics_experience: answers.aestheticsExperience,
    healthcare_experience: answers.healthcareExperience,
    workplace_type: answers.workplaceType,
    employer_location_count: answers.employerLocationCount,
    primary_license: answers.primaryLicense,
    additional_licenses: [...answers.additionalLicenses],
    massachusetts_license_active: answers.massachusettsLicenseActive,
    prescriptive_authority: answers.prescriptiveAuthority,
    board_certified: answers.boardCertified,
    board_certification_type: nullIfEmpty(answers.boardCertificationType),
    independent_assessment: answers.independentAssessment,
    independent_prescribing: nullIfEmpty(answers.independentPrescribing),
    treatment_plan_signoff_required: answers.treatmentPlanSignoffRequired,
    prescribing_signoff_required: nullIfEmpty(answers.prescribingSignoffRequired),
    works_under_medical_director: answers.worksUnderMedicalDirector,
    is_medical_director: answers.isMedicalDirector,
    injector_status: nullIfEmpty(answers.injectorStatus),
    laser_under_own_license: nullIfEmpty(answers.laserUnderOwnLicense),
    license_arrangement: answers.licenseArrangement,
    advanced_training: [...answers.advancedTraining],
    device_certifications: [...answers.deviceCertifications],
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
