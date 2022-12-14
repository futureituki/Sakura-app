import { YouTube, Twitter } from '@mui/icons-material'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { TikTokIcon } from '@/components/atoms/Icon/TikTokIcon'
import styles from '@/styles/Site.module.css'

export const Section06 = () => {
  const socialMediaLinks = [
    {
      platform: 'Youtube',
      link: 'https://www.youtube.com/channel/UCmr9bYmymcBmQ1p2tLBRvwg',
      icon: <YouTube />,
    },
    {
      platform: 'Twitter',
      link: 'https://twitter.com/sakurazaka46',
      icon: <Twitter />,
    },
    {
      platform: 'Tiktok',
      link: 'https://www.tiktok.com/@sakurazaka46.officialtk',
      icon: <TikTokIcon color='#fff' />,
    },
  ]
  return (
    <section className={styles.sec_sn}>
      <Heading visualLevel={2} level={2}>
        SNS
      </Heading>
      <div className={styles.sns}>
        {socialMediaLinks.map((social, index) => (
          <div className={styles.sns_tx} key={index}>
            {social.icon}
            <Link href={social.link}>
              <span>{social.platform}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
