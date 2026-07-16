import {
  flattenSubscriberSubmissionIssues,
  subscriberSubmissionSchema,
} from "@/lib/validation/subscriber";

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          code: "INVALID_JSON",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 },
    );
  }

  const result = subscriberSubmissionSchema.safeParse(requestBody);

  if (!result.success) {
    return Response.json(
      {
        ok: false,
        error: {
          code: "INVALID_SUBSCRIBER_SUBMISSION",
          message: "Subscriber submission failed validation.",
          fieldErrors: flattenSubscriberSubmissionIssues(result.error.issues),
        },
      },
      { status: 422 },
    );
  }

  return Response.json({
    ok: true,
    data: {
      anonymousToken: result.data.anonymousToken,
      email: result.data.email,
      acceptedAt: new Date().toISOString(),
      nextPath: "/thank-you",
    },
  });
}
