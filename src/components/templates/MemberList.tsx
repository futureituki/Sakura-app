import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { Heading } from '../atoms/Heading'
import { TitleBar } from '../atoms/TitleBar'
import { firstMemberSrc, memberSrc, secondMemberSrc, thirdMemberSrc } from '@/constant/memberSrc'
import { MemberObj, MemberSrc } from '@/types/constant/member'

const MemberBox = ({ list }: { list: MemberSrc[] | MemberObj[] }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        width: '60vw',
        margin: '0 0 0 auto',
      }}
    >
      {list.map((member: MemberSrc, index: number) => (
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
  )
}
export const MemberList = () => {
  const [value, setValue] = useState<string>('')
  const [memberArr, setMemberArr] = useState<MemberObj[]>(memberSrc)
  const [signMemberArr, setSignMemberArr] = useState<any>([])
  const handleChange = (event: any) => {
    setValue(event.target.value)
    onSwitch(event.target.value)
  }
  const onSwitch = (value: string) => {
    switch (value) {
      case 'syllabary':
        //並び替え処理
        const newMember = memberArr.sort(function (a: MemberObj, b: MemberObj) {
          if (a.ruby > b.ruby) {
            return 1
          }
          if (a.ruby < b.ruby) {
            return -1
          }
          return 0
        })
        setMemberArr(newMember)
        break
      case 'sign':
        //並び替え処理
        let signMemberMap = new Map()
        let arr = []
        let signMember = memberArr.sort(function (a: MemberObj, b: MemberObj) {
          if (a.sign > b.sign) {
            return 1
          }
          if (a.sign < b.sign) {
            return -1
          }
          return 0
        })
        for (let i = 0; i < signMember.length; i++) {
          if (signMember[i + 1] === undefined) continue
          if (signMember[i + 1].sign === signMember[i].sign) {
            arr.push(signMember[i])
          } else {
            if (arr.length !== 0) {
              if (signMember[i + 1].sign !== signMember[i].sign) {
                arr.push(signMember[i])
              }
              signMemberMap.set(signMember[i].sign, arr)
              arr = []
            } else {
              signMemberMap.set(signMember[i].sign, signMember[i])
            }
          }
        }
        let newArr = Array.from(signMemberMap.values())
        setSignMemberArr(newArr)
        break
    }
  }
  return (
    <Box sx={{}}>
      <TitleBar>MEMBER</TitleBar>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <FormControl
          sx={{
            width: '300px',
            margin: '20px auto',
          }}
        >
          <InputLabel id='demo-simple-select-label'>並び替え</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value}
            label='並び替え'
            onChange={handleChange}
          >
            <MenuItem value='syllabary'>語順音順</MenuItem>
            <MenuItem value='sign'>星座</MenuItem>
            {/* <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          margin: '0 0 0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          width: '80vw',
        }}
      >
        {value === 'syllabary' ? (
          <Box>
            <MemberBox list={memberArr} />
          </Box>
        ) : (
          ''
        )}
        {value === 'sign'
          ? signMemberArr?.map((member: any, index: number) => (
              <Box key={index} sx={{ width: '80vw', margin: '0 auto' }}>
                {member.length !== undefined ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'start',
                      gap: '20px',
                    }}
                  >
                    {member.map((m: MemberObj, index: number) => (
                      <Link href={`member-list/${m.name}`} key={index}>
                        <Box
                          sx={{
                            fontSize: '4vw',
                            margin: '20px 0',
                          }}
                        >
                          <p>
                            {index === 0 ? m.sign : <span style={{ opacity: 0 }}>{m.sign}</span>}
                          </p>
                        </Box>
                        <Box key={index} sx={{ width: '30%' }}>
                          <Image src={m.src} alt='' width={250} height={350} />
                          <p>{m.name}</p>
                        </Box>
                      </Link>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ width: '80vw', margin: '0 auto' }}>
                    <Heading visualLevel={2} level={3} style={{ color: '#000' }}>
                      {member.sign}
                    </Heading>
                    <Link href={`member-list/${member.name}`} key={index}>
                      <Box
                        sx={{
                          fontSize: '4vw',
                          margin: '20px 0',
                        }}
                      ></Box>
                      <Image src={member.src} alt='' width={250} height={350} />
                      <p>{member.name}</p>
                    </Link>
                  </Box>
                )}
              </Box>
            ))
          : ''}
        {value === '' ? (
          <Box
            sx={{
              width: '80vw',
              margin: '0 0 0 auto',
            }}
          >
            <Box>
              <Heading visualLevel={2} level={3} style={{ color: '#000' }}>
                一期生
              </Heading>
              <MemberBox list={firstMemberSrc} />
            </Box>
            <Box>
              <Heading visualLevel={2} level={3} style={{ color: '#000' }}>
                二期生
              </Heading>
              <MemberBox list={secondMemberSrc} />
            </Box>
            <Box>
              <Heading visualLevel={2} level={3} style={{ color: '#000' }}>
                三期生
              </Heading>
              <MemberBox list={thirdMemberSrc} />
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  )
}
