import axios from 'axios'
import moment from 'moment'
import withSession from '@/lib/middleware/session'
import { ApiHandler } from '@/lib/type/handler'
import executeRefreshToken from '@/lib/util/refreshToken'

export interface ResponseBody {
  access_token?: string
  message?: string
}

const checklogin: ApiHandler<{}, ResponseBody> = async (req, res) => {
  try {
    const { access_token, expiresIn } = req.session.get('user')
    const now = moment()
    if (!access_token) {
      res.status(401)
      res.json({ message: 'unauthorized' })
    }
    res.status(200)
    res.json({ access_token })

    // if (now.diff(moment(authedTs), 'seconds') < (expiresIn - 10 * 60)) {
    //     if (refreshToken) {
    //         const response = await executeRefreshToken(refreshToken);
    //         req.session.set('user', {
    //             access_token: response.access_token,
    //             userId,
    //             authedTs: now.format('YYYY-MM-DD HH:mm:ss'),
    //             expiresIn: response.expires_in
    //         });
    //         await req.session.save();
    //         res.status(200);
    //         res.json({ access_token: response.access_token });
    //     } else {
    //         res.status(401)
    //         res.json({ message: 'unauthorized' });
    //     }
    // }
    // else {
    //     res.status(200);
    //     res.json({ access_token });
    // }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export default withSession(checklogin as any)
