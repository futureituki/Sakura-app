import axios from 'axios'
import useSWR from 'swr'
import { ResponseBody } from '@/pages/api/auth/checklogin'

const fetcher = (url: string) => axios.post(url).then((res) => res.data)

const useLogin = () => {
  const { data, error } = useSWR('/api/auth/user/checklogin', fetcher)

  return { data, error }
}

export default useLogin
