import { AnswerOption } from "./AnswerOption";
import { DynamicValue } from "./DynamicValue";

export interface Question {
  id: string;
  question: string;
  answerOptions: AnswerOption[];
  dynamicValue: DynamicValue;
  hasDynamicValues: boolean;
  showHint?: boolean;
}
