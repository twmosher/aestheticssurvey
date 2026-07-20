import { describe, expect, it } from "vitest";

import { getSurveyQuestion, getVisibleSurveyQuestions } from "@/lib/survey/logic";
import { createEmptySurveyAnswers } from "@/lib/survey/defaults";
import { SURVEY_QUESTIONS } from "@/lib/survey/questions";

describe("survey question config", () => {
  it("preserves the approved survey question inventory", () => {
    expect(SURVEY_QUESTIONS.map((question) => question.id)).toEqual([
      "role",
      "roleTrack",
      "personallyPerformsProcedures",
      "supervisesClinicians",
      "ownershipStatus",
      "primaryState",
      "practicesInMassachusetts",
      "practicesInMultipleStates",
      "activeStates",
      "region",
      "aestheticsExperience",
      "healthcareExperience",
      "workplaceType",
      "employerLocationCount",
      "primaryLicense",
      "additionalLicenses",
      "massachusettsLicenseActive",
      "prescriptiveAuthority",
      "boardCertified",
      "boardCertificationType",
      "independentAssessment",
      "independentPrescribing",
      "treatmentPlanSignoffRequired",
      "prescribingSignoffRequired",
      "worksUnderMedicalDirector",
      "isMedicalDirector",
      "injectorStatus",
      "laserUnderOwnLicense",
      "licenseArrangement",
      "advancedTraining",
      "deviceCertifications",
      "employmentArrangement",
      "weeklyHours",
      "employerTenure",
      "restrictiveAgreement",
      "compensationStructure",
      "hourlyRate",
      "annualSalary",
      "receivesCommission",
      "commissionType",
      "commissionValue",
      "totalAnnualEarningsRange",
      "benefits",
      "servicesPerformed",
      "injectableVolumeRange",
      "monthlyRevenueRange",
      "bringsPatientFollowing",
      "requestedPatientPercentageRange",
      "salesExpectation",
      "compensationFairnessScore",
      "jobMobility",
      "reasonsToLeave",
      "compensationFrustration",
      "employerRetentionFeedback",
      "consented",
    ]);
  });

  it("exposes prompt copy for branching questions", () => {
    expect(getSurveyQuestion("compensationStructure")).toMatchObject({
      label: "How are you primarily compensated in your current role?",
    });

    expect(getSurveyQuestion("hourlyRate")).toMatchObject({
      label: "What is your hourly rate?",
      section: "Compensation",
    });

    expect(getSurveyQuestion("commissionType")).toMatchObject({
      label: "What kind of commission or production structure do you receive?",
    });

    expect(getSurveyQuestion("consented")).toMatchObject({
      label:
        "I understand that my responses will be analyzed in aggregate for workforce research and compensation benchmarking.",
      section: "Consent",
      input: "consent",
    });
  });
});

describe("survey conditional logic", () => {
  it("shows hourly rate and hides annual salary for hourly compensation", () => {
    const answers = createEmptySurveyAnswers({
      compensationStructure: "hourly",
    });

    const visibleIds = getVisibleSurveyQuestions(answers).map((question) => question.id);

    expect(visibleIds).toContain("hourlyRate");
    expect(visibleIds).not.toContain("annualSalary");
  });

  it("shows annual salary and hides hourly rate for salary compensation", () => {
    const answers = createEmptySurveyAnswers({
      compensationStructure: "salary",
    });

    const visibleIds = getVisibleSurveyQuestions(answers).map((question) => question.id);

    expect(visibleIds).toContain("annualSalary");
    expect(visibleIds).not.toContain("hourlyRate");
  });

  it("does not show hourly or salary prompts for commission-only compensation", () => {
    const answers = createEmptySurveyAnswers({
      compensationStructure: "commission_only",
    });

    const visibleIds = getVisibleSurveyQuestions(answers).map((question) => question.id);

    expect(visibleIds).not.toContain("hourlyRate");
    expect(visibleIds).not.toContain("annualSalary");
  });

  it("shows commission follow-ups only when commission is actually applicable", () => {
    const noCommissionAnswers = createEmptySurveyAnswers({
      compensationStructure: "hourly",
      receivesCommission: "no",
    });
    const noCommissionVisibleIds = getVisibleSurveyQuestions(noCommissionAnswers).map(
      (question) => question.id,
    );

    expect(noCommissionVisibleIds).not.toContain("commissionType");
    expect(noCommissionVisibleIds).not.toContain("commissionValue");

    const commissionAnswers = createEmptySurveyAnswers({
      receivesCommission: "yes",
    });
    const commissionVisibleIds = getVisibleSurveyQuestions(commissionAnswers).map(
      (question) => question.id,
    );

    expect(commissionVisibleIds).toContain("commissionType");
    expect(commissionVisibleIds).toContain("commissionValue");

    const commissionBearingStructureAnswers = createEmptySurveyAnswers({
      compensationStructure: "salary_plus_commission",
      receivesCommission: "no",
    });
    const commissionBearingVisibleIds = getVisibleSurveyQuestions(
      commissionBearingStructureAnswers,
    ).map((question) => question.id);

    expect(commissionBearingVisibleIds).toContain("commissionType");
    expect(commissionBearingVisibleIds).toContain("commissionValue");
  });
});
