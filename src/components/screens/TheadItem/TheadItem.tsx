import arrowDownIcon from '../../../assets/icons/arrowdown.svg'
import { TSortFor } from '../Table'
import { FC } from 'react'

import styles from './TheadItem.module.scss'

interface props {
	children: string
	field: TSortFor
	sortFor: 'id' | 'title' | 'body'
	setSortFor: React.Dispatch<React.SetStateAction<'id' | 'title' | 'body'>>
	sortBy: `asc` | `desc`
	setSortBy: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>
}

const TheadItem: FC<props> = ({
	field,
	sortFor,
	setSortFor,
	sortBy,
	setSortBy,
	children,
}) => {
	const changeSortType = () => {
		setSortFor(field)

		if (sortBy === `asc`) {
			setSortBy(`desc`)
		} else {
			setSortBy(`asc`)
		}
	}

	return (
		<th className={styles.tableItem} onClick={() => changeSortType()}>
			<div>
				<div>{children}</div>
				<div className={styles.icon}>
					<img
						className={
							sortBy === `desc` && field === sortFor ? styles.reverse : ``
						}
						src={arrowDownIcon}
						alt="arrowDown"
					/>
				</div>
			</div>
		</th>
	)
}

export default TheadItem
