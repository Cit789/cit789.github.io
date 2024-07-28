export default class Server {
	static #start_url = 'https://api.open-meteo.com/v1/forecast?'
	static #dailyReq = {
		max_temperature: ',temperature_2m_max',
		min_temperature: ',temperature_2m_min',
		max_wind_speed: ',wind_speed_10m_max',
	}
	static #currentReq = {
		temperature: ',temperature_2m',
		isday: ',is_day',
		isRain: ',rain',
		isShowers: ',showers',
		isSnowfall: ',snowfall',
		pressure: ',surface_pressure',
		wind_speed: ',wind_speed_10m',
	}

	static async weather_getAll(long, lat, forecast_days = 7, past_days = 0) {
		const currentRequests = Object.values(Server.#currentReq).join('')
		const dailyRequests = Object.values(Server.#dailyReq).join('')
		const meta = await fetch(
			Server.#start_url +
				`longitude=${long}&latitude=${lat}&daily=${dailyRequests}&current=${currentRequests}
				&timezone=auto&forecast_days=${forecast_days}&past_days=${past_days}`
		)
		return await meta.json()
	}
	static async weather_getForecast(
		long,
		lat,
		forecast_days = 7,
		past_days = 0
	) {
		const dailyRequests = Object.values(Server.#dailyReq).join('')
		const meta = await fetch(
			Server.#start_url +
				`longitude=${long}&latitude=${lat}&daily=${dailyRequests}
				&timezone=auto&forecast_days=${forecast_days}&past_days=${past_days}`
		)
		return await meta.json()
	}
	static async weather_getCurrent(long, lat) {
		const currentRequests = Object.values(Server.#currentReq).join('')
		const meta = await fetch(
			Server.#start_url +
				`longitude=${long}&latitude=${lat}&current=${currentRequests}
				&timezone=auto`
		)
		return await meta.json()
	}
}
