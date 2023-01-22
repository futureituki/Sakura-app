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
      <TitleBar>推しメン変更</TitleBar>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Box
          sx={{
            margin: '2vw 0',
            fontSize: '2.6vw',
          }}
        >
          <h2>推しメンの登録とは</h2>
        </Box>
        <Box
          sx={{
            margin: '20px 0',
            fontSize: '14px',
            lineHeight: '1.75',
            width: '90vw',
          }}
        >
          <p>
            1名の「推しメン」と3名の「気になる」メンバーを登録することが可能です。<br></br>
            応援しているメンバーを登録することで、推しメン登録したメンバーのプロフィールやブログを絞り込んで表示する機能や、推しメンに登録した日数などがわかるようになります。
          </p>
        </Box>
        <Box
          sx={{
            margin: '20px 0',
          }}
        >
          <p>変更したいメンバーを選択してください</p>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
          '@media screen and (min-width:960px)': {
            width: '960px',
            margin: '40px auto',
          },
        }}
      >
        <Box
          sx={{
            width: '90vw',
            borderBottom: '1px solid #000',
            display: 'flex',
            justifyContent: 'center',
            padding: '15px 0',
            fontSize: '4vw',
            marginBottom: '40px',
            '@media screen and (min-width:960px)': {
              width: '100%',
              margin: '40px auto',
            },
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
                style={{
                  width: '14vw',
                  height: '14vw',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: '0 0',
                }}
              />
            </Box>
          </Box>
        </Link>
        <Box
          sx={{
            width: '90vw',
            borderBottom: '1px solid #000',
            display: 'flex',
            justifyContent: 'center',
            padding: '15px 0',
            fontSize: '4vw',
            margin: '40px 0',
            '@media screen and (min-width:960px)': {
              width: '100%',
              margin: '40px auto',
            },
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
                      objectPosition: '0 0',
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
