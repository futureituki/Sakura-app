import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import React, { useEffect, useRef, useState } from "react";
import { Section01 } from "../Site/Components/Section01";
import { Section02 } from "../Site/Components/Section02";
import { Section04 } from "../Site/Components/Section04";
import { SwiperContainer } from "../swiper/SwiperAnimation";
gsap.registerPlugin(ScrollTrigger)
export const HomePage = () => {
  return (
    <div>
        <main style={{background:"#000"}}>
        <Section01/>
        <Section02/>
          <div id="horizontal-scroll-section">
          <Section04/>
          </div>
        </main>
    </div>
  )
}