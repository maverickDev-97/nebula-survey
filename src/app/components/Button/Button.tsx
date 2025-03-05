"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import styles from "./button.module.css";
import { useDispatch } from "react-redux";
import { saveAnswer } from "@/store/reducers/surveySlice";
import { DynamicValue } from "@/types";
import { useDynamicValues } from "@/hooks";

interface ButtonProps {
  label: string;
  surveyId: string;
  questionId: string;
  nextQuestionId?: string;
  dynamicValue?: DynamicValue;
  showHint?: boolean;
  skipSaving?: boolean;
  customOnClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  label,
  surveyId,
  questionId,
  nextQuestionId,
  dynamicValue,
  showHint,
  skipSaving,
  customOnClick,
}) => {
  const router = useRouter();
  const { setDynamicValue } = useDynamicValues();
  const dispatch = useDispatch();

  const onClick = () => {
    if (customOnClick) {
      return customOnClick();
    }

    if (showHint) {
      router.push(
        `/survey/hint?surveyId=${surveyId}&nextQuestionId=${nextQuestionId}`
      );
      return;
    }

    if (!skipSaving) {
      dispatch(saveAnswer({ surveyId, questionId, answer: label }));
    }

    if (dynamicValue) {
      setDynamicValue(dynamicValue, label);
    }

    if (nextQuestionId) {
      router.push(`/survey/${surveyId}/${nextQuestionId}`);
    } else {
      router.push(`/survey/${surveyId}/results`);
    }
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export { Button };
