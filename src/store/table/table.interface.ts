export interface tableItem {
	userId: number
	id: number
	title: string
	body: string
}

interface ISotrtedDataArgs {
	type: `asc` | `desc`
	for: `id` | `title` | `body`
}

export interface ISotrtedData {
	payload: ISotrtedDataArgs
}
