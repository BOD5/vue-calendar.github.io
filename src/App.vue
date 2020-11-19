<template>
  <div class="bg-indigo-800 h-screen">
    <div class="flex">
      <div style="position: fixed; left: calc(50% - 210px); top: 25px;">
        <button
          class="text-center border rounded-2xl p-4 mx-10 bg-green-700 h-2"
          @click="isModalOpen = true"
        >
        </button>
      </div>
        <Modal v-if="isModalOpen" @close="isModalOpen = false, this.$forceUpdate">
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
      <div class="w-full flex">
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
  setup () {
    const isModalOpen = ref(false)
    return { isModalOpen }
  }
}
</script>
