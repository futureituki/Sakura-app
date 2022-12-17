import '@/styles/globals.scss'
import '@/components/atoms/Heading/index.css'
import type { AppPropsWithLayout } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '@/redux/store'

let persistor = persistStore(store)
export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
  let home = false
  if (router.pathname == '/') home = true
  const getLayout = Component.getLayout ?? ((page) => page)
  return home
    ? getLayout(<Component {...pageProps} />)
    : getLayout(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>,
      )
}
