import { useSelector } from 'react-redux'
import { User } from '@/types/user'

type ImgProps = {
  src: Array<string>
}
export const GetImg = () => {
  const images = useSelector((state: any) => state.images)

  return { images }
}
