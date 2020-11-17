<template>
  <div class="m-auto">
    <section
     v-for="el in outputData()"
     :key="el"
     class="text-center border rounded-2xl p-4 mx-10"
     @click="selectDay"
    >
      <div>
        <h2>{{el}}</h2>
      </div>
    </section>
  </div>
</template>
<script>

// export function render () {
//   console.log('im exported')
//   DayList.methods.render()
// }
export default {
  data () {
    return {
      currentDate: new Date().getUTCDate(),
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentData: Object,
      days: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    }
  },
  methods: {
    itemsShow (hight, hightEl) {
      return (hight / hightEl)
    },
    showList () {
      const date = JSON.parse(localStorage.getItem('selectedDay'))
      this.currentData = date
      this.currentDate = date.day
      this.currentYear = date.year
      this.currentMonth = date.month
    },
    outputData () {
      this.showList()
      const date = new Date(this.currentYear, this.currentMonth, this.currentDate)
      const listDay = []
      date.setDate(date.getDate() - 5 - 1)
      for (let i = 0; i <= 10; i++) {
        date.setDate(date.getDate() + 1)
        listDay.push(this.days[date.getDay()] + ' ' + prefix(date.getDate()) + '.' + prefix(date.getMonth() + 1) + '.' + date.getFullYear() + ' => ')
      }
      return listDay
    },
    selectDay () {
      console.log(' - :54 -> this', this) // eslint-disable-line no-console
      this.outputData()
    }
  },
  computed: {
  }
}

function prefix (value) {
  return ((value < 10) ? '0' : '') + value
}

// export default DayList
</script>
