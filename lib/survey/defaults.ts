import type { SurveyAnswers, SurveyAttribution, SurveyDraft } from "@/lib/survey/types";

const EMPTY_SURVEY_ANSWERS: SurveyAnswers = {
  role: "",
  roleTrack: "",
  personallyPerformsProcedures: "",
  supervisesClinicians: "",
  ownershipStatus: "",
  primaryState: "",
  practicesInMassachusetts: "",
  practicesInMultipleStates: "",
  activeStates: [],
  region: "",
  aestheticsExperience: "",
  healthcareExperience: "",
  workplaceType: "",
  employerLocationCount: "",
  primaryLicense: "",
  additionalLicenses: [],
  massachusettsLicenseActive: "",
  prescriptiveAuthority: "",
  boardCertified: "",
  boardCertificationType: "",
  independentAssessment: "",
  independentPrescribing: "",
  treatmentPlanSignoffRequired: "",
  prescribingSignoffRequired: "",
  worksUnderMedicalDirector: "",
  isMedicalDirector: "",
  injectorStatus: "",
  laserUnderOwnLicense: "",
  licenseArrangement: "",
  advancedTraining: [],
  deviceCertifications: [],
  employmentArrangement: "",
  weeklyHours: "",
  employerTenure: "",
  restrictiveAgreement: "",
  compensationStructure: "",
  hourlyRate: "",
  annualSalary: "",
  receivesCommission: "",
  commissionType: "",
  commissionValue: "",
  totalAnnualEarningsRange: "",
  benefits: [],
  servicesPerformed: [],
  injectableVolumeRange: "",
  monthlyRevenueRange: "",
  bringsPatientFollowing: "",
  requestedPatientPercentageRange: "",
  salesExpectation: "",
  compensationFairnessScore: "",
  jobMobility: "",
  reasonsToLeave: [],
  compensationFrustration: "",
  employerRetentionFeedback: "",
  consented: false,
};

const EMPTY_SURVEY_ATTRIBUTION: SurveyAttribution = {
  referrerCode: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  landingPageVariant: "",
};

const EMPTY_SURVEY_DRAFT: SurveyDraft = {
  currentStepIndex: 0,
  anonymousToken: "",
  answers: EMPTY_SURVEY_ANSWERS,
  attribution: EMPTY_SURVEY_ATTRIBUTION,
  hasSubmittedSurvey: false,
};

export function createEmptySurveyAnswers(overrides: Partial<SurveyAnswers> = {}): SurveyAnswers {
  return {
    ...EMPTY_SURVEY_ANSWERS,
    ...overrides,
    activeStates: overrides.activeStates ? [...overrides.activeStates] : [],
    additionalLicenses: overrides.additionalLicenses ? [...overrides.additionalLicenses] : [],
    advancedTraining: overrides.advancedTraining ? [...overrides.advancedTraining] : [],
    deviceCertifications: overrides.deviceCertifications ? [...overrides.deviceCertifications] : [],
    benefits: overrides.benefits ? [...overrides.benefits] : [],
    servicesPerformed: overrides.servicesPerformed ? [...overrides.servicesPerformed] : [],
    reasonsToLeave: overrides.reasonsToLeave ? [...overrides.reasonsToLeave] : [],
  };
}

export function createEmptySurveyAttribution(
  overrides: Partial<SurveyAttribution> = {},
): SurveyAttribution {
  return {
    ...EMPTY_SURVEY_ATTRIBUTION,
    ...overrides,
  };
}

export function createEmptySurveyDraft(overrides: Partial<SurveyDraft> = {}): SurveyDraft {
  return {
    ...EMPTY_SURVEY_DRAFT,
    ...overrides,
    answers: createEmptySurveyAnswers(overrides.answers),
    attribution: createEmptySurveyAttribution(overrides.attribution),
  };
}
