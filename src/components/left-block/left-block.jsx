import { useEffect, useState } from 'react'
import Server from '../../utils/Server'
import setWeatherTheme from '../../utils/setWeatherTheme'
import cl from './left-block.module.css'
import Loading from '../../widgets/loading/loading'

const LeftBlock = ({ city, setTheme, theme, coordinates }) => {
	
	const [server_data, setServer_data] = useState(false)
	useEffect(() => {
		
		Server.weather_getCurrent(
			coordinates[1],
			coordinates[0],
			setServer_data
		).then(data => {
			const request_result = {
				temperature: data?.current.temperature_2m,
				pressure: data?.current.surface_pressure,
				time: data?.current.time,
				is_day: data?.current.is_day,
				is_rain: data?.current.rain,
				is_snowfall: data?.current.snowfall,
				wind_speed: data?.current.wind_speed_10m,
				cloud_cover: data?.current.cloud_cover,
			}
			
			setServer_data(request_result)
			const precipitation_arr = [
				request_result.is_rain,
				request_result.is_snowfall,
			]

			setTheme(
				setWeatherTheme(
					request_result.is_day,
					request_result.cloud_cover,
					precipitation_arr
				)
			)
		})
	}, [coordinates, setTheme])

	return (
		<section className={`${cl.left_block} ${theme}`} id={cl[theme]}>
			{typeof server_data === 'object' && (
				<div className={cl.logotypes}>
					<h1 className={cl.logotypes_city} id={cl[theme]}>
						{city}
					</h1>
					<div>
						<h2 className={cl.logotypes_degrees}>
							Сейчас: {server_data.temperature}°C
						</h2>
						<h3 className={cl.logotypes_pressure}>
							Давление: {server_data.pressure}hpa
						</h3>
						<h3 className={cl.logotypes_wind_speed}>
							Скорость ветра: {server_data.wind_speed}м/с
						</h3>
					</div>
				</div>
			)}
			{typeof server_data !== 'object' && <Loading />}
		</section>
	)
}

export default LeftBlock
