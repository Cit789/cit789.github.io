import cl from './weather_block.module.css'

const WeatherBlock = ({max_temp,min_temp,data}) =>{
    return (
			<article className={cl.weather_container}>
				<h2 className={cl.weather_max_deegres}>{max_temp}</h2>
				<h3 className={cl.weather_min_deegres}>{min_temp}</h3>
				<h3 className={cl.weather_data}>{data}</h3>
			</article>
		)
}


export default WeatherBlock