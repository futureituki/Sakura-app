import { Box } from '@mui/material'
import Link from 'next/link'

export const PostsPagination = ({ numberPages }: { numberPages: number }) => {
  const pages = Math.ceil(numberPages / 3)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
      }}
    >
      {Array.from({ length: pages }, (_, i) => (
        <Link key={i + 1} href={i === 0 ? `/community/posts` : `/community/posts/${i + 1}`}>
          <Box
            sx={{
              border: '1px solid #000',
              padding: '5px',
            }}
          >
            {i + 1}
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default PostsPagination
