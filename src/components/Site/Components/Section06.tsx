import { FaTiktok,FaTwitter,FaYoutube } from 'react-icons/fa'
import { Heading } from '@/components/atoms/Heading'
import styles from '@/styles/Site.module.css'
import Link from 'next/link'

export const Section06 = () => {
  return (
    <section className={styles.sec_sn}>
        <Heading visualLevel={2} level={2}>
          SNS
        </Heading>
      <div className={styles.sns}>
        <div className={styles.sns_tx}>
          <FaTwitter/>
          <Link href="https://twitter.com/sakurazaka46">
              <span>Twitter</span>
          </Link>
        </div>
        <div className={styles.sns_tx}>
          <FaYoutube/>
          <Link href="https://www.youtube.com/channel/UCmr9bYmymcBmQ1p2tLBRvwg">
              <span>Youtube</span>
          </Link>
        </div>
        <div className={styles.sns_tx}>
          <FaTiktok/>
          <Link href="https://www.tiktok.com/@sakurazaka46.officialtk">
              <span>TikTok</span>
          </Link>
        </div>
      </div>
    </section>
  )
}