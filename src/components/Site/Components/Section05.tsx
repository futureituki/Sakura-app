import { SectionImg } from '@/components/Site/Components/Section-Img'
import { Heading } from '@/components/atoms/Heading'
import { photoSrc } from '@/constant/photoSrc'
import styles from '@/styles/Site.module.css'
export const Section05 = () => {
  return (
    <section className={styles.sec_photo}>
      <Heading level={2} visualLevel={1}>
        Photo
      </Heading>
      {photoSrc.map((photo, index) => (
        <SectionImg key={index} src={photo.src} alt_name={photo.name} />
      ))}
    </section>
  )
}
