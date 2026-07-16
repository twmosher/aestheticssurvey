import { expect, test } from "@playwright/test";

test.describe("survey restore behavior", () => {
  test.use({
    viewport: {
      width: 390,
      height: 844,
    },
  });

  test("restores the saved draft and keeps the anonymous token stable across reloads", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "aesthetic-workforce.survey-draft",
        JSON.stringify({
          currentStepIndex: 11,
          anonymousToken: "anon_restore_flow",
          hasSubmittedSurvey: false,
          answers: {
            role: "nurse_injector",
            region: "greater_boston",
            aestheticsExperience: "three_to_five_years",
            healthcareExperience: "six_to_ten_years",
            workplaceType: "med_spa",
            employerLocationCount: "two_to_three_locations",
            employmentArrangement: "full_time_employee",
            weeklyHours: "30_to_39",
            employerTenure: "1_to_2_years",
            restrictiveAgreement: "no",
            compensationStructure: "hourly",
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
          },
          attribution: {
            referrerCode: "",
            utmSource: "instagram",
            utmMedium: "social",
            utmCampaign: "summer_launch",
            landingPageVariant: "hero_b",
          },
        }),
      );
    });

    await page.goto("/survey");

    await expect(page.getByRole("heading", { name: "What is your hourly rate?" })).toBeVisible();
    await page.getByLabel("What is your hourly rate?").fill("98");
    await page.reload();

    await expect(page.getByLabel("What is your hourly rate?")).toHaveValue("98");

    const draft = await page.evaluate(() =>
      JSON.parse(window.localStorage.getItem("aesthetic-workforce.survey-draft") ?? "{}"),
    );

    expect(draft.anonymousToken).toBe("anon_restore_flow");
  });
});
