import { useAspect, useTexture } from '@react-three/drei'
import { FC, Suspense } from 'react'
import { PlaneGeometry } from 'three'
import * as THREE from 'three'
import { VideoMaterial } from './video-material'

type SceneProps = {
  photo_url: string
  video_url: string
}
export const Scene: FC<SceneProps> = ({ photo_url, video_url }) => {
  const size = useAspect(1800, 1000)
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url={photo_url} />}>
        <VideoMaterial url={video_url} />
      </Suspense>
    </mesh>
  )
}

type Props = {
  url: string
}
const FallbackMaterial: FC<Props> = ({ url }) => {
  const texture = useTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}
