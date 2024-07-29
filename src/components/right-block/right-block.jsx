import cl from './right-block.module.css'
import WeatherBlock from '../../widgets/weather_block/weather_block'
import Loading from '../../widgets/loading/loading'
import InfoWeatherModal from '../../widgets/info-weather-modal/infoWeather'
import { useEffect, useState } from 'react'
import Server from '../../utils/Server'
const RightBlock = () => {
	const [server_data, setServer_data] = useState(false)
	const [modal_offsets, setModal_offsets] = useState([-100, -100])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modal_info, setModal_info] = useState({})
	function cursorOnWeather(e, weather_info) {
		setIsModalOpen(true)
		setModal_info(weather_info)
		setModal_offsets(() => {
			const new_offsets = []
			new_offsets[0] = e.clientX - 250
			new_offsets[1] = e.clientY
			return new_offsets
		})
	}
	function cursorLeaveWeather() {
		setIsModalOpen(false)
		setModal_offsets([-100, -100])
	}

	useEffect(() => {
		Server.weather_getForecast(55, 55, 8).then(data => {
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
					{server_data.temp_max.map((item, i) => {
						const weather_info = {
							temp_max: server_data.temp_max[i],
							temp_min: server_data.temp_min[i],
							wind_max: server_data.wind_max[i],
							data:server_data.data[i]
						}
						return (
							<WeatherBlock
								key={i}
								data={weather_info.data}
								max_temp={weather_info.temp_max}
								min_temp={weather_info.temp_min}
								type_ofAnim={i < 4 ? `anim_up_${i}` : `anim_down_${i - 4}`}
								onMouseMove={e => cursorOnWeather(e, weather_info)}
								onMouseLeave={cursorLeaveWeather}
							/>
						)
					})}
				</div>
			)}
			<InfoWeatherModal
				offsetX={modal_offsets[0]}
				offsetY={modal_offsets[1]}
				isModalOpen={isModalOpen}
				weather_info={modal_info}
			/>
			{!server_data && <Loading />}
		</section>
	)
}

export default RightBlock
