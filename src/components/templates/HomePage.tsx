import { Box } from '@mui/system'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { LoadingContainer } from '../Site/Components/LoadingContainer'
import { MusicVideo } from '@/components/Site/Components/MusicVideo'
import { Section01 } from '@/components/Site/Components/Section01'
import { Section02 } from '@/components/Site/Components/Section02'
import { Section03 } from '@/components/Site/Components/Section03'
import { Section04Sounds } from '@/components/Site/Components/Section04-Sounds'
import { Section05 } from '@/components/Site/Components/Section05'
import { Section06 } from '@/components/Site/Components/Section06'
import { SectionHarf02 } from '@/components/Site/Components/SectionHarf02'
import { Heading } from '@/components/atoms/Heading'

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
    <Box component='div' style={{ overflow: 'hidden' }}>
      <main style={{ background: '#000', overflow: 'hidden' }}>
        <Section01 />
        <Box
          sx={{
            maxWidth: '1300px',
            margin: '0 auto',
          }}
          component='div'
        >
          <SectionHarf02 />
          <Section02 />
          <Box
            sx={{
              width: '80vw',
              margin: '0 auto',
            }}
            component='div'
          >
            <Heading
              level={2}
              visualLevel={1}
              style={{ color: '#fff', position: 'relative', fontSize: '5vw' }}
            >
              Member
            </Heading>
          </Box>
          <Section03 />
          <Section04Sounds />
          <MusicVideo />
          <DynamicSection />
        </Box>
        <Section05 />
        <Section06 />
      </main>
    </Box>
  )
}
