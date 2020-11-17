<template>
  <div>
    <button
      class="text-center border rounded-2xl p-4 mx-10 bg-green-700"
      @click="isModalOpen = true"
    >
    Календар
    </button>
    <Modal v-if="isModalOpen" @close="isModalOpen = false">
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
