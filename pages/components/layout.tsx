// Layout

import React, { ReactNode } from 'react'
import Head from 'next/head'
import styles from './layout.module.sass'
import CybrButton from './cybr-button'

type LayoutProps = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutProps): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className={styles.headerContainer}>
      <nav>
        <CybrButton title={'Index'} link={'/'} small={true} />
      </nav>
    </header>
    <div className={styles.contentContainer}>{children}</div>
    <footer className={styles.footerContainer}>
      <hr />
      <span>Footer</span>
    </footer>
  </div>
)

export default Layout
