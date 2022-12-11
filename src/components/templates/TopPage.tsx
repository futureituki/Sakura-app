import { useSelector } from 'react-redux'
import { User } from '@/types/user'

export const TopPage = () => {
  const user = useSelector((state: any) => state.user.user as User)
  return <div>{user.username}さんこんにちは</div>
}
