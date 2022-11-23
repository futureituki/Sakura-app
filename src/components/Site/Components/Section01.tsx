import { PrimaryButton } from '@/components/atoms/Button'
import styles from '@/styles/Site.module.css'
import '@/components/Site/Components/section.module.css'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { LegacyRef, RefObject, useEffect, useRef } from 'react'
import { devNull } from 'os';
gsap.registerPlugin(ScrollTrigger)
export const Section01 = () => {
  const textRef = useRef<HTMLHeadingElement>(null)
  const textRef2 = useRef<HTMLHeadingElement>(null)
  const tl = gsap.timeline();
  let jsText:HTMLHeadingElement;
  let jsText2:HTMLHeadingElement;
  useEffect(() => {
    if(textRef.current && textRef2.current){
          jsText = textRef.current
          jsText2 = textRef2.current
          let newText = ''
          let newText2 = ''
          const text =  jsText.textContent
          const text2 = jsText2.textContent
          const result =  text.split('')
          const result2 = text2.split('')
          for (let i = 0; i < result.length; i++) {
              newText += "<span style='opacity:0'>" + result[i] + '</span>'
            }
          for (let i = 0; i < result2.length; i++) {
              newText2 += "<span style='opacity:0'>" + result2[i] + '</span>'
            }
          jsText.innerHTML = newText
          jsText2.innerHTML = newText2
      }
      tl.to(
        '#opening-title span', {
          opacity:1,
          y:0,
          stagger: {
            amount:1,
            from:"start",
          }
        },
        1
      ).to(
        '#opening-sub span', {
          opacity:1,
          y:0,
          stagger: {
            amount:1,
            from:"start",
          },
        },
        3
      ).to(
        '#top_curtain', {
          y:-1000,
          stagger: {
            amount:1,
            from:"start",
          },
        }
      ).to(
        '#bottom_curtain', {
          y:1000,
          stagger: {
            amount:1,
            from:"start",
          },
        }
      )
    setupGsap()
  }, [])
  const setupGsap = () => {
    gsap.to('main', {
      scrollTrigger: {
        trigger: '#overlay-on',
        start: 'end bottom',
        scrub: true, 
        onEnter: () => gsap.to('.fadeout', {
          opacity: 0,
          y:-30,
          duration: .9
        }),
        onLeave: () => gsap.to('.fadeout', {
          opacity: 1,
          y:0,
          duration: .9
        }),
        onEnterBack: () => gsap.to('.fadeout', {
          opacity: 0,
          y:-30,
          duration: .9
        }),
        onLeaveBack: () => gsap.to('.fadeout', {
          opacity: 1,
          y:0,
          duration: .9
        }),
      },
    })
  }
  return (
    <section className={styles.sec_mv} id="sec_mv">
      <div className={styles.top_loader_bg} id="top_curtain"></div>
      <div className={styles.bottom_loader_bg} id="bottom_curtain"></div>
      <div className={styles.mv_bg}>
      <video className="mainPath" id="bg-video-start" loop autoPlay muted src="/main.mp4" style={{opacity: 1}}></video>
      </div>
      <div className={styles.mv_in}>
        <div className={`fadeout ${styles.mv_case}`}>
          <h1 ref={textRef} id="opening-title">櫻坂46</h1>
          <h2  ref={textRef2} className={styles.tx} id="opening-sub">櫻坂46を応援する非公式アプリ</h2>
        </div>
      </div>
      <div className={styles.button_container}>
        {/* <PrimaryButton></PrimaryButton> */}
      </div>
    </section>
  )
}