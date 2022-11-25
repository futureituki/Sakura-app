import { SectionImg } from "@/components/Site/Components/Section-Img"
import { photoSrc } from '@/constant/photoSrc'
import styles from '@/styles/Site.module.css'
export const Section05 = () => {
  return (
    <section className={styles.sec_photo}>
      {photoSrc.map((photo,index) => (
        <SectionImg key={index} src={photo.src} alt_name={photo.name} width={350} height={250}/>
      ))}
    </section>
  )
}