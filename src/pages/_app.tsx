import '@/styles/globals.scss'
import '@/components/atoms/Heading/index.css'
import type { AppPropsWithLayout } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
  let home = false
  if (router.pathname == '/') home = true
  const getLayout = Component.getLayout ?? ((page) => page)
  return home
    ? getLayout(<Component {...pageProps} />)
    : getLayout(
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>,
      )
}
