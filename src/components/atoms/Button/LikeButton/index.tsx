import { useState } from 'react'
import styles from '@/components/atoms/Button/LikeButton/index.module.css'

export const LikeButton = () => {
  const [active, setActive] = useState<boolean>(false)

  const toggleButton = () => {
    setActive(!active)
  }
  return (
    <svg
      onClick={toggleButton}
      className={active ? `${(styles.likeButton, styles.clicked)}` : `${styles.likeButton}`}
      width='150px'
      height='150px'
      viewBox='0 0 500 500'
    >
      <circle
        className={active ? `${styles.clickExplosion}` : `${styles.explosion}`}
        r='150'
        cx='250'
        cy='250'
      ></circle>
      <g className={active ? `${styles.clickParticleLayer}` : `${styles.particleLayer}`}>
        <circle fill='#8CE8C3' cx='130' cy='126.5' r='12.5' />
        <circle fill='#8CE8C3' cx='411' cy='313.5' r='12.5' />
        <circle fill='#91D2FA' cx='279' cy='86.5' r='12.5' />
        <circle fill='#91D2FA' cx='155' cy='390.5' r='12.5' />
        <circle fill='#CC8EF5' cx='89' cy='292.5' r='10.5' />
        <circle fill='#9BDFBA' cx='414' cy='282.5' r='10.5' />
        <circle fill='#9BDFBA' cx='115' cy='149.5' r='10.5' />
        <circle fill='#9FC7FA' cx='250' cy='80.5' r='10.5' />
        <circle fill='#9FC7FA' cx='78' cy='261.5' r='10.5' />
        <circle fill='#96D8E9' cx='182' cy='402.5' r='10.5' />
        <circle fill='#CC8EF5' cx='401.5' cy='166' r='13' />
        <circle fill='#DB92D0' cx='379' cy='141.5' r='10.5' />
        <circle fill='#DB92D0' cx='327' cy='397.5' r='10.5' />
        <circle fill='#DD99B8' cx='296' cy='392.5' r='10.5' />
      </g>
      <path
        className={active ? `${styles.clickHeart}` : `${styles.heart}`}
        d='M250,187.4c-31.8-47.8-95.5-19.8-95.5,32.2c0,35.2,31.8,60.3,55.7,79.2c24.9,19.7,31.8,23.9,39.8,31.8 c7.9-7.9,14.6-12.6,39.8-31.8c24.3-18.5,55.7-44.4,55.7-79.6C345.5,167.6,281.8,139.7,250,187.4z'
      />
    </svg>
  )
}
export const LikedButton = () => {
  const [active, setActive] = useState<boolean>(false)

  const toggleButton = () => {
    setActive(!active)
  }
  return (
    <svg
      onClick={toggleButton}
      className={styles.clicked2}
      width='150px'
      height='150px'
      viewBox='0 0 500 500'
    >
      <circle className={styles.clickExplosion2} r='150' cx='250' cy='250'></circle>
      <g className={styles.clickParticleLayer2}>
        <circle fill='#8CE8C3' cx='130' cy='126.5' r='12.5' />
        <circle fill='#8CE8C3' cx='411' cy='313.5' r='12.5' />
        <circle fill='#91D2FA' cx='279' cy='86.5' r='12.5' />
        <circle fill='#91D2FA' cx='155' cy='390.5' r='12.5' />
        <circle fill='#CC8EF5' cx='89' cy='292.5' r='10.5' />
        <circle fill='#9BDFBA' cx='414' cy='282.5' r='10.5' />
        <circle fill='#9BDFBA' cx='115' cy='149.5' r='10.5' />
        <circle fill='#9FC7FA' cx='250' cy='80.5' r='10.5' />
        <circle fill='#9FC7FA' cx='78' cy='261.5' r='10.5' />
        <circle fill='#96D8E9' cx='182' cy='402.5' r='10.5' />
        <circle fill='#CC8EF5' cx='401.5' cy='166' r='13' />
        <circle fill='#DB92D0' cx='379' cy='141.5' r='10.5' />
        <circle fill='#DB92D0' cx='327' cy='397.5' r='10.5' />
        <circle fill='#DD99B8' cx='296' cy='392.5' r='10.5' />
      </g>
      <path
        className={styles.clickHeart2}
        d='M250,187.4c-31.8-47.8-95.5-19.8-95.5,32.2c0,35.2,31.8,60.3,55.7,79.2c24.9,19.7,31.8,23.9,39.8,31.8 c7.9-7.9,14.6-12.6,39.8-31.8c24.3-18.5,55.7-44.4,55.7-79.6C345.5,167.6,281.8,139.7,250,187.4z'
      />
    </svg>
  )
}
