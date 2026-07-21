import { toSurveySubmissionRecord } from "@/lib/survey/transformers";
import {
  isPersistenceConfigurationError,
  persistSurveySubmission,
} from "@/lib/persistence/supabase";
import {
  flattenSurveySubmissionIssues,
  surveySubmissionSchema,
} from "@/lib/validation/survey";

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

  const result = surveySubmissionSchema.safeParse(requestBody);

  if (!result.success) {
    return Response.json(
      {
        ok: false,
        error: {
          code: "INVALID_SURVEY_SUBMISSION",
          message: "Survey submission failed validation.",
          fieldErrors: flattenSurveySubmissionIssues(result.error.issues),
        },
      },
      { status: 422 },
    );
  }

  const submissionRecord = toSurveySubmissionRecord(result.data, {
    userAgent: request.headers.get("user-agent"),
  });

  try {
    await persistSurveySubmission(result.data, submissionRecord);
  } catch (error) {
    const isConfigurationError = isPersistenceConfigurationError(error);

    return Response.json(
      {
        ok: false,
        error: {
          code: isConfigurationError ? "SURVEY_STORAGE_NOT_CONFIGURED" : "SURVEY_STORAGE_FAILED",
          message: isConfigurationError
            ? "Survey storage is not configured yet. Add the Supabase environment variables and redeploy."
            : "We could not save your anonymous response right now. Please try again in a moment.",
        },
      },
      { status: isConfigurationError ? 503 : 500 },
    );
  }

  return Response.json({
    ok: true,
    data: {
      anonymousToken: submissionRecord.anonymous_token,
      acceptedAt: submissionRecord.completed_at,
      nextPath: "/survey/email",
    },
  });
}
