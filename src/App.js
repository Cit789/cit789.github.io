import './index.css'
import Header from './components/header/header'
import RightBlock from './components/right-block/right-block'
import MainContainer from './components/main-container/main-cotainer'
import LeftBlock from './components/left-block/left-block'
import { createContext, useEffect, useState } from 'react'
import support_citys from './support_citys/support_citys'
const PageTheme = createContext('light')
function App() {
	const [theme, setTheme] = useState('light')
	const [coordinates, setCoordinates] = useState([55, 55])
	const [city, setCity] = useState('Уфа')
	const SetGeoOnUserCoordinates = useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const lat = position.coords.latitude
				const long = position.coords.longitude
				const userGeoArray = [lat, long]
				try {
					setCoordinates(userGeoArray)
					const userCity = support_citys.find(
						item =>
							Object.values(item)[0].includes(
								Number(String(lat).split('.')[0])
							) &&
							Object.values(item)[0].includes(
								Number(String(long).split('.')[0])
							)
					)
					setCity(Object.keys(userCity)[0])
				} catch {
					setCoordinates([55, 55])
					setCity('Уфа')
				}
			})
		}
	}, [])

	return (
		<PageTheme.Provider value={theme}>
			<MainContainer
				theme={theme}
				header={<Header setCoordinates={setCoordinates} setCity={setCity} />}
			>
				<LeftBlock
					city={city}
					setTheme={setTheme}
					theme={theme}
					coordinates={coordinates}
				/>
				<RightBlock theme={theme} coordinates={coordinates} />
			</MainContainer>
		</PageTheme.Provider>
	)
}
export { PageTheme }
export default App
