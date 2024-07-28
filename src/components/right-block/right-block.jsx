import cl from './right-block.module.css'
import WeatherBlock from '../../widgets/weather_block/weather_block'
import { useEffect, useState } from 'react'
import Server from '../../utils/Server'
import Loading from '../../widgets/loading/loading'
const RightBlock = () => {
	const [server_data, setServer_data] = useState(false)
	useEffect(() => {
		Server.weather_getForecast(55, 55).then(data => {
			const request_result = {
				temp_max: data.daily?.temperature_2m_max,
				temp_min: data.daily?.temperature_2m_min,
				wind_max: data.daily?.wind_speed_10m_max,
				data: data.daily?.time,
			}
			setServer_data(request_result)
		})
	}, [])

	return (
		<section className={cl.right_block}>
			{server_data && (
				<div className={cl.grid_container}>
					{server_data.temp_max.map((item, i) => (
						<WeatherBlock
							key={i}
							data={server_data.data[i]}
							max_temp={server_data.temp_max[i]}
							min_temp={server_data.temp_min[i]}
						/>
					))}
				</div>
			)}

			{!server_data && <Loading />}
		</section>
	)
}

export default RightBlock
