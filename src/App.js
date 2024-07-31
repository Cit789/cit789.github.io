import './index.css'
import Header from './components/header/header'
import RightBlock from './components/right-block/right-block'
import MainContainer from './components/main-container/main-cotainer'
import LeftBlock from './components/left-block/left-block'
import { createContext, useState } from 'react'
const PageTheme = createContext('light')
function App() {
	const [theme,setTheme] = useState('light')
	const [coordinates, setCoordinates] = useState([0, 0])
	return (
		<PageTheme.Provider value={theme}>
			<MainContainer
				theme={theme}
				header={<Header setCoordinates={setCoordinates} />}
			>
				<LeftBlock city={'Краснодар'} setTheme={setTheme} theme={theme} coordinates={coordinates}/>
				<RightBlock theme={theme} coordinates={coordinates} />
			</MainContainer>
		</PageTheme.Provider>
	)
}
export {PageTheme}
export default App
