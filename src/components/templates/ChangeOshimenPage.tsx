import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { TitleBar } from '../atoms/TitleBar'
import { GetUser } from '@/lib/user'

type Favorite = {
  name: string
  src: string
}
export const ChangeOshimenPage = () => {
  const user = GetUser().user
  return (
    <Box>
      <TitleBar>推しメン選択</TitleBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <Link
          href={{ pathname: 'favorite_change', query: user.first_favorite }}
          as='favorite_change'
        >
          <Box>
            <Box>
              <p>{user.first_favorite.name}</p>
              <Image
                src={`/assets/member/${user.first_favorite.src}`}
                alt={user.first_favorite.name}
                width={150}
                height={150}
              />
            </Box>
          </Box>
        </Link>
        {user.favorite.map((member: Favorite, index: number) => (
          <Link
            href={{ pathname: 'favorite_change', query: member }}
            as='favorite_change'
            key={index}
          >
            <Box key={index}>
              <Box>
                <p>{member.name}</p>
                <Image
                  src={`/assets/member/${member.src}`}
                  alt={member.name}
                  width={150}
                  height={150}
                />
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
