import { actions } from '../store/rootActions'
import { useAppDispatch } from '../store/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
