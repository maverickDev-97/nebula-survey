"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/app/components/Button/Button";

import styles from "./page.module.css";

function HintContent() {
  const searchParams = useSearchParams();
  const surveyId = searchParams.get("surveyId") ?? "";
  const nextQuestionId = searchParams.get("nextQuestionId") ?? "";

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>So how does it work?</h1>
      <p className={styles.text}>
        We analyze hundreds of data points to create your unique astrological
        blueprint. This is combined with AI to tailor-make your astrological
        insights, based on your answers. We’re going to change your relationship
        with astrology.
      </p>
      <Button
        label="Next"
        surveyId={surveyId}
        questionId=""
        nextQuestionId={nextQuestionId}
        skipSaving
      />
    </div>
  );
}

export default function HintPage() {
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.setProperty("--text-color", "#ffffff");

    return () => {
      document.body.style.background = "";
      document.body.style.minHeight = "";
      document.documentElement.style.setProperty("--text-color", "#333333");
    };
  }, []);

  return (
    <Suspense>
      <HintContent />
    </Suspense>
  );
}
