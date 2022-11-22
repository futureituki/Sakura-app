import { FC } from "react";
import styles from "@/components/molecules/menuBtn/Navigation/index.module.css";

type Props = {
  open: boolean;
  id: string;
};

export const Navigation: FC<Props> = ({ open, id }) => {
  return (
    <nav id={id} aria-hidden={!open} className={styles.navigation}>
      <ul>
        <li>Login</li>
        <li>SignUp</li>
        <li>Contents</li>
        <li>Music List</li>
      </ul>
    </nav>
  );
};