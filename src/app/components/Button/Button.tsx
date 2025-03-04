"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import styles from "./button.module.css";

interface ButtonProps {
  label: string;
  questionId: string;
  nextQuestionId?: string;
}

const Button: FC<ButtonProps> = ({ label, questionId, nextQuestionId }) => {
  const router = useRouter();

  const onClick = () => {
    if (nextQuestionId) {
      router.push(`/survey/${nextQuestionId}`);
    } else {
      router.push("/survey/results");
    }
  };

  return (
    <button
      className={styles.button}
      onClick={() => {
        console.log(`The answer for the question ${questionId} is: ${label}`);
        onClick();
      }}
    >
      {label}
    </button>
  );
};

export { Button };
