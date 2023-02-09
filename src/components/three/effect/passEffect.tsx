import { Scanline, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import React, { VFC } from 'react'

export const PassEffects = () => {
  const datas = useControls('Scanline', {
    enabled: true,
    density: { value: 1.25, min: 0, max: 10, step: 0.01 },
  })

  return (
    <EffectComposer>
      <>{datas.enabled && <Scanline density={datas.density} />}</>
    </EffectComposer>
  )
}
