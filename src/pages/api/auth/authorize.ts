import axios from 'axios'
import withSession from '@/lib/middleware/session'
type SpotifyAuthApiResponse = {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
  refresh_token: string
}

const authorize = async (req: any, res: any) => {
  const { code, state } = req.query

  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code as string)
  params.append('redirect_uri', `${process.env.RETURN_TO}` as string)

  const response = await axios.post<SpotifyAuthApiResponse>(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET_ID}`,
          'utf-8',
        ).toString('base64')}`,
      },
    },
  )

  req.session.set('user', {
    accessToken: response.data.access_token,
  })
  await req.session.save()
  res.status(200).redirect('/music-list')
}

export default withSession(authorize)
