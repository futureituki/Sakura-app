import axios from 'axios'

export const getData = async (url: string, accessKey: string) => {
  return await axios
    .get(url, {
      headers: {
        ['Content-Type']: 'application/json',
        'Ocp-Apim-Subscription-Key': accessKey,
      },
    })
    .then((res) => res.data)
}
