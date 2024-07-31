export default function setWeatherTheme(is_day, precipitation) {
    const themes = ['rain','snowfall']
   let result_theme = is_day === 0 ?  'dark' : 'light'
    const other_theme = precipitation.findIndex(item=>item >= 0.5)
    return other_theme !== -1 ? themes[other_theme] : result_theme
}