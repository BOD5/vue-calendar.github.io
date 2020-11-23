<template>
  <div class="m-auto justify-center">
    <div class="content-center px-10">
      <div
        id="section-day"
        class="text-center border-t border-b p-4 my-1 bg-indigo-600"
      >
        <h1>
          {{ dateOfStartRun }}
        </h1>
      </div>
    <section
      v-for="el in outputData"
      :key="el"
      class="text-center border-t border-b p-4 my-1"
      :class="runDayClass(el)"
      @click="selectDay(el.date)"
    >
      <div
        v-on:mouseover="customHover(el)"
      >
        <h2>{{el.strD}}</h2>
      </div>
    </section>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      currentDate: (JSON.parse(localStorage.getItem('selectedDay'))) ? JSON.parse(localStorage.getItem('selectedDay')) : new Date().toDateString(),
      dateOfStartRun: (JSON.parse(localStorage.getItem('startDay'))) ? JSON.parse(localStorage.getItem('startDay')) : new Date().toDateString(),
      hovered: Object
    }
  },
  methods: {
    itemsShow (hight, hightEl) {
      return (hight / hightEl)
    },
    runDayClass (el) {
      if (new Date(el.date) < new Date() && new Date(el.date) >= new Date(this.dateOfStartRun)) {
        const rD = (JSON.parse(localStorage.getItem('runDay'))) ? JSON.parse(localStorage.getItem('runDay')) : []
        const size = Math.abs(daysDiff(this.hovered, el.date) - 1)
        const h = (size < 3) ? ` mx-${size}` : 'mx-4'
        if (rD.indexOf(el.date) !== -1) {
          return 'bg-green-500 hover:bg-green-600 ' + h
        } else {
          return 'bg-red-500 hover:bg-red-600 ' + h
        }
      } else {
        return 'bg-gray-700 mx-4'
      }
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
    },
    customHover (el) {
      this.hovered = el.date
      console.log(' - :87 -> this.hovered', this.hovered) // eslint-disable-line no-console
    }
  },
  computed: {
    outputData () {
      const date = new Date(this.currentDate)
      const listDays = []
      const h = window.innerHeight
      date.setDate(date.getDate() - 5 - 1)
      for (let i = 0; i <= (h / 67) - 1; i++) {
        date.setDate(date.getDate() + 1)
        const num = (date >= new Date(this.dateOfStartRun)) ? ' -> ' + daysDiff(date, this.dateOfStartRun) : ''
        const strD = getUaStringDate(date) + num
        const forPush = { date: date.toDateString(), strD }
        listDays.push(forPush)
      }
      return listDays
    }
  }
}

const prefix = (value) => ((value < 10) ? '0' : '') + value

const daysDiff = (d1, d2) => Math.floor((new Date(d1) - new Date(d2)) / (3600 * 24 * 1000) + 1)

const getUaDay = (date) => {
  const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  return days[date.getDay()]
}

const getUaStringDate = (date) => getUaDay(date) + ' ' + prefix(date.getDate()) + '.' + prefix(date.getMonth() + 1) + '.' + date.getFullYear()

</script>
