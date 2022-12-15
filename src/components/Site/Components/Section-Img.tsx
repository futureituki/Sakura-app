import Image from 'next/image'
import { FC } from 'react'

type Props = {
  src: string
  alt_name: string
  width: number
  height: number
}
export const SectionImg: FC<Props> = ({ src, alt_name, width, height }) => {
  return <Image src={src} alt={`${alt_name}の画像`} width={width} height={height} />
}
