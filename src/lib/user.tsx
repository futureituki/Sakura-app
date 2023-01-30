import { useSelector } from 'react-redux'
import { User, UserReducer } from '@/types/user'

export const useGetUser = () => {
  const user = useSelector((state: any) => state.user as UserReducer)

  return { user }
}
