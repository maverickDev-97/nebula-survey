import { notFound } from "next/navigation";

import surveyData from "@/data/survey.json";
import { Button } from "@/app/components/Button/Button";

import styles from "./page.module.css";

export function generateStaticParams() {
  return Object.keys(surveyData.questions).map((id) => ({ id }));
}

export default async function SurveyPage({
  params,
}: {
  params: Promise<{ id: keyof typeof surveyData.questions }>;
}) {
  const { id } = await params;

  const question = surveyData.questions[id];

  if (!question) {
    return notFound();
  }

  return (
    <div className={styles.survey}>
      <h1 className={styles.question}>{question.question}</h1>
      <div className={styles.buttonGroup}>
        {question.options.map((option) => (
          <Button
            key={option.answer}
            label={option.answer}
            questionId={question.id}
          />
        ))}
      </div>
    </div>
  );
}
