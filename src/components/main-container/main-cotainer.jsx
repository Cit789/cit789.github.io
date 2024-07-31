import cl from './main-container.module.css'

const MainContainer = ({children,theme,header}) => {
    return (
			<div className={`${cl.global_container} ${theme}`}>
				{header}
				<section className={cl.main_container}>
					{children}
				</section>
			</div>
		)
}


export default MainContainer