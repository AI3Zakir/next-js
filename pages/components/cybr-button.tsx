// CybrButton

import Link from 'next/link'
import styles from './cybr-button.module.sass'
import classNames from 'classnames'

type CybrButtonProps = {
  title: string
  link: string
  small?: boolean
}

const CybrButton = ({ title, link, small = false }: CybrButtonProps): JSX.Element => {
  const buttonClassNames = classNames({
    [styles.cybrBtn]: true,
    [styles.cybrBtnSmall]: small,
  })

  return (
    <Link href={link}>
      <button className={buttonClassNames}>
        {title} <span aria-hidden>_</span>
        <span aria-hidden className={styles.cybrBtn__glitch}>
          Cyber_
        </span>
        <span aria-hidden className={styles.cybrBtn__tag}>
          R25
        </span>
      </button>
    </Link>
  )
}

export default CybrButton
