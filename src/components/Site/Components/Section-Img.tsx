import { FC } from 'react'

type Props = {
  src: string
  alt_name: string
}
export const SectionImg: FC<Props> = ({ src, alt_name }) => {
  return <img src={src} alt={`${alt_name}の画像`} style={{ width: `400px`, height: `300px` }} />
}
