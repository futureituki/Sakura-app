import { Box, css } from '@mui/material'
import Image from 'next/image'
import { TitleBar } from '../atoms/TitleBar'
import { memberMap } from '@/constant/memberDetail'
import styles from '@/styles/Member.module.css'
type Information = {
  name: string
  sign: string
  birthday: string
  height: string
  birthplace: string
  bloodType: string
  src: string
}
export const Member = ({ name }: { name: string }) => {
  const selectMember: Information = memberMap.get(name) as Information
  const img = css`
    max-width: 900px;
    height: 100%;
    width: 85vw;
    margin: 0 auto;
    display: grid;
    place-items: center;
  `
  return (
    <Box>
      <TitleBar>MEMBER</TitleBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 0',
          fontSize: '2vw',
          borderBottom: '1px solid #000',
        }}
      >
        <span>{name}</span>
      </Box>
      <Box
        sx={{
          width: '85vw',
          margin: '40px auto',
          maxWidth: '1440px',
        }}
      >
        <Box
          sx={{
            maxWidth: '1440px',
          }}
        >
          <Image
            css={img}
            src={selectMember.src}
            alt={selectMember.name}
            width={350}
            height={500}
          />
        </Box>
        <Box
          sx={{
            width: '85vw',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              margin: '20px 0',
            }}
          >
            <h1 className={styles.name}>{`${selectMember.name}`}</h1>
          </Box>
          <Box
            sx={{
              margin: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              <span className={styles.information_title}>生年月日</span>
              <span className={styles.information}>{`${selectMember.birthday}`}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              <span className={styles.information_title}>星座</span>
              <span className={styles.information}>{`${selectMember.sign}`}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              <span className={styles.information_title}>出身地</span>
              <span className={styles.information}>{`${selectMember.birthplace}`}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              <span className={styles.information_title}>身長</span>
              <span className={styles.information}>{`${selectMember.height}`}</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              <span className={styles.information_title}>血液型</span>
              <span className={styles.information}>{`${selectMember.bloodType}`}</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
