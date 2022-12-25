import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Handler, Session } from 'next-iron-session'
export type NextIronRequest = NextApiRequest & { session: Session }
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>
const withSession = (handler: NextIronHandler) => {
  return withIronSession(handler, {
    cookieName: 'app_session',
    password: `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET_ID}`,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
}

export default withSession
