import * as React from 'react'
import { AppProps } from 'next/app'
import '../styles/global.sass'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
