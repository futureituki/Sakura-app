import axios from 'axios'

export const getData = async (url: string) => {
  return await axios.get(url).then((data) => {
    return data
  })
}
