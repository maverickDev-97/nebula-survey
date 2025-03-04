"use client";

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import { Question } from "@/types";
import { RootState } from "@/store";
import { useDynamicValues } from "@/hooks";

import styles from "./surveyQuestion.module.css";

interface SurveyQuestionProps {
  question: Question["question"];
  questionId: Question["id"];
  hasDynamicValues: Question["hasDynamicValues"];
}

export const SurveyQuestion: FC<SurveyQuestionProps> = ({
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

  const hasPreviousAnswers = Object.keys(answers).some(
    (answerId) => answerId < questionId
  );

  useEffect(() => {
    if (!hasPreviousAnswers && !/\bq1\b/.test(pathname)) {
      router?.push("/survey/q1");
    }
  }, [hasPreviousAnswers, pathname, router]);

  return (
    <h1 className={styles.question}>
      {hasDynamicValues
        ? replaceDynamicValues(question, isMale, isParent)
        : question}
    </h1>
  );
};
