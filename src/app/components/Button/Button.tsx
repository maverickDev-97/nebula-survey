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
  questionId: string;
  nextQuestionId?: string;
  dynamicValue?: DynamicValue;
  showHint?: boolean;
  skipSaving?: boolean;
}

const Button: FC<ButtonProps> = ({
  label,
  questionId,
  nextQuestionId,
  dynamicValue,
  showHint,
  skipSaving,
}) => {
  const router = useRouter();
  const { setDynamicValue } = useDynamicValues();
  const dispatch = useDispatch();

  const onClick = () => {
    if (showHint) {
      router.push(`/survey/hint?next=${nextQuestionId}`);
      return;
    }

    if (!skipSaving) {
      dispatch(saveAnswer({ questionId, answer: label }));
    }

    if (dynamicValue) {
      setDynamicValue(dynamicValue, label);
    }

    if (nextQuestionId) {
      router.push(`/survey/${nextQuestionId}`);
    } else {
      router.push("/survey/results");
    }
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export { Button };
