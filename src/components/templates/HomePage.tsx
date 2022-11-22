import { useState } from "react";
import { Section01 } from "../Site/Components/Section01";
import { Section04 } from "../Site/Components/Section04";
import { SwiperContainer } from "../swiper/SwiperAnimation";

export const HomePage = () => {
  return (
    <div>
        <Section01/>
        <Section04/>
    </div>
  )
}