const prefix = (value) => ((value < 10) ? '0' : '') + value

const getUaDay = (date) => {
  const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  return days[date.getDay()]
}

const dateToUaStr = (date) => getUaDay(date) + ' ' + prefix(date.getDate()) + '.' + prefix(date.getMonth() + 1) + '.' + date.getFullYear()

export default dateToUaStr
