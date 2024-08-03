import { useContext } from 'react'
import { PageTheme } from '../../App'

import cl from './infoWeather.module.css'

const InfoWeatherModal = ({ offsetX, offsetY, isModalOpen, weather_info }) => {
	
	const theme = useContext(PageTheme)
	return (
		<div
			className={`${cl.info_modal} ${isModalOpen ? cl.open : null} ${theme}`}
			id={cl[theme]}
			style={{ top: `${offsetY}px`, left: `${offsetX}px` }}
		>
			<h2 className={cl.weather_info_logotype}>Информация о погоде на {weather_info.data}</h2>
			<ul className={cl.weather_list}>
				<li className={cl.weather_list_item}>
					Максимальная температура:{weather_info.temp_max}°C
				</li>
				<li className={cl.weather_list_item}>
					Минимальная температура:{weather_info.temp_min}°C
				</li>
				<li className={cl.weather_list_item}>
					Порывы ветра:{weather_info.wind_max}м/с
				</li>
			</ul>
		</div>
	)
}
export default InfoWeatherModal
