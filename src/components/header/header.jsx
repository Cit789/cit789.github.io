import cl from './header.module.css'
import support_citys from '../../support_citys/support_citys'
import getValidString from '../../utils/getValidString'
import { useState } from 'react'
const Header = ({ setCoordinates, setCity }) => {
	const [inputValue, setInputValue] = useState('')
	const [filteredCitys, setFilteredCitys] = useState([])
	const [isSearchVisible, setIsSearchVisible] = useState(false)
	
	document.addEventListener('click', e => {
		if (e.target.className !== cl.search) {
			setIsSearchVisible(false)
		}
	})

	function onInput(e) {
		
		setIsSearchVisible(true)
		setInputValue(e.target.value)
		const sortedCitys = support_citys.filter(item =>
			Object.keys(item)[0].toLowerCase().includes(getValidString(e.target.value))
		)
		setFilteredCitys(() => {
			return e.target.value.length > 0 ? sortedCitys.slice(0, 4) : []
		})
	}
	function clickOnCity(city) {
		setInputValue(city)
		setIsSearchVisible(false)
		setCity(city)
		
		const selected_city = support_citys.find(
			item => Object.keys(item)[0] === city
		)
		
		if (city !== '') {
			setCoordinates(selected_city[city])
		}
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
					{filteredCitys.length > 0 && isSearchVisible && (
						<ul
							className={`${cl.list_citys} ${
								isSearchVisible ? cl.openSearch : cl.closeSearch
							}`}
							
						>
							{filteredCitys.map(item => (
								<li
									key={item.id}
									onClick={() => clickOnCity(Object.keys(item)[0])}
								>
									{Object.keys(item)[0]}
								</li>
							))}
						</ul>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header
