// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createEmptySurveyAnswers, createEmptySurveyDraft } from "@/lib/survey/defaults";
import {
  clearSurveyDraft,
  loadSurveyDraft,
  saveSurveyDraft,
  SURVEY_DRAFT_STORAGE_KEY,
} from "@/lib/survey/storage";

describe("survey draft storage", () => {
  const originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(window, "localStorage");

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();

    if (originalLocalStorageDescriptor) {
      Object.defineProperty(window, "localStorage", originalLocalStorageDescriptor);
    }
  });

  it("saves and restores step index, anonymous token, answers, and attribution metadata", () => {
    const draft = createEmptySurveyDraft({
      currentStepIndex: 6,
      anonymousToken: "anon_123",
      answers: createEmptySurveyAnswers({
        role: "nurse_injector",
        compensationStructure: "hourly",
        hourlyRate: "92",
        receivesCommission: "yes",
        commissionType: "percentage_of_services",
        commissionValue: "12",
      }),
      attribution: {
        referrerCode: "ig-story-7",
        utmSource: "instagram",
        utmMedium: "social",
        utmCampaign: "summer_launch",
        landingPageVariant: "hero_b",
      },
    });

    saveSurveyDraft(draft);

    expect(window.localStorage.getItem(SURVEY_DRAFT_STORAGE_KEY)).not.toBeNull();
    expect(loadSurveyDraft()).toEqual(draft);
  });

  it("returns a clean default draft when nothing has been saved", () => {
    expect(loadSurveyDraft()).toEqual(createEmptySurveyDraft());
  });

  it("clears the stored draft", () => {
    saveSurveyDraft(
      createEmptySurveyDraft({
        currentStepIndex: 2,
        anonymousToken: "anon_to_clear",
      }),
    );

    clearSurveyDraft();

    expect(window.localStorage.getItem(SURVEY_DRAFT_STORAGE_KEY)).toBeNull();
    expect(loadSurveyDraft()).toEqual(createEmptySurveyDraft());
  });

  it("drops invalid stored option values back to safe defaults", () => {
    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify({
        currentStepIndex: 3,
        anonymousToken: "anon_bad_values",
        answers: {
          role: "definitely_not_a_real_role",
          compensationStructure: "sideways",
          benefits: ["health_insurance", "made_up_benefit"],
          reasonsToLeave: ["higher_pay", "not_a_real_reason"],
          consented: true,
        },
        attribution: {
          utmSource: "instagram",
        },
      }),
    );

    expect(loadSurveyDraft()).toEqual(
      createEmptySurveyDraft({
        currentStepIndex: 3,
        anonymousToken: "anon_bad_values",
        answers: createEmptySurveyAnswers({
          benefits: ["health_insurance"],
          reasonsToLeave: ["higher_pay"],
          consented: true,
        }),
        attribution: {
          utmSource: "instagram",
          referrerCode: "",
          utmMedium: "",
          utmCampaign: "",
          landingPageVariant: "",
        },
      }),
    );
  });

  it("dedupes restored multi-select values while preserving first-seen order", () => {
    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify({
        answers: {
          benefits: [
            "health_insurance",
            "paid_time_off",
            "health_insurance",
            "paid_time_off",
            "retirement_plan",
          ],
          reasonsToLeave: ["higher_pay", "higher_pay", "better_schedule"],
        },
      }),
    );

    expect(loadSurveyDraft()).toEqual(
      createEmptySurveyDraft({
        answers: createEmptySurveyAnswers({
          benefits: ["health_insurance", "paid_time_off", "retirement_plan"],
          reasonsToLeave: ["higher_pay", "better_schedule"],
        }),
      }),
    );
  });

  it("bounds restored step index to the available survey question range", () => {
    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify({
        currentStepIndex: 9999,
        anonymousToken: "anon_far_past_end",
      }),
    );

    expect(loadSurveyDraft()).toEqual(
      createEmptySurveyDraft({
        currentStepIndex: 29,
        anonymousToken: "anon_far_past_end",
      }),
    );
  });

  it("fails safely when storage operations throw", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("setItem blocked");
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("getItem blocked");
    });
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("removeItem blocked");
    });

    expect(() => saveSurveyDraft(createEmptySurveyDraft())).not.toThrow();
    expect(() => loadSurveyDraft()).not.toThrow();
    expect(loadSurveyDraft()).toEqual(createEmptySurveyDraft());
    expect(() => clearSurveyDraft()).not.toThrow();
  });

  it("fails safely when localStorage access itself throws", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("localStorage unavailable");
      },
    });

    expect(() => saveSurveyDraft(createEmptySurveyDraft())).not.toThrow();
    expect(() => loadSurveyDraft()).not.toThrow();
    expect(loadSurveyDraft()).toEqual(createEmptySurveyDraft());
    expect(() => clearSurveyDraft()).not.toThrow();
  });
});
