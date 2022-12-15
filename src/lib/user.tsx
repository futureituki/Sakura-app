import { useSelector } from 'react-redux'
import { User } from '@/types/user'

export const GetUser = () => {
  const user = useSelector((state: any) => state.user.user as User)

  return { user }
}
