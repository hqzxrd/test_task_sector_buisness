import { FC } from 'react'

import styles from './layout.module.scss'

interface props {
	children: React.ReactNode
}

const Layout: FC<props> = ({ children }) => {
	return <div className={styles.layout}>{children}</div>
}

export default Layout
