import { PrimaryButton } from "@/components/atoms/Button"
import { FC } from "react"
import styles from '@/components/molecules/InductionButtons/index.module.css'
type Props = {
  logoutHandle:() => void
  handle:() => void
}
export const InductionButtons:FC<Props> = ({logoutHandle, handle}) => {
  return (
    <div className={styles.buttons}>
      <PrimaryButton label="logout" variant="contained" color="#fff" background="#E60012" onClick={logoutHandle}>
        ログアウト
      </PrimaryButton>
      <PrimaryButton label="logout" variant="contained" color="#fff" background="#ff69b8" onClick={handle}>
        マイページ
      </PrimaryButton>
    </div>
  )
}