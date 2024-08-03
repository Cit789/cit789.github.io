import cl from './loading.module.css'
import {PageTheme} from '../../App'
import { useContext } from 'react'
const Loading = () => {
	const theme = useContext(PageTheme)
	return (
		<div className={cl.loading} id={cl[theme]}>
			<div className={cl.inside_loading} id={cl[theme]}></div>
		</div>
	)
}

export default Loading
