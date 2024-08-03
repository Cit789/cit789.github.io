import { useContext } from 'react'
import { PageTheme } from '../../App'
import { memo } from 'react'
import cl from './weather_block.module.css'

const WeatherBlock = memo(
	({ i, server_data, data, type_ofAnim, onMouseMove, onMouseLeave }) => {
		const weather_info = {
			temp_max: server_data.temp_max[i],
			temp_min: server_data.temp_min[i],
			wind_max: server_data.wind_max[i],
			data: server_data.data[i],
		}

		const theme = useContext(PageTheme)
		return (
			<article
				className={`${cl.weather_container} ${cl[type_ofAnim]} ${theme}`}
				id={cl[theme]}
				onMouseMove={e => onMouseMove(e, weather_info)}
				onMouseLeave={onMouseLeave}
			>
				<h2 className={cl.weather_container_max_deegres}>
					{weather_info.temp_max}°C
				</h2>
				<h3 className={cl.weather_container_min_deegres}>
					{weather_info.temp_min}°C
				</h3>
				<h3 className={cl.weather_container_data}>{data}</h3>
			</article>
		)
	}
)

export default WeatherBlock
