export default function getDayOfWeek(dateString) {
	const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	const date = new Date(dateString)
	const dayOfWeek = date.getDay()
	return daysOfWeek[dayOfWeek]
}
