import axios from 'axios'
import withSession from '@/lib/middleware/session'
type SpotifyAuthApiResponse = {
  access_token: string
  expires_in: number
}

const authorize = async (req: any, res: any) => {
  const { code, state } = req.query

  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  params.append('code', code as string)
  params.append('redirect_uri', `${process.env.RETURN_TO}` as string)

  const response = await axios.post<SpotifyAuthApiResponse>(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET_ID}`,
          'utf-8',
        ).toString('base64')}`,
      },
    },
  )
  req.session.set('user', {
    access_token: response.data.access_token,
  })
  await req.session.save()
  res.status(200).redirect('/discography')
}

export default withSession(authorize)
