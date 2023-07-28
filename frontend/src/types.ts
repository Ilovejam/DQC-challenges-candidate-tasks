export type QuestionType = "number" | "text";

export interface Question {
  question_text: string;
  type: QuestionType;
  responses: number[] | string[];
}

export interface SurveyResults {
  survey_title: string;
  created_at: string;
  questions: Question[];
}
