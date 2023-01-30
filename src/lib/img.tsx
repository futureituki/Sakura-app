import { useSelector } from 'react-redux'

export const useGetImg = () => {
  const images = useSelector((state: any) => state.images)

  return { images }
}
