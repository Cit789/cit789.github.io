import cl from './loading.module.css'
const Loading = () => {
	
	return (
		<div className={cl.loading}>
			<div className={cl.inside_loading}></div>
		</div>
	)
}

export default Loading
