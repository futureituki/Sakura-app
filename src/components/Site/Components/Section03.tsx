import { PinningContainer, PinningItemList } from '@/components/PinningScroll/Pinning-Side-Scroll'
import { SectionImg } from '@/components/Site/Components/Section-Img'
import { Heading } from '@/components/atoms/Heading'
import { firstMemberSrc, memberSrc, secondMemberSrc, thirdMemberSrc } from '@/constant/memberSrc'
import styles from '@/styles/Site.module.css'
import { MemberObj } from '@/types/constant/member'

export const Section03 = () => {
  return (
    <section className={styles.sec_member}>
      <div className={styles.sec_member_container}>
        <Heading
          level={2}
          visualLevel={1}
          style={{ color: '#fff', position: 'relative', fontSize: '5vw' }}
        >
          Member
        </Heading>
        <Heading
          level={2}
          visualLevel={1}
          style={{ color: '#fff', position: 'relative', fontSize: '4vw' }}
        >
          一期生
        </Heading>
        <PinningContainer parent_id='first-member' child_id='first'>
          {firstMemberSrc.map((member: MemberObj, index: number) => (
            <PinningItemList key={index}>
              <SectionImg src={member.src} alt_name={member.name} width={280} height={350} />
              <p style={{ color: '#fff', marginTop: '20px', fontSize: '1.6rem' }}>{member.name}</p>
            </PinningItemList>
          ))}
        </PinningContainer>
        <Heading
          level={2}
          visualLevel={1}
          style={{ color: '#fff', position: 'relative', fontSize: '4vw' }}
        >
          二期生
        </Heading>
        <PinningContainer parent_id='second-member' child_id='second'>
          {secondMemberSrc.map((member: MemberObj, index: number) => (
            <PinningItemList key={index}>
              <SectionImg src={member.src} alt_name={member.name} width={280} height={350} />
              <p style={{ color: '#fff', marginTop: '20px', fontSize: '1.6rem' }}>{member.name}</p>
            </PinningItemList>
          ))}
        </PinningContainer>
        <Heading
          level={2}
          visualLevel={1}
          style={{ color: '#fff', position: 'relative', fontSize: '4vw' }}
        >
          三期生
        </Heading>
        <PinningContainer parent_id='third-member' child_id='third'>
          {thirdMemberSrc.map((member: MemberObj, index: number) => (
            <PinningItemList key={index}>
              <SectionImg src={member.src} alt_name={member.name} width={280} height={350} />
              <p style={{ color: '#fff', marginTop: '20px', fontSize: '1.6rem' }}>{member.name}</p>
            </PinningItemList>
          ))}
        </PinningContainer>
      </div>
    </section>
  )
}
