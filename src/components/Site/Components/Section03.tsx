import { css } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { PinningContainer, PinningItemList } from '@/components/PinningScroll/Pinning-Side-Scroll'
import { SectionImg } from '@/components/Site/Components/Section-Img'
import { Heading } from '@/components/atoms/Heading'
import { firstMemberSrc, secondMemberSrc, thirdMemberSrc } from '@/constant/memberSrc'
import styles from '@/styles/Site.module.css'
import { MemberObj, MemberSrc } from '@/types/constant/member'

export const Section03 = () => {
  const info_box = css`
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    opacity: 0;
    transition: all 0.8s ease;
    &:hover {
      opacity: 1;
    }
  `
  const info = css`
    color: #000;
    width: 100%;
    height: 30%;
    background-image: linear-gradient(-102deg, transparent 0 3%, #fff 38% 52%);
    position: absolute;
    bottom: 0%;
    left: 0%;
  `
  const info_text = css`
    margin: 20px 14px 0 14px;
    text-align: left;
  `
  const member_info = css`
    height: 100%;
    position: relative;
  `
  return (
    <section className={styles.sec_member}>
      <Box
        sx={{
          maxWidth: '1400px',
        }}
        component='div'
      >
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
              <Box css={member_info} component='div'>
                <SectionImg
                  src={member.src}
                  alt_name={member.name}
                  width={280}
                  height={350}
                  id={'img_' + member.src}
                />
                <Box css={info_box} component='div'>
                  <Box css={info} component='div'>
                    <Typography css={info_text}>
                      {member.ruby}
                      <br></br>
                      {member.birthday}
                      <br></br>
                      {member.sign}
                    </Typography>
                  </Box>
                </Box>
              </Box>
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
              <Box css={member_info} component='div'>
                <SectionImg
                  src={member.src}
                  alt_name={member.name}
                  width={280}
                  height={350}
                  id={'img_' + member.src}
                />
                <Box css={info_box} component='div'>
                  <Box css={info} component='div'>
                    <Typography css={info_text}>
                      {member.ruby}
                      <br></br>
                      {member.birthday}
                      <br></br>
                      {member.sign}
                    </Typography>
                  </Box>
                </Box>
              </Box>
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
          {thirdMemberSrc.map((member: MemberSrc, index: number) => (
            <PinningItemList key={index}>
              <Box css={member_info} component='div'>
                <SectionImg
                  src={member.src}
                  alt_name={member.name}
                  width={280}
                  height={350}
                  id={'img_' + member.src}
                />
              </Box>
              <p style={{ color: '#fff', marginTop: '20px', fontSize: '1.6rem' }}>{member.name}</p>
            </PinningItemList>
          ))}
        </PinningContainer>
      </Box>
    </section>
  )
}
