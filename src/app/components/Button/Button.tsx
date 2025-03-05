"use client";

import { FC, useCallback } from "react";
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

  const handleNavigation = useCallback(() => {
    if (showHint && nextQuestionId) {
      const params = new URLSearchParams({
        surveyId,
        nextQuestionId,
      });
      router.push(`/survey/hint?${params.toString()}`);
      return;
    }

    if (nextQuestionId) {
      router.push(`/survey/${surveyId}/${nextQuestionId}`);
    } else {
      router.push(`/survey/${surveyId}/results`);
    }
  }, [router, surveyId, nextQuestionId, showHint]);

  const handleSaveAnswer = useCallback(() => {
    if (!skipSaving) {
      dispatch(saveAnswer({ surveyId, questionId, answer: label }));
    }
  }, [dispatch, surveyId, questionId, label, skipSaving]);

  const handleDynamicValue = useCallback(() => {
    if (dynamicValue) {
      setDynamicValue(dynamicValue, label);
    }
  }, [setDynamicValue, dynamicValue, label]);

  const onClick = useCallback(() => {
    if (customOnClick) {
      customOnClick();
      return;
    }

    handleSaveAnswer();
    handleDynamicValue();
    handleNavigation();
  }, [customOnClick, handleSaveAnswer, handleDynamicValue, handleNavigation]);

  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export { Button };
