// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EmailCaptureForm } from "@/components/survey/email-capture-form";
import { createEmptySurveyDraft } from "@/lib/survey/defaults";
import { SURVEY_DRAFT_STORAGE_KEY } from "@/lib/survey/storage";

const pushMock = vi.fn();
const routerMock = {
  push: pushMock,
};

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

describe("EmailCaptureForm", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushMock.mockReset();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("does not block submission when first name is left blank", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          data: {
            nextPath: "/thank-you",
          },
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );

    window.localStorage.setItem(
      SURVEY_DRAFT_STORAGE_KEY,
      JSON.stringify(
        createEmptySurveyDraft({
          anonymousToken: "anon_email_1",
          hasSubmittedSurvey: true,
        }),
      ),
    );

    render(<EmailCaptureForm />);

    fireEvent.change(await screen.findByLabelText("Email address"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send My Benchmark" }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "/api/subscribers",
        expect.objectContaining({
          method: "POST",
          headers: { "content-type": "application/json" },
          body: expect.any(String),
        }),
      );
    });

    const [, requestInit] = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(JSON.parse(String(requestInit?.body))).toMatchObject({
      anonymousToken: "anon_email_1",
      email: "alex@example.com",
      firstName: "",
      consentedToEmail: true,
    });

    expect(screen.queryByText("First name is required.")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/thank-you");
    });
  });
});
