<template>
  <div class="m-auto">
    <h1 class="text-2xl my-2 text-center"> Calendar </h1>
    <section class="mx-3 flex justify-between">
      <h2 class="font-bold">{{ currentMonthName }} </h2>
      <h2 class="font-bold">{{ currentYear }} </h2>
    </section>
    <section class="m-3 flex justify-between">
      <button class="px-2 border rounded-2xl bg-teal-400"
      @click="prev">{{arrowL}}</button>
      <button class="px-2 border rounded-2xl bg-teal-400"
      @click="next">{{arrowR}}</button>
    </section>
    <section class="flex">
      <p class="text-center py-4" style="width: 14.28%"
      v-for="day in days" :key="day">{{ day }}</p>
    </section>
    <section class="flex  flex-wrap">
      <p class="text-center" style="width: 14.28%"
        v-for="num in startDay()"
        :key="num"></p>
      <p
        class="text-center border rounded-2xl "
        style="width: 14.28%"
        v-for="num in daysInMonth()"
        :key="num"
        :class="currentDateClass(num)"
      >
        {{num}}
        </p>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date().getUTCDate(),
      monthUa: [
        'Січень', 'Лютий', 'Березень',
        'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень',
        'Жовтень', 'Листопад', 'Грудень'
      ],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
      arrowR: '-->',
      arrowL: '<--'
    }
  },
  methods: {
    daysInMonth () {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    },
    startDay () {
      const d = new Date(this.currentYear, this.currentMonth, 1).getDay()
      return (d === 0) ? 6 : d - 1
    },
    prev () {
      if (this.currentMonth === 0) {
        this.currentYear--
        this.currentMonth = 11
      } else {
        this.currentMonth--
      }
    },
    next () {
      if (this.currentMonth === 11) {
        this.currentYear++
        this.currentMonth = 0
      } else {
        this.currentMonth++
      }
    },
    currentDateClass (num) {
      const calenderFullDate = new Date(this.currentYear, this.currentMonth, num).toDateString()
      const currentFullDate = new Date().toDateString()
      return calenderFullDate === currentFullDate ? 'bg-orange-500' : ''
    }
  },
  computed: {
    currentMonthName () {
      return this.monthUa[this.currentMonth]
    }
  }
}
</script>

<style></style>
