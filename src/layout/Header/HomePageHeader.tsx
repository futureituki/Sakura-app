import { Hamburger } from "@/components/molecules/menuBtn/Hamburger"
import { Navigation } from "@/components/molecules/menuBtn/Navigation";
import { useEffect, useState } from "react";
import styles from '@/layout/Header/index.module.css'
import gsap from "gsap";
export const HomePageHeader = () => {
  useEffect(() => {
    setUpGsap();
  },[])
  const setUpGsap = () => {
    gsap.to('header', {
      opacity:1,
      y:10,
      delay:5,
    })
  }
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