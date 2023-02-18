import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

type Target = {
  name: string
  href: string
}
type Props = {
  links: Target[]
}
export const DiscographyLink: FC<Props> = ({ links }) => {
  const link = css``
  const links_box = css`
    display: flex;
    gap: 40px;
    justify-content: center;
    margin: 60px 0;
    border-bottom: 1px solid #000;
    padding-bottom: 15px;
  `
  return (
    <Box css={links_box} component='div'>
      {links.map((link: Target, index: number) => (
        <Box css={link} component='div' key={index}>
          <Link href={`${link.href}`}>{link.name}</Link>
        </Box>
      ))}
    </Box>
  )
}
