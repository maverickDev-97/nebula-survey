"use client";

import { useRouter } from "next/navigation";
import { Icons } from "../Icons/Icons";

import styles from "./header.module.css";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button className={styles.iconWrapper} onClick={() => router.back()}>
      <Icons.Back />
    </button>
  );
};
