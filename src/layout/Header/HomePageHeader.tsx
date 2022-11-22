import { Hamburger } from "@/components/molecules/menuBtn/Hamburger"
import { Navigation } from "@/components/molecules/menuBtn/Navigation";
import { useState } from "react";
import styles from '@/layout/Header/index.module.css'
export const HomePageHeader = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleHandler = () => {
    setOpen(!open);
  }
  return (
    <header className={styles.header}>
      <Hamburger 
        open={open}
        label="メニューボタン"
        onClick={toggleHandler}
      />
      <Navigation open={open} id="navigation"/>
    </header>
  )
}