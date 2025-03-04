"use client";

import { useRouter, usePathname } from "next/navigation";
import { Icons } from "../Icons/Icons";

import styles from "./header.module.css";

export const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (/\bq1\b/.test(pathname)) {
    return null;
  }

  return (
    <button className={styles.iconWrapper} onClick={() => router.back()}>
      <Icons.Back />
    </button>
  );
};
