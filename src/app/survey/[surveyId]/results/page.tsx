"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";

import { RootState } from "@/store";
import { useDynamicValues } from "@/hooks";
import { resetSurvey } from "@/store/reducers/surveySlice";
import { Button } from "@/app/components/Button/Button";

import surveysData from "@/data/surveys.json";

import styles from "./page.module.css";
import { Surveys } from "@/types";

const surveys = surveysData as unknown as Surveys;

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const surveyId = params.surveyId as string;

  const dispatch = useDispatch();
  const { answers, isMale, isParent } = useSelector(
    (state: RootState) => state.survey
  );
  const surveyAnswers = useMemo(
    () => answers[surveyId] ?? {},
    [answers, surveyId]
  );

  const { replaceDynamicValues } = useDynamicValues();

  useEffect(() => {
    if (Object.keys(surveyAnswers).length === 0) {
      router.push(`/survey/${surveyId}/q1`);
    }
  }, [router, surveyAnswers, surveyId]);

  return (
    <div className={styles.page}>
      {Object.entries(surveyAnswers).map(([questionId, answer]) => {
        return (
          <div className={styles.answerWrapper} key={questionId}>
            <p className={styles.question}>
              {replaceDynamicValues(
                surveys[surveyId].questions[questionId].question,
                isMale,
                isParent
              )}
            </p>
            <h3 className={styles.answer}>{answer}</h3>
          </div>
        );
      })}
      <div className={styles.buttonWrapper}>
        <Button
          label="Reset survey"
          questionId=""
          customOnClick={() => {
            dispatch(resetSurvey(surveyId));
            router.push(`/survey/${surveyId}/q1`);
          }}
          surveyId={surveyId}
        />
      </div>
    </div>
  );
}
