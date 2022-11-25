import { SectionImg } from '@/components/Site/Components/Section-Img'
import { PinningContainer, PinningItemList } from '@/components/pinningScroll/ Pinning-Side-Scroll'
import { memberSrc } from '@/constant/memberSrc'
import styles from '@/styles/Site.module.css'
import { Heading } from '@/components/atoms/Heading'
export const Section03 = () => {
  return (
    <section className={styles.sec_member}>
      <div className={styles.sec_member_container}>
        <Heading level={2} visualLevel={1} style={{color:"#fff",position:"relative"}}>Member</Heading>
        <PinningContainer>
          {memberSrc.map((member, index) => (
            <PinningItemList key={index}>
              <SectionImg src={member.src} alt_name={member.name} width={300} height={350} />
            </PinningItemList>
          ))}
        </PinningContainer>
      </div>
    </section>
  )
}
