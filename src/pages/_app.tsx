import '../theme.scss'
import 'firebase/compat/auth'
import * as Sentry from '@sentry/react'
import { setAutoFreeze } from 'immer'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Div100vh from 'react-div-100vh'
import { Toaster } from 'react-hot-toast'
import { StoreContext } from 'storeon/react'
import { ErrorComponent } from '../components/error/ErrorBoundary'
import { handleError } from '../helpers/handleError'
import { startSentry } from '../helpers/startSentry'
import { useErrors } from '../hooks/useErrors'
import { store } from '../store/store'

// https://github.com/immerjs/immer/issues/959
setAutoFreeze(false)
startSentry()

function _App({ Component, pageProps }: AppProps) {
  // Listen to unhandled errors and Promise rejections
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useErrors()

  return (
    <Sentry.ErrorBoundary
      onError={(e) => {
        // Sentry is already capturing the error here, we do not want to report it again
        handleError(e, { hideFromSentry: true })
      }}
      fallback={<ErrorComponent />}
      beforeCapture={(scope) => {
        try {
          scope.setUser({ id: store.get().data.profiles[0].authId })
        } catch (e) {
          console.log('Storeon not configured yet. Skipping.')
        }
        scope.setExtra('version', process.env.NEXT_PUBLIC_VERSION || 'Unknown')
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <StoreContext.Provider value={store}>
        <Head>
          <title>Clean Slate | App</title>
          <meta name="description" content={'Track food without judgement'} />
        </Head>
        <Div100vh>
          <Component {...pageProps} />
        </Div100vh>
      </StoreContext.Provider>
    </Sentry.ErrorBoundary>
  )
}
export default _App
