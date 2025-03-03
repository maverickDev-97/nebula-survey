"use client";

import { FC } from "react";

import styles from "./button.module.css";

interface ButtonProps {
  label: string;
  questionId: string;
}

const Button: FC<ButtonProps> = ({ label, questionId }) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        console.log(`The answer for the question ${questionId} is: ${label}`);
      }}
    >
      {label}
    </button>
  );
};

export { Button };
