import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AdminAUTH } from '@/firebase/server'

export default async function sessionLogoutApi(req: Req, res: Res) {
  // POSTじゃなければ、"404 Not Found"を返す
  if (req.method !== 'POST') return res.status(404).send('Not Found')

  const auth = AdminAUTH

  // Cookieに保存されているセッションIDを取得する
  const sessionId = parseCookies({ req }).session || ''

  // セッションIDから認証情報を取得する
  const decodedClaims = await auth.verifySessionCookie(sessionId).catch(() => null)

  // 全てのセッションを無効にする
  if (decodedClaims) {
    await auth.revokeRefreshTokens(decodedClaims.sub)
  }

  // Cookieに保存されているセッションIDを削除
  destroyCookie({ res }, 'session', { path: '/' })

  res.send(JSON.stringify({ status: 'success' }))
}
