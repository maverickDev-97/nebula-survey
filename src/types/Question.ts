import { AnswerOption } from "./AnswerOption";

export type DynamicValues = "gender" | "isParent";

export interface Question {
  id: string;
  question: string;
  answerOptions: AnswerOption[];
  dynamicValue?: DynamicValues;
}
