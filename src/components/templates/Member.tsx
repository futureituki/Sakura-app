import { memberSrc } from "@/constant/memberSrc"
import { memberMap } from "@/constant/member"
import { Box } from "@mui/material"
import { TitleBar } from "../atoms/TitleBar"

type Information = {
  name:string
  age:number
  birthday:string
  height:string
  birthplace:string
  bloodType:string
}
export const Member = ({name}:{name:string}) => {
  const selectMember:Information = memberMap.get(name) as Information
  console.log(name)
  return (
    <Box>
      <TitleBar>MEMBER</TitleBar>
      <Box sx={{
        display:"flex",
        justifyContent:"center",
        padding:"20px 0",
        borderBottom:"1px solid #000"
      }}>
        <span>{name}</span>
      </Box>
      <Box>
          <Box>
            <h1>{`名前:${selectMember.name}`}</h1>
          </Box>
          <Box>
            <span>{`年齢:${selectMember.age}`}</span>
          </Box>
          <Box>
            <span>{`誕生日:${selectMember.birthday}`}</span>
          </Box>
          <Box>
            <span>{`出身地:${selectMember.birthplace}`}</span>
          </Box>
          <Box>
            <span>{`身長:${selectMember.height}`}</span>
          </Box>
          <Box>
            <span>{`血液型:${selectMember.bloodType}`}</span>
          </Box>
      </Box>
    </Box>
  )
}