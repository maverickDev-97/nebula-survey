import { notFound } from "next/navigation";

import { SurveyQuestion } from "../../components/SurveyQuestion/SurveyQuestion";
import { Input, MultipleChoice } from "../../components/ScreenTypes";
import { ScreenType, Surveys } from "@/types";

import surveysData from "@/data/surveys.json";

import styles from "./page.module.css";

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
      {question.screenType === ScreenType.MULTIPLE_CHOICE && (
        <MultipleChoice question={question} surveyId={surveyId} />
      )}
      {question.screenType === ScreenType.INPUT && (
        <Input
          questionId={questionId}
          surveyId={surveyId}
          nextQuestionId={question.next}
        />
      )}
    </div>
  );
}
