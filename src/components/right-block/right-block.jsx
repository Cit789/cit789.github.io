import cl from './right-block.module.css'
import WeatherBlock from '../../widgets/weather_block/weather_block'
import Loading from '../../widgets/loading/loading'
import InfoWeatherModal from '../../widgets/info-weather-modal/infoWeather'
import Server from '../../utils/Server'
import getDayOfWeek from '../../utils/getWeekDay'
import { useEffect, useState, useCallback} from 'react'
const RightBlock = ({ coordinates }) => {
	
	const [server_data, setServer_data] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modal_offsets, setModal_offsets] = useState([-200, -200])
	const [modal_info, setModal_info] = useState({})
	const cursorOnWeather = useCallback(
		(e, weather_info) => {
			setIsModalOpen(true)
			setModal_info(weather_info)
			setModal_offsets(() => {
				const new_offsets = []
				new_offsets[0] = e.clientX - 250
				new_offsets[1] = e.clientY
				return new_offsets
			})
		},
		[server_data]
	)

	const cursorLeaveWeather = useCallback(() => {
		
		setIsModalOpen(false)
		setModal_offsets([-200, -200])
	}, [])

	useEffect(() => {
		
		Server.weather_getForecast(
			coordinates[1],
			coordinates[0],
			8,
			0,
			setServer_data
		).then(data => {
			try {
				const request_result = {
					temp_max: data.daily?.temperature_2m_max,
					temp_min: data.daily?.temperature_2m_min,
					wind_max: data.daily?.wind_speed_10m_max,
					data: data.daily?.time,
				}
				setServer_data(request_result)
			} catch {
				setServer_data(false)
				console.error('ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ')
			}
		})
	}, [coordinates])

	return (
		<section className={cl.right_block}>
			{typeof server_data === 'object' && (
				<div className={cl.grid_container}>
					{server_data.temp_max.map((item, i) => {
						return (
							<WeatherBlock
								key={i}
								i={i}
								data={server_data.data[i] + ` ${getDayOfWeek(server_data.data[i])}`}
								type_ofAnim={i < 4 ? `anim_up_${i}` : `anim_down_${i - 4}`}
								server_data={server_data}
								onMouseMove={cursorOnWeather}
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
			{typeof server_data !== 'object' && <Loading />}
		</section>
	)
}

export default RightBlock
