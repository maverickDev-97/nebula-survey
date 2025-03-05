import { Question } from "./Question";

export interface Survey {
  surveyId: string;
  title: string;
  questions: Record<string, Question>;
}
