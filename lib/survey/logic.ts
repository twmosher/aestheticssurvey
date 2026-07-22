import { SURVEY_QUESTIONS } from "@/lib/survey/questions";
import type {
  SurveyAnswers,
  SurveyQuestion,
  SurveyQuestionId,
  SurveyQuestionOptionValue,
} from "@/lib/survey/types";

function createSurveyQuestionLookup(): Readonly<Record<SurveyQuestionId, SurveyQuestion>> {
  return Object.fromEntries(
    SURVEY_QUESTIONS.map((question) => [question.id, question] as const),
  ) as Readonly<Record<SurveyQuestionId, SurveyQuestion>>;
}

const SURVEY_QUESTION_LOOKUP = createSurveyQuestionLookup();

export const SURVEY_MAX_STEP_INDEX = Math.max(SURVEY_QUESTIONS.length - 1, 0);

export function getSurveyQuestion<TId extends SurveyQuestionId>(id: TId): SurveyQuestion<TId> {
  return SURVEY_QUESTION_LOOKUP[id] as SurveyQuestion<TId>;
}

export function getSurveyQuestionOptionValues<TId extends SurveyQuestionId>(
  id: TId,
): readonly SurveyQuestionOptionValue<TId>[] {
  const question = getSurveyQuestion(id) as SurveyQuestion<TId>;

  return question.options?.map((option) => option.value) ?? [];
}

export function isSurveyQuestionVisible(
  question: SurveyQuestion,
  answers: SurveyAnswers,
): boolean {
  return question.visibleWhen ? question.visibleWhen(answers) : true;
}

export function getVisibleSurveyQuestions(answers: SurveyAnswers): SurveyQuestion[] {
  return SURVEY_QUESTIONS.filter((question) => isSurveyQuestionVisible(question, answers));
}
