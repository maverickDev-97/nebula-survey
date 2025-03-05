import { notFound } from "next/navigation";

import surveysData from "@/data/surveys.json";
import { SurveyQuestion } from "../../components/SurveyQuestion/SurveyQuestion";

import styles from "./page.module.css";
import { Button } from "@/app/components/Button/Button";
import { Surveys } from "@/types";

const surveys = surveysData as unknown as Surveys;

export function generateStaticParams() {
  const params: { surveyId: string; questionId: string }[] = [];

  Object.keys(surveys).forEach((surveyKey) => {
    const survey = surveys[surveyKey];

    Object.keys(survey.questions).forEach((questionKey) => {
      const question = survey.questions[questionKey];

      params.push({
        surveyId: surveyKey,
        questionId: question.id,
      });
    });
  });

  return params.map((param) => ({
    params: {
      surveyId: param.surveyId,
      questionId: param.questionId,
    },
  }));
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string; questionId: string }>;
}) {
  const { questionId, surveyId } = await params;

  const surveys = surveysData as unknown as Surveys;
  const question = surveys[surveyId]?.questions[questionId];

  if (!question) {
    return notFound();
  }

  return (
    <div className={styles.survey}>
      <SurveyQuestion
        surveyId={surveyId}
        question={question.question}
        questionId={question.id}
        hasDynamicValues={question.hasDynamicValues ?? false}
      />
      <div className={styles.buttonGroup}>
        {question.answerOptions.map((option) => (
          <Button
            key={option.answer}
            surveyId={surveyId}
            label={option.answer}
            questionId={question.id}
            nextQuestionId={option.next}
            dynamicValue={question.dynamicValue}
            showHint={question.showHint ?? false}
          />
        ))}
      </div>
    </div>
  );
}
