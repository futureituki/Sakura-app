import '@/styles/globals.scss'
import '@/components/atoms/Heading/index.css'
import type { AppPropsWithLayout } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>,
  )
}
