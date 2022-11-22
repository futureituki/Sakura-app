import '@/styles/globals.scss'
import type { AppPropsWithLayout } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <>
      <CssBaseline/>
      <Component {...pageProps}/>
    </>
  )
}
