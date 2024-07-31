import { useContext } from 'react'
import { PageTheme } from '../../App'
import cl from './weather_block.module.css'

const WeatherBlock = ({
	max_temp,
	min_temp,
	data,
	type_ofAnim,
	onMouseMove,
	onMouseLeave,
}) => {
	const theme = useContext(PageTheme)
	return (
		<article
			className={`${cl.weather_container} ${cl[type_ofAnim]} ${theme}`}
			id={cl[theme]}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			<h2 className={cl.weather_container_max_deegres}>{max_temp}°C</h2>
			<h3 className={cl.weather_container_min_deegres}>{min_temp}°C</h3>
			<h3 className={cl.weather_container_data}>{data}</h3>
		</article>
	)
}

export default WeatherBlock
