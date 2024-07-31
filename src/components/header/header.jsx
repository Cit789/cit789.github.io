import cl from './header.module.css'
import support_citys from '../../support_citys/support_citys'
import { useState } from 'react'
const Header = ({ setCoordinates }) => {
	const [inputValue, setInputValue] = useState('')
	const [filteredCitys, setFilteredCitys] = useState([])
	function onInput(e) {
		setInputValue(e.target.value)
		const sortedCitys = support_citys.filter(item =>
			Object.keys(item)[0].toLowerCase().includes(inputValue.toLowerCase())
		)
		setFilteredCitys(() => {
			return e.target.value.length > 0 ? sortedCitys.slice(0, 5) : []
		})
	}
	function clickOnCity(e) {
		const selected_city = support_citys.find(
			item => Object.keys(item)[0] === e.target.value
		)

		setCoordinates(selected_city[e.target.value])
	}
	return (
		<header className={cl.header}>
			<nav className={cl.navigation}>
				<div className={cl.variables}>
					<input
						className={cl.search}
						id={cl.searchID}
						onInput={e => onInput(e)}
						value={inputValue}
					/>
					<label htmlFor={cl.searchID} className={cl.label_search}></label>
					{filteredCitys.length > 0 && (
						<select
							className={cl.list_citys}
							onChange={e => clickOnCity(e)}
							defaultValue='Выберите город'
						>
							<option disabled>Выберите город</option>
							{filteredCitys.map(item => (
								<option key={item.id}>{Object.keys(item)[0]}</option>
							))}
						</select>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header
