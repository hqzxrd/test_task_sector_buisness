import { API_URL } from '../../api/api'
import { tableItem } from './table.interface'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getData = createAsyncThunk<tableItem[], void>(
	`getData`,
	async (_, thunkApi) => {
		try {
			const res = await fetch(`${API_URL}`)

			return await res.json()
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)
