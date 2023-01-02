import { Box } from '@mui/material'
import { Heading } from '@/components/atoms/Heading'

export const SectionHarf02 = () => {
  return (
    <section style={{ position: 'relative', zIndex: 100 }}>
      <Box>
        <Heading
          level={2}
          visualLevel={1}
          style={{ color: '#fff', position: 'relative', fontSize: '5vw' }}
        >
          櫻坂46とは
        </Heading>
      </Box>
    </section>
  )
}
