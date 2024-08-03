import cl from './header.module.css'
import support_citys from '../../support_citys/support_citys'
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
			Object.keys(item)[0].toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFilteredCitys(() => {
			return e.target.value.length > 0 ? sortedCitys.slice(0, 4) : []
		})
	}
	function clickOnCity(e) {
		setInputValue(e.target.value)
		setIsSearchVisible(false)
		setCity(e.target.value)
		
		const selected_city = support_citys.find(
			item => Object.keys(item)[0] === e.target.value
		)
		
		if (e.target.value !== '') {
			setCoordinates(selected_city[e.target.value])
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
						<select
							multiple
							className={`${cl.list_citys} ${
								isSearchVisible ? cl.openSearch : cl.closeSearch
							}`}
							onChange={e => clickOnCity(e)}
						>
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
