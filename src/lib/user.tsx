import { useSelector } from 'react-redux'
import { User, UserReducer } from '@/types/user'

export const GetUser = () => {
  const user = useSelector((state: any) => state.user as UserReducer)

  return { user }
}
