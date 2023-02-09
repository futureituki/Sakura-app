import { Box } from '@mui/material'
import Link from 'next/link'

export const TagPagination = ({
  numberPages,
  tagName,
}: {
  numberPages: number
  tagName: string
}) => {
  const pages = Math.ceil(numberPages / 3)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
      }}
      component='div'
    >
      {Array.from({ length: pages }, (_, i) => (
        <Link
          key={i + 1}
          href={i === 0 ? `/community/tag/${tagName}` : `/community/tag/${tagName}/${i + 1}`}
        >
          <Box
            sx={{
              border: '1px solid #000',
              padding: '5px',
            }}
            component='div'
          >
            {i + 1}
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default TagPagination
