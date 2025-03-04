"use client";

import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

import styles from "./surveyQuestion.module.css";
import { Question } from "@/types";

interface SurveyQuestionProps {
  question: Question["question"];
}

export const SurveyQuestion: FC<SurveyQuestionProps> = ({ question }) => {
  const { answers } = useSelector((state: RootState) => state.survey);

  console.log(answers);
  return <h1 className={styles.question}>{question}</h1>;
};
