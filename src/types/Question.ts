import { AnswerOption } from "./AnswerOption";

export interface Question {
  id: string;
  question: string;
  answerOptions: AnswerOption[];
}
