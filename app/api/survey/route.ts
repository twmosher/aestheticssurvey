import { toSurveySubmissionRecord } from "@/lib/survey/transformers";
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

  return Response.json({
    ok: true,
    data: {
      anonymousToken: submissionRecord.anonymous_token,
      acceptedAt: submissionRecord.completed_at,
      nextPath: "/survey/email",
    },
  });
}
