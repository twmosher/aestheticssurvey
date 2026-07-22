import {
  isPersistenceConfigurationError,
  persistSubscriberSubmission,
} from "@/lib/persistence/supabase";
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

  let persistedSubscriber;

  try {
    persistedSubscriber = await persistSubscriberSubmission(result.data);
  } catch (error) {
    const isConfigurationError = isPersistenceConfigurationError(error);

    return Response.json(
      {
        ok: false,
        error: {
          code: isConfigurationError
            ? "SUBSCRIBER_STORAGE_NOT_CONFIGURED"
            : "SUBSCRIBER_STORAGE_FAILED",
          message: isConfigurationError
            ? "Subscriber storage is not configured yet. Add the Supabase environment variables and redeploy."
            : "We could not save your email right now. Please try again in a moment.",
        },
      },
      { status: isConfigurationError ? 503 : 500 },
    );
  }

  return Response.json({
    ok: true,
    data: {
      anonymousToken: result.data.anonymousToken,
      email: result.data.email,
      acceptedAt: persistedSubscriber.acceptedAt,
      nextPath: "/thank-you",
    },
  });
}
