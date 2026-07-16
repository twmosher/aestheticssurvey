import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/subscribers/route";
import { subscriberSubmissionSchema } from "@/lib/validation/subscriber";

function createValidSubscriberPayload() {
  return {
    anonymousToken: "anon_12345",
    email: "  alex@example.com  ",
    firstName: "  Alex  ",
    consentedToEmail: true,
    attribution: {
      utmSource: "instagram",
      utmCampaign: "summer_launch",
    },
  };
}

describe("subscriber submission validation", () => {
  it("keeps subscriber identity separate from anonymous survey answers", () => {
    const parsed = subscriberSubmissionSchema.parse({
      ...createValidSubscriberPayload(),
      answers: {
        hourlyRate: "95",
        compensationStructure: "hourly",
      },
    });

    expect(parsed).toEqual({
      anonymousToken: "anon_12345",
      email: "alex@example.com",
      firstName: "Alex",
      consentedToEmail: true,
      attribution: {
        utmSource: "instagram",
        utmMedium: "",
        utmCampaign: "summer_launch",
        referrerCode: "",
        landingPageVariant: "",
      },
    });
    expect(parsed).not.toHaveProperty("answers");
  });

  it("allows a blank first name while preserving the anonymous-token handoff", () => {
    const parsed = subscriberSubmissionSchema.parse({
      ...createValidSubscriberPayload(),
      firstName: "   ",
    });

    expect(parsed).toEqual({
      anonymousToken: "anon_12345",
      email: "alex@example.com",
      firstName: "",
      consentedToEmail: true,
      attribution: {
        utmSource: "instagram",
        utmMedium: "",
        utmCampaign: "summer_launch",
        referrerCode: "",
        landingPageVariant: "",
      },
    });
  });

  it("requires a valid email, subscriber consent, and the anonymous token handoff", () => {
    const result = subscriberSubmissionSchema.safeParse({
      anonymousToken: "  ",
      email: "not-an-email",
      firstName: "  ",
      consentedToEmail: false,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["anonymousToken"],
          message: "Anonymous token is required.",
        }),
        expect.objectContaining({
          path: ["email"],
          message: "Enter a valid email address.",
        }),
        expect.objectContaining({
          path: ["consentedToEmail"],
          message: "Email consent is required to subscribe for benchmark updates.",
        }),
      ]),
    );
  });
});

describe("POST /api/subscribers", () => {
  it("returns a separate subscriber success contract without echoing survey answers", async () => {
    const response = await POST(
      new Request("http://localhost/api/subscribers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...createValidSubscriberPayload(),
          answers: {
            annualSalary: "180000",
          },
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      data: {
        anonymousToken: "anon_12345",
        email: "alex@example.com",
        nextPath: "/thank-you",
        acceptedAt: expect.any(String),
      },
    });
  });

  it("accepts a blank first name in the subscriber API contract", async () => {
    const response = await POST(
      new Request("http://localhost/api/subscribers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...createValidSubscriberPayload(),
          firstName: "   ",
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      data: {
        anonymousToken: "anon_12345",
        email: "alex@example.com",
        nextPath: "/thank-you",
        acceptedAt: expect.any(String),
      },
    });
  });

  it("returns structured field errors for invalid subscriber submissions", async () => {
    const response = await POST(
      new Request("http://localhost/api/subscribers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          anonymousToken: "",
          email: "not-an-email",
          firstName: "",
          consentedToEmail: false,
        }),
      }),
    );

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: {
        code: "INVALID_SUBSCRIBER_SUBMISSION",
        fieldErrors: {
          anonymousToken: ["Anonymous token is required."],
          email: ["Enter a valid email address."],
          consentedToEmail: ["Email consent is required to subscribe for benchmark updates."],
        },
      },
    });
  });
});
