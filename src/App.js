
import Server from './utils/Server'

function App() {
    
	console.log(1)
	Server.weather_getForecast(55, 55, 16, 16).then(data => console.log(data))
}

export default App
