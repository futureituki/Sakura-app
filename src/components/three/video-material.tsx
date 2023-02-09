import { useVideoTexture } from '@react-three/drei'
import { FC } from 'react'
import { MeshBasicMaterial } from 'three'
type Props = {
  url: string
}
export const VideoMaterial: FC<Props> = ({ url }) => {
  const texture = useVideoTexture(url, '')
  return <meshBasicMaterial map={texture} toneMapped={false} />
}
