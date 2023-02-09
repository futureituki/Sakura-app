import { css } from '@emotion/react'
import { YouTube, Twitter } from '@mui/icons-material'
import { Box } from '@mui/material'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { TikTokIcon } from '@/components/atoms/Icon/TikTokIcon'
import styles from '@/styles/Site.module.css'

export const Section06 = () => {
  const socialMediaLinks = [
    {
      platform: 'Youtube',
      link: 'https://www.youtube.com/channel/UCmr9bYmymcBmQ1p2tLBRvwg',
      color: 'linear-gradient(150deg, rgba(255, 94, 94, 1) 5%, rgba(237, 23, 0, 1) 200%)',
      icon: <YouTube />,
    },
    {
      platform: 'Twitter',
      link: 'https://twitter.com/sakurazaka46',
      color: 'linear-gradient(150deg, rgba(47, 188, 255, 1) 6%, rgba(70, 82, 255, 1) 100%)',
      icon: <Twitter />,
    },
    {
      platform: 'Tiktok',
      link: 'https://www.tiktok.com/@sakurazaka46.officialtk',
      color:
        'linear-gradient(90deg, rgb(0, 255, 243) 6%, rgb(60, 229, 220) 48%, rgb(255, 129, 141) 56%, rgb(252, 146, 146))',
      icon: <TikTokIcon />,
    },
  ]
  const sns_container = css`
    width: 90%;
    height: 100%;
    margin: 20px auto;
    @media (min-width: 768px) {
      display: flex;
      gap: 20px;
      justify-content: center;
    }
  `
  const sns_box = css`
    background-size: 200% 200%;
    animation: bg 9s ease infinite;
    padding: 40% 0;
    margin: 20px auto;
    position: relative;
    display: block;
    @media screen and (min-width: 768px) {
      width: 32%;
      padding: 14% 0;
    }
  `
  const sns_icon = css`
    display: grid;
    place-items: center;
    color: #fff;
    & svg {
      font-size: 7rem;
    }
  `
  return (
    <section className={styles.sec_sn}>
      <Heading visualLevel={2} level={2}>
        SNS
      </Heading>
      <Box css={sns_container} component='div'>
        {socialMediaLinks.map((social, index) => (
          <Link href={social.link} css={sns_box} key={index} style={{ background: social.color }}>
            <span css={sns_icon}>{social.icon}</span>
          </Link>
        ))}
      </Box>
    </section>
  )
}
