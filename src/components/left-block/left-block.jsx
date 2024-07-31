import { useEffect, useState } from 'react'
import Server from '../../utils/Server'
import setWeatherTheme from '../../utils/setWeatherTheme'
import cl from './left-block.module.css'
import Loading from '../../widgets/loading/loading'

const LeftBlock = ({ city, setTheme, theme,coordinates }) => {
	const [server_data, setServer_data] = useState(false)
	useEffect(() => {
		Server.weather_getCurrent(55, 55,setServer_data).then(data => {
			const request_result = {
				temperature: data?.current.temperature_2m,
				pressure: data?.current.surface_pressure,
				time: data?.current.time,
				is_day: data?.current.is_day,
				is_rain: data?.current.rain,
				is_snowfall: data?.current.snowfall,
				wind_speed: data?.current.wind_speed,
			}
			setServer_data(request_result)
			const precipitation_arr = [
				request_result.is_rain,
				request_result.is_snowfall,
			]

			setTheme(setWeatherTheme(request_result.is_day, precipitation_arr))
		})
	}, [coordinates,setTheme])
	return (
		<section className={`${cl.left_block} ${theme}`} id={cl[theme]}>
			{typeof server_data === 'object' && (
				<div className={cl.logotypes}>
					<h1 className={cl.logotypes_city}>СанктПетербург</h1>
					<h2 className={cl.logotypes_degrees}>Сейчас: {-55}°C</h2>
					<h3 className={cl.logotypes_pressure}>
						Давление: {server_data.pressure}
					</h3>
					<h3 className={cl.logotypes_wind_speed}>Скорость ветра: 12м/с</h3>
				</div>
			)}
			{typeof server_data !== 'object' && <Loading />}
		</section>
	)
}

export default LeftBlock
