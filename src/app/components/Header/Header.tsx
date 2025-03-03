import Image from "next/image";

import styles from "./header.module.css";
import { Icons } from "../Icons/Icons";

const Header = () => {
  return (
    <header className={styles.header}>
      <button className={styles.iconWrapper}>
        <Icons.Back />
      </button>
      <Image width={24} height={24} alt="Nebula logo" src="/logo_black.png" />
    </header>
  );
};

export { Header };
