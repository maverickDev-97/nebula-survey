import { FC } from "react";

import { Question, Survey } from "@/types";
import { Button } from "@/app/components/Button/Button";

import styles from "./multipleChoice.module.css";

interface MiltipleChoiceProps {
  question: Question;
  surveyId: Survey["surveyId"];
}

export const MultipleChoice: FC<MiltipleChoiceProps> = ({
  question,
  surveyId,
}) => {
  return (
    <div className={styles.buttonGroup}>
      {question.answerOptions.map((option) => (
        <Button
          key={option.answer}
          surveyId={surveyId}
          label={option.answer}
          questionId={question.id}
          nextQuestionId={option.next}
          dynamicValue={question.dynamicValue}
          showHint={question.showHint ?? false}
        />
      ))}
    </div>
  );
};
