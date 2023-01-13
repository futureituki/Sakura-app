import { Box } from '@mui/material'
import Link from 'next/link'
import { memberSrc } from '@/constant/memberSrc'
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
                margin: '20px 0',
                padding: '5px 10px',
                background: '#f2f2f2',
                width: 'fit-content',
                borderRadius: '10px',
              }}
            >
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
