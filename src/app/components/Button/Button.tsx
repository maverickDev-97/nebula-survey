"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import styles from "./button.module.css";
import { useDispatch } from "react-redux";
import {
  saveAnswer,
  setIsMale,
  setIsParent,
} from "@/store/reducers/surveySlice";
import { DynamicValues } from "@/types";

interface ButtonProps {
  label: string;
  questionId: string;
  nextQuestionId?: string;
  dynamicValue?: DynamicValues;
}

const Button: FC<ButtonProps> = ({
  label,
  questionId,
  nextQuestionId,
  dynamicValue,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick = () => {
    if (dynamicValue?.toLowerCase() === "gender") {
      dispatch(setIsMale(label.toLowerCase() === "male"));
    }
    if (dynamicValue?.toLowerCase() === "isparent") {
      dispatch(setIsParent(label.toLowerCase() === "yes"));
    }

    dispatch(saveAnswer({ questionId, answer: label }));

    if (nextQuestionId) {
      router.push(`/survey/${nextQuestionId}`);
    } else {
      router.push("/survey/results");
    }
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export { Button };
