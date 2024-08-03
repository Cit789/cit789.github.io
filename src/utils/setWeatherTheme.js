export default function setWeatherTheme(is_day,cloudness= 0, precipitation) {
	const themes = ['rain', 'snowfall']
	let result_theme = is_day === 0 ? 'dark' : 'light'
	const other_theme = precipitation.findIndex(item => item >= 0.5)
    if(other_theme === -1 && cloudness >= 100){
        return 'cloudness'
    }
	return other_theme !== -1 ? themes[other_theme] : result_theme
}
