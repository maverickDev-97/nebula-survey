import { AnswerOption } from "./AnswerOption";
import { DynamicValue } from "./DynamicValue";
import { ScreenType } from "./ScreenType";

export interface Question {
  id: string;
  question: string;
  answerOptions: AnswerOption[];
  dynamicValue: DynamicValue;
  hasDynamicValues: boolean;
  showHint?: boolean;
  screenType: ScreenType;
  next?: string;
}
