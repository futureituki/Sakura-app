import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { TitleBar } from '../atoms/TitleBar'
import { memberSrc } from '@/constant/memberSrc'
export const MemberList = () => {
  return (
    <Box sx={{}}>
      <TitleBar>MEMBER</TitleBar>
      <Box
        sx={{
          margin: '40px 0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {memberSrc.map((member, index) => (
          <Link href={`member-list/${member.name}`} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '10px',
              }}
            >
              <Image src={member.src} alt={member.name} width={250} height={350} />
              <p>{member.name}</p>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
