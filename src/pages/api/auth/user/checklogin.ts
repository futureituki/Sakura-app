import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import nookies, { destroyCookie, parseCookies } from 'nookies'
import { AdminAUTH } from '@/firebase/server'

export default async function sessionLogoutApi(req: Req, res: Res) {
  // POSTじゃなければ、"404 Not Found"を返す
  if (req.method !== 'POST') return res.status(404).send('Not Found')
  const sessionId = parseCookies({ req }).session || ''
  // セッションIDを検証して、認証情報を取得する
  const user = await AdminAUTH.verifySessionCookie(sessionId, true).catch(() => null)

  // 認証情報が無い場合は、ログイン画面へ遷移させる
  res.send(JSON.stringify({ user: user }))
}
