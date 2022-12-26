import { Box } from '@mui/material'
import { NextPageWithLayout } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TitleBar } from '@/components/atoms/TitleBar'
import { music_id } from '@/constant/music-list'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

type Music = {
  id: string
  src: string
  title: string
  type: string
}

const SingleList: NextPageWithLayout = () => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()

  return (
    <>
      <TitleBar>Music List</TitleBar>
      <Box
        sx={{
          margin: '60px 0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {loginData?.accessToken
          ? music_id.map((music: Music, index: number) =>
              music.type !== 'album' ? (
                <Link href={`/music-list/single/${music.id}`} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <Image
                      src={`/assets/${music.src}`}
                      alt={music.title}
                      width={400}
                      height={400}
                      style={{ width: '40vw', height: '100%', display: 'block' }}
                    />
                    <Box
                      sx={{
                        border: '1px solid #f2f2f2',
                        borderRadius: '2.5em',
                        padding: '5px 15px',
                        width: 'fit-Content',
                        fontSize: '2vw',
                      }}
                    >
                      <span>{music.type}</span>
                    </Box>
                    <p style={{ fontSize: '3.4vw' }}>{music.title}</p>
                  </Box>
                </Link>
              ) : (
                ''
              ),
            )
          : ''}{' '}
      </Box>
    </>
  )
}

SingleList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default SingleList
