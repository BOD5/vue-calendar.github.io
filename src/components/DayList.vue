<template>
  <div class="m-auto justify-center">
    <div class="content-center px-10">
    <section
      v-for="el in daysList"
      :key="el"
      class="text-center border-t border-b p-4"
      :class="runDayClass(el)"
      @click="selectDay(el.date)"
      v-on:mouseover="customHover(el)"
    >
      <h2>{{el.strD}}</h2>
    </section>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'

import dateToUaStr from '../utils/uaStrDate'

export default {
  props: {
    displayedDate: {
      type: String,
      required: true
    },
    dateOfStartRun: {
      type: String,
      required: true
    },
    runDays: {
      type: Array,
      required: true
    }
  },
  emits: ['select-day'],
  setup (props, context) {
    const hovered = ref(null)

    const daysDiff = (d1, d2) => Math.floor((new Date(d1) - new Date(d2)) / (3600 * 24 * 1000) + 1)

    const runDayClass = (el) => {
      const { dateOfStartRun } = props
      const size = Math.abs(daysDiff(hovered.value, el.date) - 1)
      const h = (size < 5) ? ` mx-${size}` : 'mx-4'
      return (new Date(el.date) < new Date() && new Date(el.date) >= new Date(dateOfStartRun))
        ? (props.runDays.indexOf(el.date) !== -1)
          ? 'bg-green-500 hover:bg-green-600 ' + h
          : 'bg-red-500 hover:bg-red-600 ' + h
        : 'bg-gray-700 ' + h
    }

    const selectDay = (date) => {
      if (new Date(date) < new Date() && new Date(date) >= new Date(props.dateOfStartRun)) {
        context.emit('selected-day', date)
      }
    }

    const customHover = (el) => { hovered.value = el.date }

    const daysList = computed(() => {
      const { displayedDate, dateOfStartRun } = props
      console.log(' - props:78 >', { displayedDate, dateOfStartRun })
      const date = new Date(displayedDate)
      const listDays = []
      date.setDate(date.getDate() - 10 - 1)
      for (let i = 0; i <= 20; i++) {
        date.setDate(date.getDate() + 1)
        const num = (date >= new Date(dateOfStartRun)) ? ' -> ' + daysDiff(date, dateOfStartRun) : ''
        const strD = dateToUaStr(date) + num
        const forPush = { date: date.toDateString(), strD }
        listDays.push(forPush)
      }
      return listDays
    })

    return {
      runDayClass,
      selectDay,
      customHover,
      daysList
    }
  }
}

</script>

<style scoped>
section {
  cursor: pointer;
}
</style>
