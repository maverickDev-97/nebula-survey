"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/store";
import { useDynamicValues } from "@/hooks";

import surveyData from "@/data/survey.json";

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
    <div>
      {Object.entries(answers).map(([questionId, answer]) => {
        return (
          <div key={questionId}>
            <strong>
              {replaceDynamicValues(
                surveyData.questions[
                  questionId as keyof typeof surveyData.questions
                ].question,
                isMale,
                isParent
              )}
            </strong>
            <div>{answer}</div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
