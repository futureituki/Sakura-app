import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { Section01 } from '../Site/Components/Section01'
import { Section02 } from '../Site/Components/Section02'
import { Section03 } from '../Site/Components/Section03'
import { Section05 } from '../Site/Components/Section05'
import { Section06 } from '../Site/Components/Section06'

const DynamicSection = dynamic(
  () => {
    return import('@/components/Site/Components/Section04')
  },
  {
    suspense: true,
  },
)
export const HomePage = () => {
  return (
    <div>
      <main style={{ background: '#000' }}>
        <Section01 />
        <Section02 />
        <Section03 />
        <DynamicSection />
        <Section05 />
        <Section06 />
      </main>
    </div>
  )
}
