import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/survey/route";
import { createEmptySurveyAnswers, createEmptySurveyAttribution } from "@/lib/survey/defaults";
import { toSurveySubmissionRecord } from "@/lib/survey/transformers";
import { surveySubmissionSchema } from "@/lib/validation/survey";

function createValidSubmissionPayload() {
  return {
    anonymousToken: "anon_12345",
    answers: createEmptySurveyAnswers({
      role: "nurse_injector",
      roleTrack: "clinical",
      personallyPerformsProcedures: "yes",
      supervisesClinicians: "no",
      ownershipStatus: "employee",
      primaryState: "massachusetts",
      practicesInMassachusetts: "yes",
      practicesInMultipleStates: "no",
      activeStates: [],
      region: "boston",
      aestheticsExperience: "three_to_five_years",
      healthcareExperience: "six_to_ten_years",
      workplaceType: "independent_med_spa",
      employerLocationCount: "two_to_three_locations",
      primaryLicense: "rn",
      additionalLicenses: [],
      massachusettsLicenseActive: "yes",
      prescriptiveAuthority: "no",
      boardCertified: "no",
      independentAssessment: "yes",
      treatmentPlanSignoffRequired: "no",
      worksUnderMedicalDirector: "yes",
      isMedicalDirector: "no",
      injectorStatus: "yes",
      laserUnderOwnLicense: "no",
      licenseArrangement: "under_my_own_license",
      advancedTraining: ["manufacturer_training"],
      deviceCertifications: ["none"],
      employmentArrangement: "full_time_employee",
      weeklyHours: "30_to_39",
      employerTenure: "1_to_2_years",
      restrictiveAgreement: "no",
      compensationStructure: "hourly",
      hourlyRate: " $95.50 ",
      annualSalary: "",
      receivesCommission: "yes",
      commissionType: "percentage_of_personal_revenue",
      commissionValue: "12%",
      totalAnnualEarningsRange: "125000_to_149999",
      benefits: ["health_insurance", "paid_time_off"],
      servicesPerformed: ["neuromodulators", "dermal_filler"],
      injectableVolumeRange: "26_to_50",
      monthlyRevenueRange: "50000_to_74999",
      bringsPatientFollowing: "yes",
      requestedPatientPercentageRange: "25_to_49_percent",
      salesExpectation: "yes_informally_expected",
      compensationFairnessScore: "3",
      jobMobility: "open_to_hearing",
      reasonsToLeave: ["higher_compensation"],
      compensationFrustration: " Base pay still lags behind output. ",
      employerRetentionFeedback: " They underinvest in support staff. ",
      consented: true,
    }),
    attribution: createEmptySurveyAttribution({
      referrerCode: "ig-story-7",
      utmSource: "instagram",
      utmMedium: "social",
      utmCampaign: "summer_launch",
      landingPageVariant: "hero_b",
    }),
  };
}

describe("survey submission validation", () => {
  it("requires aggregate-use consent before anonymous submission", () => {
    const result = surveySubmissionSchema.safeParse({
      ...createValidSubmissionPayload(),
      answers: createEmptySurveyAnswers({
        ...createValidSubmissionPayload().answers,
        consented: false,
      }),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["answers", "consented"],
          message:
            "You must agree to aggregate workforce research and compensation benchmarking before submitting.",
        }),
      ]),
    );
  });

  it("requires answers for visible follow-up questions but not hidden ones", () => {
    const missingHourlyRate = surveySubmissionSchema.safeParse({
      ...createValidSubmissionPayload(),
      answers: createEmptySurveyAnswers({
        ...createValidSubmissionPayload().answers,
        hourlyRate: "   ",
      }),
    });

    expect(missingHourlyRate.success).toBe(false);
    expect(missingHourlyRate.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["answers", "hourlyRate"],
          message: "Hourly rate is required for the selected compensation structure.",
        }),
      ]),
    );

    const hiddenAnnualSalary = surveySubmissionSchema.safeParse({
      ...createValidSubmissionPayload(),
      answers: createEmptySurveyAnswers({
        ...createValidSubmissionPayload().answers,
        annualSalary: "   ",
      }),
    });

    expect(hiddenAnnualSalary.success).toBe(true);
  });

  it("requires commission details when the compensation structure itself includes commission", () => {
    const missingCommissionDetails = surveySubmissionSchema.safeParse({
      ...createValidSubmissionPayload(),
      answers: createEmptySurveyAnswers({
        ...createValidSubmissionPayload().answers,
        compensationStructure: "salary_plus_commission",
        annualSalary: "180000",
        hourlyRate: "",
        receivesCommission: "no",
        commissionType: "",
        commissionValue: "   ",
      }),
    });

    expect(missingCommissionDetails.success).toBe(false);
    expect(missingCommissionDetails.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["answers", "commissionType"],
          message: "Commission type is required when commission is selected.",
        }),
        expect.objectContaining({
          path: ["answers", "commissionValue"],
          message: "Commission value is required when commission is selected.",
        }),
      ]),
    );
  });
});

describe("survey submission transformer", () => {
  it("maps the Task 3 answer model into a handoff-ready submission record", () => {
    const submittedAt = new Date("2026-07-16T14:30:00.000Z");

    const parsed = surveySubmissionSchema.parse(createValidSubmissionPayload());
    const record = toSurveySubmissionRecord(parsed, {
      submittedAt,
      userAgent: "Vitest Browser",
    });

    expect(record).toMatchObject({
      anonymous_token: "anon_12345",
      role: "nurse_injector",
      compensation_structure: "hourly",
      hourly_rate: 95.5,
      annual_salary: null,
      receives_commission: "yes",
      commission_type: "percentage_of_personal_revenue",
      commission_value: "12%",
      compensation_fairness_score: 3,
      compensation_frustration: "Base pay still lags behind output.",
      employer_retention_feedback: "They underinvest in support staff.",
      consented: true,
      completed_at: "2026-07-16T14:30:00.000Z",
      referrer_code: "ig-story-7",
      utm_source: "instagram",
      utm_medium: "social",
      utm_campaign: "summer_launch",
      landing_page_variant: "hero_b",
      user_agent: "Vitest Browser",
    });

    expect(record.primary_state).toBe("massachusetts");
    expect(record.primary_license).toBe("rn");
    expect(record.benefits).toEqual(["health_insurance", "paid_time_off"]);
    expect(record.services_performed).toEqual(["neuromodulators", "dermal_filler"]);
    expect(record.reasons_to_leave).toEqual(["higher_compensation"]);
  });
});

describe("POST /api/survey", () => {
  it("returns the structured anonymous-submission success contract", async () => {
    const response = await POST(
      new Request("http://localhost/api/survey", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": "Vitest Browser",
        },
        body: JSON.stringify(createValidSubmissionPayload()),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      data: {
        anonymousToken: "anon_12345",
        nextPath: "/survey/email",
      },
    });
  });

  it("returns a structured validation error contract for invalid submissions", async () => {
    const response = await POST(
      new Request("http://localhost/api/survey", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...createValidSubmissionPayload(),
          answers: createEmptySurveyAnswers({
            ...createValidSubmissionPayload().answers,
            consented: false,
          }),
        }),
      }),
    );

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: {
        code: "INVALID_SURVEY_SUBMISSION",
        fieldErrors: {
          "answers.consented": [
            "You must agree to aggregate workforce research and compensation benchmarking before submitting.",
          ],
        },
      },
    });
  });
});
