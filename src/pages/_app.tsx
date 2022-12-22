import '@/styles/globals.scss'
import '@/components/atoms/Heading/index.css'
import type { AppPropsWithLayout } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer, Zoom } from 'react-toastify'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
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

export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
  let home = false
  if (router.pathname == '/') home = true
  const getLayout = Component.getLayout ?? ((page) => page)
  return home
    ? getLayout(<Component {...pageProps} />)
    : getLayout(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer
              position='top-left'
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
              toastClassName={() =>
                // contextClass[(theme == 'light'? 'default': 'info')] +
                contextClass['info'] +
                ' relative flex p-1 min-h-10 rounded-md justify-between m-2 cursor-pointer'
              }
              bodyClassName={() => ' flex  text-sm font-md block p-3'}
            />
            <Component {...pageProps} />
          </PersistGate>
        </Provider>,
      )
}
