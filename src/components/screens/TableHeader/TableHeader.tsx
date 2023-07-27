import searchIcon from '../../../assets/icons/search.svg'
import { currentPage, sortByString } from '../../../store/table/table.slice'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './TableHeader.module.scss'

const TableHeader: FC = () => {
	const [text, setText] = useState<string>(``)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(currentPage(0))
		dispatch(sortByString(text))
	}, [text])

	return (
		<div className={styles.header}>
			<input
				type="text"
				placeholder="Поиск"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<img src={searchIcon} alt="search" />
		</div>
	)
}

export default TableHeader
