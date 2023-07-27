import { getData } from './table.action'
import { ISotrtedData, tableItem } from './table.interface'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	tableItems: tableItem[]
	sortedItems: tableItem[]
	page: number
	limit: number
	isLoading: boolean
}

const initialState: IInitialState = {
	tableItems: [],
	sortedItems: [],
	page: 0,
	limit: 10,
	isLoading: false,
}

export const userSlice = createSlice({
	name: `table`,
	initialState,
	reducers: {
		next(state) {
			if (state.page + 1 < state.tableItems.length / state.limit) state.page++
		},

		back(state) {
			if (state.page > 0) state.page--
		},

		currentPage(state, { payload }: { payload: number }) {
			state.page = payload
		},

		sortData(state, { payload }: ISotrtedData) {
			if (payload.for === `id`)
				state.sortedItems = state.sortedItems.sort((a, b) => {
					if (payload.type === `asc`) return a.id - b.id
					else return b.id - a.id
				})

			if (payload.for === `title`)
				state.sortedItems = state.sortedItems.sort((a, b) => {
					if (payload.type === `asc`) return a.title.localeCompare(b.title)
					else return b.title.localeCompare(a.title)
				})

			if (payload.for === `body`)
				state.sortedItems = state.sortedItems.sort((a, b) => {
					if (payload.type === `asc`) return a.body.localeCompare(b.body)
					else return b.body.localeCompare(a.body)
				})
		},

		sortByString(state, { payload }: { payload: string }) {
			state.sortedItems = state.tableItems.filter((item) => {
				const itemValues = Object.values(item).map((value) =>
					String(value).toLowerCase()
				)

				return itemValues.some((value) => value.includes(payload.toLowerCase()))
			})
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getData.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getData.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.tableItems = payload
			state.sortedItems = payload
		})
		builder.addCase(getData.rejected, (state) => {
			state.isLoading = false
		})
	},
})

export const { next, back, currentPage, sortData, sortByString } =
	userSlice.actions

export const { reducer } = userSlice
