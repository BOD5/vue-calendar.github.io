<template>
  <div class="m-auto max-w-md">
    <section class="mx-2 flex justify-between">
      <h2 class="font-bold">{{ currentMonthName }} </h2>
      <h2 class="font-bold">{{ currentYear }} </h2>
    </section>
    <section class="m-2 flex justify-between">
      <button class="px-2 border rounded-2xl bg-teal-400"
      @click="prev">{{arrowL}}</button>
      <button class="px-2 border rounded-2xl bg-teal-400"
      @click="next">{{arrowR}}</button>
    </section>
    <section class="flex">
      <p
        class="text-center py-4"
        style="width: 14.28%"
        v-for="day in days"
        :key="day"
      >
        {{ day }}
      </p>
    </section>
    <section class="flex  flex-wrap" style="max-height: 150px">
      <p class="text-center" style="width: 14.28%"
        v-for="num in startDay()"
        :key="num"></p>
      <p
        class="hover:bg-green-500 text-center border rounded-2xl"
        style="width: 14.28%"
        v-for="num in daysInMonth()"
        :key="num"
        :class="currentDateClass(num)"
        @click="selectDate(num)"
      >
        {{num}}
        </p>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'Calendar',
  props: {
    displayedDate: {
      type: String,
      required: true
    }
  },
  emits: ['selected-date'],
  setup (props, { emit }) {
    const monthUa = [
      'Січень', 'Лютий', 'Березень',
      'Квітень', 'Травень', 'Червень',
      'Липень', 'Серпень', 'Вересень',
      'Жовтень', 'Листопад', 'Грудень'
    ]
    const currentYear = ref(new Date(props.displayedDate).getFullYear())
    const currentMonth = ref(new Date(props.displayedDate).getMonth())
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
    const arrowR = '-->'
    const arrowL = '<--'

    const daysInMonth = () => {
      return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    }

    const startDay = () => {
      const d = new Date(currentYear.value, currentMonth.value, 1).getDay()
      return (d === 0) ? 6 : d - 1
    }

    const prev = () => {
      if (currentMonth.value === 0) {
        currentYear.value--
        currentMonth.value = 11
      } else {
        currentMonth.value--
      }
    }

    const next = () => {
      if (currentMonth.value === 11) {
        currentYear.value++
        currentMonth.value = 0
      } else {
        currentMonth.value++
      }
    }

    const currentDateClass = (num) => {
      let date = props.displayedDate
      if (!date) {
        date = new Date().toDateString()
      }
      if (new Date(currentYear.value, currentMonth.value, num).toDateString() === date) {
        return 'bg-teal-400 hover:bg-teal-400'
      }
      const calenderFullDate = new Date(currentYear.value, currentMonth.value, num).toDateString()
      const currentFullDate = new Date().toDateString()
      return calenderFullDate === currentFullDate ? 'bg-orange-500' : ''
    }

    const selectDate = (day) => {
      const sD = new Date(currentYear.value, currentMonth.value, day).toDateString()
      emit('selected-date', sD)
    }

    const currentMonthName = computed(() => {
      return monthUa[currentMonth.value]
    })

    return {
      currentMonth,
      currentYear,
      daysInMonth,
      startDay,
      prev,
      next,
      currentDateClass,
      currentMonthName,
      selectDate,
      days,
      arrowR,
      arrowL
    }
  }
}
</script>

<style></style>
