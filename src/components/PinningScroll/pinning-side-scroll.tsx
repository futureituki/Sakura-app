import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import React, { FC, useEffect, useRef } from 'react'
import styles from '@/components/PinningScroll/index.module.css'
type ContainerProps = {
  children: React.ReactNode
}
gsap.registerPlugin(ScrollTrigger)
export const PinningContainer: FC<ContainerProps> = ({ children }) => {
  const listRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const didEffect = useRef(false)
  useEffect(() => {
    if (didEffect.current) return
    didEffect.current = true
    if (listRef.current && wrapperRef.current) {
      setUpGsap()
    }
  }, [])
  const setUpGsap = () => {
    if (listRef.current && wrapperRef.current) {
      let list_current = listRef.current
      let wrapper_current = wrapperRef.current
      gsap.to('#list', {
        x: () => -(list_current.clientWidth - wrapper_current.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '#list-wrapper',
          start: 'top top',
          end: () => `+=${list_current.clientWidth - wrapper_current.clientWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }
  }
  return (
    <div ref={wrapperRef} className={styles.slide_scroll_list_wrapper} id='list-wrapper'>
      <ul className={styles.slide_scroll_list} ref={listRef} id='list'>
        {children}
      </ul>
    </div>
  )
}

type PinningItemProps = {
  children: React.ReactNode
}
export const PinningItemList: FC<PinningItemProps> = ({ children }) => {
  return <li className={styles.slide_scroll_item}>{children}</li>
}
