// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SurveyShell } from "@/components/survey/survey-shell";
import { createEmptySurveyAnswers, createEmptySurveyDraft } from "@/lib/survey/defaults";
import { SURVEY_QUESTIONS } from "@/lib/survey/questions";
import { SURVEY_DRAFT_STORAGE_KEY } from "@/lib/survey/storage";

const pushMock = vi.fn();
const routerMock = {
  push: pushMock,
};

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

function createCompletedAnswers() {
  return createEmptySurveyAnswers({
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
    hourlyRate: "95",
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
    compensationFrustration: "Base pay still lags behind output.",
    employerRetentionFeedback: "They underinvest in support staff.",
    consented: false,
  });
}

const HOURLY_RATE_INDEX = SURVEY_QUESTIONS.findIndex((question) => question.id === "hourlyRate");
const COMPENSATION_STRUCTURE_INDEX = SURVEY_QUESTIONS.findIndex(
  (question) => question.id === "compensationStructure",
);
const CONSENT_INDEX = SURVEY_QUESTIONS.findIndex((question) => question.id === "consented");

describe("SurveyShell", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushMock.mockReset();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("restores a saved draft into the correct visible question with progress context", async () => {
    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify(
        createEmptySurveyDraft({
          currentStepIndex: HOURLY_RATE_INDEX,
          anonymousToken: "anon_restore_1",
          answers: createEmptySurveyAnswers({
            role: "nurse_injector",
            roleTrack: "clinical",
            personallyPerformsProcedures: "yes",
            supervisesClinicians: "no",
            ownershipStatus: "employee",
            primaryState: "massachusetts",
            practicesInMassachusetts: "yes",
            practicesInMultipleStates: "no",
            region: "boston",
            aestheticsExperience: "three_to_five_years",
            healthcareExperience: "six_to_ten_years",
            workplaceType: "independent_med_spa",
            employerLocationCount: "two_to_three_locations",
            primaryLicense: "rn",
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
          }),
        }),
      ),
    );

    render(<SurveyShell />);

    expect(
      await screen.findByRole("heading", {
        name: "What is your hourly rate?",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Compensation/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/minute/i)).toBeInTheDocument();
  });

  it("advances to the salary follow-up when the hourly follow-up is hidden by conditional logic", async () => {
    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify(
        createEmptySurveyDraft({
          currentStepIndex: COMPENSATION_STRUCTURE_INDEX,
          anonymousToken: "anon_salary_1",
          answers: createEmptySurveyAnswers({
            role: "nurse_injector",
            roleTrack: "clinical",
            personallyPerformsProcedures: "yes",
            supervisesClinicians: "no",
            ownershipStatus: "employee",
            primaryState: "massachusetts",
            practicesInMassachusetts: "yes",
            practicesInMultipleStates: "no",
            region: "boston",
            aestheticsExperience: "three_to_five_years",
            healthcareExperience: "six_to_ten_years",
            workplaceType: "independent_med_spa",
            employerLocationCount: "two_to_three_locations",
            primaryLicense: "rn",
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
          }),
        }),
      ),
    );

    render(<SurveyShell />);

    const salaryOption = await screen.findByLabelText("Salary");
    fireEvent.click(salaryOption);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(
      await screen.findByRole("heading", {
        name: "What is your annual base salary?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "What is your hourly rate?" }),
    ).not.toBeInTheDocument();
  });

  it("submits the anonymous survey with the stable token and routes to the email capture step", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          data: {
            anonymousToken: "anon_submit_1",
            nextPath: "/survey/email",
            acceptedAt: "2026-07-16T16:00:00.000Z",
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );

    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify(
        createEmptySurveyDraft({
          currentStepIndex: CONSENT_INDEX,
          anonymousToken: "anon_submit_1",
          answers: createCompletedAnswers(),
        }),
      ),
    );

    render(<SurveyShell />);

    expect(
      await screen.findByRole("heading", {
        name:
          "I understand that my responses will be analyzed in aggregate for workforce research and compensation benchmarking.",
      }),
    ).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByRole("button", { name: /submit anonymous response/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "/api/survey",
        expect.objectContaining({
          method: "POST",
          headers: { "content-type": "application/json" },
          body: expect.any(String),
        }),
      );
    });

    const [, requestInit] = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(JSON.parse(String(requestInit?.body))).toMatchObject({
      anonymousToken: "anon_submit_1",
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/survey/email");
    });
  });
});
