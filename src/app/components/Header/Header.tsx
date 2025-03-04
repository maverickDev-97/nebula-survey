import Image from "next/image";

import { BackButton } from "./BackButton";

import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <BackButton />
      <Image width={24} height={24} alt="Nebula logo" src="/logo_black.png" />
    </header>
  );
};

export { Header };
