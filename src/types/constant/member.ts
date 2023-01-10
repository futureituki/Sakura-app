export type MemberObj = {
  src: string
  name: string
}

export type MemberDetailData = {
  name: string
  birthday: string
  sign: string
  height: string
  birthplace: string
  bloodType: string
  src: string
}
export type DetailObj = {
  name: string
  birthday: string
  sign: string
  height: string
  birthplace: string
  bloodType: string
  src: string
}
export type MemberDetailObj = Map<string, DetailObj>
