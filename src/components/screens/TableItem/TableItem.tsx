import { tableItem } from '../../../store/table/table.interface'
import { FC } from 'react'

import styles from './TableItem.module.scss'

interface props {
	table: tableItem
}

const TableItem: FC<props> = ({ table }) => {
	return (
		<tr className={styles.item}>
			<td className={styles.id}>{table.id}</td>
			<td className={styles.header}>{table.title}</td>
			<td className={styles.descr}>{table.body}</td>
		</tr>
	)
}

export default TableItem
