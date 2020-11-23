<template>
  <div class="bg-indigo-800 min-h-screen">
    <div class="flex">
      <div style="position: fixed; left: calc(50% - 210px); top: 25px;">
        <button
          class="text-center border rounded-2xl p-4 mx-10 bg-green-700 h-2"
          @click="isModalOpen = true"
        >
        </button>
      </div>
        <Modal
        v-if="isModalOpen"
        @close="fn"
        >
          <template #title>
            <h2>
              Start you running
            </h2>
          </template>
          <template #body>
          <div class="w-full flex">
            <Calendar />
          </div>
          </template>
        </Modal>
      <div class="flex w-full">
        <DayList />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar'
import DayList from './components/DayList'
import Modal from './components/Modal'
import { ref } from 'vue'

export default {
  components: { DayList, Modal, Calendar },
  methods: {
    // up () {
    //   this.$forceUpdate()
    // },
    fn () {
      console.log(' - :53 -> ', JSON.parse(localStorage.getItem('selectedDay'))) // eslint-disable-line no-console
      this.isModalOpen = false
      // this.up()
    }
  },
  computed: {
    // curD () {
    //   return (JSON.parse(localStorage.getItem('selectedDay'))) ? JSON.parse(localStorage.getItem('selectedDay')) : new Date().toDateString()
    // }
  },
  setup () {
    const isModalOpen = ref(false)
    return { isModalOpen }
  }
}
</script>
