import Image from 'next/image'
import { FC } from 'react'

type Props = {
  src: string
  alt_name: string
  width: number
  height: number
  id: string
}
export const SectionImg: FC<Props> = ({ src, alt_name, width, height, id }) => {
  return (
    <Image
      src={src}
      alt={`${alt_name}の画像`}
      id={id}
      width={width}
      height={height}
      className='img_load'
      unoptimized
      onLoadingComplete={() => {
        let imageElement = document.getElementById(id)
        imageElement?.classList.remove('img_load')
      }}
    />
  )
}
