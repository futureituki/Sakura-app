import { PrimaryButton } from '@/components/atoms/Button'
import styles from '@/styles/Site.module.css'
export const Section01 = () => {
  return (
    <section className={styles.sec_mv}>
      <div className={styles.mv_bg}></div>
      <div className={styles.mv_in}>
        <h1>櫻坂46</h1>
        <p className={styles.tx}>櫻坂46を応援する非公式アプリ</p>
      </div>
      <div className={styles.button_container}>
        {/* <PrimaryButton></PrimaryButton> */}
      </div>
    </section>
  )
}