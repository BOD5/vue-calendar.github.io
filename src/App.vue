<template>
  <div class="bg-indigo-800 min-h-screen">
    <div class="text-xl text-white font-serif w-full text-center">
      <h1>Your own running calendar</h1>
    </div>
    <div class="flex justify-center">
      <div>
        <drop-down>
          <template v-slot:btn>
            <button
              class="text-center rounded-2xl p-4 bg-green-700"
            >
            </button>
          </template>
          <template v-slot:title>
            <h2>Меню</h2>
            <hr>
          </template>
          <template v-slot:menu>
            <button-with-line class="text-white" @click="toDate">На дату</button-with-line>
            <button-with-line class="text-white" @click="setStartDate">Дата початку</button-with-line>
          </template>
        </drop-down>
      </div>
      <div class="flex">
        <DayList
          :runDays="runDay"
          :dateOfStartRun="dateOfStartRun"
          :displayedDate="displayedDate"
          @selected-day="selectedDay"
        />
      </div>
    </div>
    <modal-window
      v-if="isOpen"
      @close="closeModal"
    >
      <template #title>
        <h2>
          {{ title }}
        </h2>
      </template>
      <template #body>
        <div class="w-full flex">
          <Calendar :displayed-date="openDay" @selected-date="selectedDate[`${selFun}`]"/>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script>
import DayList from './components/DayList'
import { ref, watch } from 'vue'
import DropDown from './components/DropDown.vue'
import ButtonWithLine from './components/ui/ButtonWithLine.vue'
import ModalWindow from './components/ModalWindow.vue'
import Calendar from './components/Calendar.vue'

export default {
  components: { DayList, DropDown, ButtonWithLine, ModalWindow, Calendar },
  setup () {
    const displayedDate = ref(new Date().toDateString())
    const isModalOpen = ref(false)
    const dateOfStartRun = ref((JSON.parse(localStorage.getItem('dateOfStartRun'))) ? JSON.parse(localStorage.getItem('dateOfStartRun')) : new Date().toDateString())
    const runDay = ref((JSON.parse(localStorage.getItem('runDay'))) ? JSON.parse(localStorage.getItem('runDay')) : [])

    const isOpen = ref(false)
    const title = ref('')
    const openDay = ref(null)
    const selectedDate = {
      displayed: (date) => {
        displayedDate.value = date
        isOpen.value = false
      },
      start: (date) => {
        dateOfStartRun.value = date
        isOpen.value = false
      }
    }
    const selFun = ref('')

    const toDate = () => {
      title.value = 'Перейти на дату'
      openDay.value = displayedDate.value
      isOpen.value = true
      selFun.value = 'displayed'
    }

    const setStartDate = () => {
      title.value = 'Оберіть дату початку'
      openDay.value = dateOfStartRun.value
      isOpen.value = true
      selFun.value = 'start'
    }

    const closeModal = () => {
      isOpen.value = false
    }

    const selectedDay = (day) => {
      if (runDay.value.indexOf(day) === -1) runDay.value = [...runDay.value, day]
      else {
        runDay.value.splice(runDay.value.indexOf(day), 1)
      }
    }
    watch(runDay, (current, old) => {
      localStorage.setItem('runDay', JSON.stringify(current))
    })

    watch(dateOfStartRun, (current, old) => {
      localStorage.setItem('dateOfStartRun', JSON.stringify(current))
    })
    return {
      isModalOpen,
      displayedDate,
      dateOfStartRun,
      selectedDay,
      selectedDate,
      runDay,
      toDate,
      closeModal,
      isOpen,
      title,
      openDay,
      setStartDate,
      selFun
    }
  }
}
</script>

<style>
* {
  transition: .5s;
}
</style>
