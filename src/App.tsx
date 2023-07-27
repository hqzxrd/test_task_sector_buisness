import Layout from './components/layout/layout'
import Table from './components/screens/Table'
import { store } from './store/store'
import { Provider } from 'react-redux'

import './style/global.scss'
import './style/normalize.scss'

function App() {
	return (
		<Provider store={store}>
			<Layout>
				<Table />
			</Layout>
		</Provider>
	)
}

export default App
