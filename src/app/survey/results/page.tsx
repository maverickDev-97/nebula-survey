"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/store";
import { useDynamicValues } from "@/hooks";

import surveyData from "@/data/survey.json";

import styles from "./page.module.css";

export default function ResultsPage() {
  const router = useRouter();

  const { replaceDynamicValues } = useDynamicValues();

  const { answers, isMale, isParent } = useSelector(
    (state: RootState) => state.survey
  );

  useEffect(() => {
    if (!Object.keys(answers).length) {
      router.push("/survey/q1");
    }
  }, [router, answers]);

  return (
    <div className={styles.page}>
      {Object.entries(answers).map(([questionId, answer]) => {
        return (
          <div className={styles.answerWrapper} key={questionId}>
            <p className={styles.question}>
              {replaceDynamicValues(
                surveyData.questions[
                  questionId as keyof typeof surveyData.questions
                ].question,
                isMale,
                isParent
              )}
            </p>
            <h3 className={styles.answer}>{answer}</h3>
          </div>
        );
      })}
    </div>
  );
}
