"use client";

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import { Question, Survey } from "@/types";
import { RootState } from "@/store";
import { useDynamicValues } from "@/hooks";

import styles from "./surveyQuestion.module.css";

interface SurveyQuestionProps {
  surveyId: Survey["surveyId"];
  question: Question["question"];
  questionId: Question["id"];
  hasDynamicValues: Question["hasDynamicValues"];
}

export const SurveyQuestion: FC<SurveyQuestionProps> = ({
  surveyId,
  question,
  questionId,
  hasDynamicValues = false,
}) => {
  const { replaceDynamicValues } = useDynamicValues();

  const pathname = usePathname();
  const router = useRouter();

  const { answers, isMale, isParent } = useSelector(
    (state: RootState) => state.survey
  );

  const surveyAnswers = answers[surveyId] ?? {};

  const hasPreviousAnswers = Object.keys(surveyAnswers).some(
    (answerId) => answerId < questionId
  );

  useEffect(() => {
    if (!hasPreviousAnswers && !/\bq1\b/.test(pathname)) {
      router?.push(`/survey/${surveyId}/q1`);
    }
  }, [hasPreviousAnswers, pathname, router, surveyId]);

  return (
    <h1 className={styles.question}>
      {hasDynamicValues
        ? replaceDynamicValues(question, isMale, isParent)
        : question}
    </h1>
  );
};
