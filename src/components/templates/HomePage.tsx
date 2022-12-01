import React from 'react'
import { Section01 } from '../Site/Components/Section01'
import { Section02 } from '../Site/Components/Section02'
import { Section03 } from '../Site/Components/Section03'
import { Section04 } from '../Site/Components/Section04'
import { Section05 } from '../Site/Components/Section05'
import { Section06 } from '../Site/Components/Section06'

export const HomePage = () => {
  return (
    <div>
      <main style={{ background: '#000' }}>
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
        <Section06 />
      </main>
    </div>
  )
}
