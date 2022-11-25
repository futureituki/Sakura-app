import { SectionImg } from '@/components/Site/Components/Section-Img'
import { Heading } from '@/components/atoms/Heading'
// import { PinningContainer, PinningItemList } from '@/components/pinningScroll/pinningsidescroll'
import { memberSrc } from '@/constant/memberSrc'
import styles from '@/styles/Site.module.css'

export const Section03 = () => {
  return (
    <section className={styles.sec_member}>
      <div className={styles.sec_member_container}>
        <Heading level={2} visualLevel={1} style={{ color: '#fff', position: 'relative' }}>
          Member
        </Heading>
        {/* <PinningContainer>
          {memberSrc.map((member, index) => (
            <PinningItemList key={index}>
              <SectionImg src={member.src} alt_name={member.name} width={400} height={450} />
              <p style={{ color: '#fff', marginTop: '20px', fontSize: '1.6rem' }}>{member.name}</p>
            </PinningItemList>
          ))}
        </PinningContainer> */}
      </div>
    </section>
  )
}
