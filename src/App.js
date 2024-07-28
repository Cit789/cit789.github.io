import Server from './utils/Server'
import './index.css'
import RightBlock from './components/right-block/right-block'
import MainContainer from './components/main-container/main-cotainer'
import LeftBlock from './components/left-block/left-block'
function App() {
	return (
		<MainContainer>
			<LeftBlock />
			<RightBlock />
		</MainContainer>
	)
}

export default App
