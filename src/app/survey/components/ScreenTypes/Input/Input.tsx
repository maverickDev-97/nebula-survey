"use client";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { saveAnswer } from "@/store/reducers/surveySlice";
import { RootState } from "@/store";

import styles from "./input.module.css";

interface InputProps {
  surveyId: string;
  questionId: string;
  nextQuestionId?: string;
}

export const Input: FC<InputProps> = ({
  questionId,
  surveyId,
  nextQuestionId,
}) => {
  const router = useRouter();

  const { answers } = useSelector((state: RootState) => state.survey);
  const surveyAnswers = answers[surveyId];
  const currentAnswer = surveyAnswers?.[questionId] ?? "";

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>(
    surveyAnswers?.questionId ?? ""
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      dispatch(saveAnswer({ surveyId, questionId, answer: newValue }));
    },
    [dispatch, surveyId, questionId]
  );

  const handleBlur = useCallback(() => {
    if (!currentAnswer) return;

    if (nextQuestionId) {
      router.push(`/survey/${surveyId}/${nextQuestionId}`);
    } else {
      router.push(`/survey/${surveyId}/results`);
    }
  }, [currentAnswer, router, surveyId, nextQuestionId]);

  useEffect(() => {
    if (answers[surveyId]) {
      setInputValue(answers[surveyId][questionId]);
    }
  }, [answers, surveyId, questionId]);

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Type your answer here:"
      value={inputValue ?? ""}
      onChange={handleInputChange}
      onBlur={handleBlur}
    />
  );
};
