<template>
  <div class="m-auto justify-center">
    <section
     v-for="el in outputData()"
     :key="el"
     class="text-center border rounded-2xl p-4 mx-10"
     :class="runDayClass(el.date)"
     @click="selectDay(el.date)"
    >
      <div>
        <h2>{{el.strD}}</h2>
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
      currentDate: new Date().toDateString(),
      currentData: Object,
      dateOfStartRun: new Date(),
      days: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    }
  },
  methods: {
    itemsShow (hight, hightEl) {
      return (hight / hightEl)
    },
    runDayClass (date) {
      const rD = (JSON.parse(localStorage.getItem('runDay'))) ? JSON.parse(localStorage.getItem('runDay')) : []
      if (new Date(date) > new Date()) {
        return 'bg-gray-700'
      }
      if (rD.indexOf(date) !== -1) {
        return 'bg-green-500 hover:bg-green-600'
      } else {
        return 'bg-red-500 hover:bg-red-600'
      }
    },
    getDataFromLS () {
      const date = JSON.parse(localStorage.getItem('selectedDay'))
      const dateSt = JSON.parse(localStorage.getItem('startDay'))
      if (date) {
        this.currentDate = date
      }
      if (dateSt) {
        this.dateOfStartRun = new Date(dateSt).toDateString()
      }
    },
    outputData () {
      this.getDataFromLS()
      const date = new Date(this.currentDate)
      const listDays = []
      const h = document.documentElement.clientHeight
      date.setDate(date.getDate() - 5 - 1)
      for (let i = 0; i <= (h / 58) - 1; i++) {
        date.setDate(date.getDate() + 1)
        const num = (date >= new Date(this.dateOfStartRun)) ? ' -> ' + Math.floor((date - new Date(this.dateOfStartRun)) / (3600 * 24 * 1000) + 1) : ''
        const strD = this.days[date.getDay()] + ' ' + prefix(date.getDate()) + '.' + prefix(date.getMonth() + 1) + '.' + date.getFullYear() + num
        const forPush = { date: date.toDateString(), strD }
        listDays.push(forPush)
      }
      return listDays
    },
    selectDay (date) {
      if (new Date(date) < new Date() && new Date(date) >= new Date(this.dateOfStartRun)) {
        const rD = (JSON.parse(localStorage.getItem('runDay'))) ? JSON.parse(localStorage.getItem('runDay')) : []
        if (rD.indexOf(date) === -1) rD.push(date)
        else {
          rD.splice(rD.indexOf(date), 1)
        }
        localStorage.setItem('runDay', JSON.stringify(rD))
      }
      this.$forceUpdate()
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
