import '@/styles/globals.scss'
import '@/components/atoms/Heading/index.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppPropsWithLayout } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer, Zoom } from 'react-toastify'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { HistoryContext } from '@/redux/context/history'
import { store } from '@/redux/store'
import 'react-toastify/dist/ReactToastify.css'

let persistor = persistStore(store)
const contextClass = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-700',
  warning: 'bg-orange-400',
  default: 'bg-black text-white ',
  dark: 'bg-white text-gray-600',
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const [history, setHistory] = useState([router.asPath, ''])

  useEffect(() => {
    setHistory([router.asPath, history[0]])
  }, [router.asPath])
  let home = false
  if (router.pathname == '/') home = true
  const getLayout = Component.getLayout ?? ((page) => page)
  return home
    ? getLayout(
        <>
          <Component {...pageProps} />
          <Analytics />
        </>,
      )
    : getLayout(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HistoryContext.Provider value={history}>
              <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Zoom}
                style={{ color: '#000' }}
                closeButton={false}
              />
              <Component {...pageProps} />
              <Analytics />
            </HistoryContext.Provider>
          </PersistGate>
        </Provider>,
      )
}
