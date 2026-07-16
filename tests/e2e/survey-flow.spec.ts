import { expect, test } from "@playwright/test";

test.describe("survey to email to thank-you flow", () => {
  test.use({
    viewport: {
      width: 390,
      height: 844,
    },
  });

  test("submits the anonymous response before email capture and reaches thank-you sharing", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "aesthetic-workforce.survey-draft",
        JSON.stringify({
          currentStepIndex: 29,
          anonymousToken: "anon_e2e_flow",
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
            hourlyRate: "95",
            annualSalary: "",
            receivesCommission: "yes",
            commissionType: "percentage_of_services",
            commissionValue: "12%",
            totalAnnualEarningsRange: "125000_to_149999",
            benefits: ["health_insurance", "paid_time_off"],
            servicesPerformed: ["neuromodulators", "dermal_fillers"],
            injectableVolumeRange: "21_to_40",
            monthlyRevenueRange: "50000_to_74999",
            bringsPatientFollowing: "yes",
            requestedPatientPercentageRange: "25_to_49",
            salesExpectation: "moderate",
            compensationFairnessScore: "3",
            jobMobility: "somewhat_open",
            reasonsToLeave: ["higher_pay"],
            compensationFrustration: "Base pay still lags behind output.",
            employerRetentionFeedback: "They underinvest in support staff.",
            consented: false,
          },
          attribution: {
            referrerCode: "anon_e2e_flow",
            utmSource: "instagram",
            utmMedium: "social",
            utmCampaign: "summer_launch",
            landingPageVariant: "hero_b",
          },
        }),
      );
    });

    await page.route("**/api/survey", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          data: {
            anonymousToken: "anon_e2e_flow",
            nextPath: "/survey/email",
            acceptedAt: "2026-07-16T16:00:00.000Z",
          },
        }),
      });
    });

    await page.route("**/api/subscribers", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          data: {
            anonymousToken: "anon_e2e_flow",
            email: "alex@example.com",
            nextPath: "/thank-you",
            acceptedAt: "2026-07-16T16:01:00.000Z",
          },
        }),
      });
    });

    await page.goto("/survey");

    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: "Submit anonymous response" }).click();

    await expect(page).toHaveURL(/\/survey\/email$/);
    await expect(
      page.getByRole("heading", { name: "Your comparison is being prepared." }),
    ).toBeVisible();

    await page.getByLabel("First name").fill("Alex");
    await page.getByLabel("Email address").fill("alex@example.com");
    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: "Send me the benchmark" }).click();

    await expect(page).toHaveURL(/\/thank-you$/);
    await expect(
      page.getByRole("heading", { name: "You are now part of the Massachusetts benchmark." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy survey link" })).toBeVisible();
  });
});
