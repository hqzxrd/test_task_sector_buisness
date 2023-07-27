import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
	back,
	currentPage,
	next,
	sortData,
} from '../../store/table/table.slice'
import TableHeader from './TableHeader/TableHeader'
import TableItem from './TableItem/TableItem'
import TheadItem from './TheadItem/TheadItem'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './Table.module.scss'

export type TSortFor = `id` | `title` | `body`

export interface tHeadColumns {
	text: string
	field: TSortFor
}

const tHeadColumns: tHeadColumns[] = [
	{ text: `ID`, field: `id` },
	{ text: `Заголовок`, field: `title` },
	{ text: `Описание`, field: `body` },
]

const Table = () => {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState<`asc` | `desc`>(`asc`)
	const [sortFor, setSortFor] = useState<TSortFor>(`id`)
	const { getData } = useActions()
	const { sortedItems, limit, page, isLoading } = useTypedSelector(
		(state) => state.table
	)

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		dispatch(sortData({ type: sortBy, for: sortFor }))
	}, [sortBy, sortFor])

	useEffect(() => {
		if (!ref.current) {
			return
		}
		ref.current.scrollIntoView()
	}, [page])

	if (isLoading) {
		return <>Загрузка...</>
	}

	return (
		<div className={styles.table}>
			<TableHeader />
			<div className={styles.main}>
				<table cellSpacing={0}>
					<thead>
						<tr>
							{tHeadColumns.map((obj) => {
								return (
									<TheadItem
										field={obj.field}
										sortBy={sortBy}
										setSortBy={setSortBy}
										sortFor={sortFor}
										setSortFor={setSortFor}
									>
										{obj.text}
									</TheadItem>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{sortedItems
							.slice(page * limit, page * limit + limit)
							.map((table) => {
								return <TableItem table={table} key={table.id} />
							})}
					</tbody>
				</table>
			</div>

			{Math.round(sortedItems.length / limit) !== 0 ? (
				<div ref={ref} className={styles.pagination}>
					<div onClick={() => dispatch(back())}>Назад</div>
					<div className={styles.pages}>
						{Array.from({ length: Math.round(sortedItems.length / limit) }).map(
							(_, i) => {
								return (
									<div
										className={page === i ? styles.active : ``}
										onClick={() => dispatch(currentPage(i))}
										key={i}
									>
										{i + 1}
									</div>
								)
							}
						)}
					</div>
					<div onClick={() => dispatch(next())}>Далее</div>
				</div>
			) : (
				``
			)}
		</div>
	)
}

export default Table
