import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { memberSrc, memberSrcMap } from '@/constant/memberSrc'
import { MemberObj } from '@/types/constant/member'

export const TagListPage = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid #f2f2f2',
        padding: '20px 0',
        margin: '40px 0',
      }}
    >
      タグ一覧
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        {memberSrc.map((member: MemberObj, index: number) => (
          <Link href={`/community/tag/${member.name}`} key={index}>
            <Box
              key={index}
              sx={{
                display: 'grid',
                placeItems: 'center',
                gap: '10px',
                margin: '20px 0',
                padding: '5px 10px',
                width: 'fit-content',
                borderRadius: '10px',
              }}
            >
              <Image
                src={`/assets/member/${memberSrcMap.get(member.name)?.src}`}
                alt=''
                width={200}
                height={200}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  objectPosition: '0 0',
                  borderRadius: '50%',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>{member.name}</span>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
