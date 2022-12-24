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
        <Box
          sx={{
            width: '100vw',
            borderBottom: '1px solid #000',
            display: 'flex',
            justifyContent: 'center',
            padding: '15px 0',
            fontSize: '4vw',
            marginBottom: '40px',
          }}
        >
          推しメン
        </Box>
        <Link
          href={{ pathname: 'favorite_change', query: user.first_favorite }}
          as='favorite_change'
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <p style={{ width: '18vw', fontSize: '3vw' }}>{user.first_favorite.name}</p>
              <Image
                src={`/assets/member/${user.first_favorite.src}`}
                alt={user.first_favorite.name}
                width={100}
                height={100}
                style={{ width: '14vw', height: '14vw', borderRadius: '50%', objectFit: 'cover' }}
              />
            </Box>
          </Box>
        </Link>
        <Box
          sx={{
            width: '100vw',
            border: '1px solid #000',
            display: 'flex',
            justifyContent: 'center',
            padding: '15px 0',
            fontSize: '4vw',
            margin: '40px 0',
          }}
        >
          気になる
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {user.favorite.map((member: Favorite, index: number) => (
            <Link
              href={{ pathname: 'favorite_change', query: member }}
              as='favorite_change'
              key={index}
            >
              <Box key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                  }}
                >
                  <p style={{ width: '18vw', fontSize: '3vw' }}>{member.name}</p>
                  <Image
                    src={`/assets/member/${member.src}`}
                    alt={member.name}
                    width={100}
                    height={100}
                    style={{
                      width: '14vw',
                      height: '14vw',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
