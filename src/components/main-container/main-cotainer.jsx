import cl from './main-container.module.css'

const MainContainer = ({children}) => {
    return (
        <section className={cl.main_container}>
            {children}
        </section>
    )
}


export default MainContainer