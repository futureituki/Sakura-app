import { FC, useEffect } from "react";
import styles from "@/components/molecules/menuBtn/Navigation/index.module.css";
import gsap from "gsap";
type Props = {
  open: boolean;
  id: string;
};

export const Navigation: FC<Props> = ({ open, id }) => {
  useEffect(() => {
    setupGsap()
  }, [open])
  const setupGsap = () => {
    if(open === true) {
      gsap.to('nav ul li', {
        opacity:1,
        y:0,
        stagger: {
          amount:1,
          from:"start",
        }
      })
    }else {
      gsap.to('nav ul li', {
        opacity:0,
        y:20,
        stagger: {
          amount:1,
          from:"start",
        }
      })
    }
  }
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