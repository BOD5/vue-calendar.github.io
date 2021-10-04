<template>
  <div class="wrapper">
    <div class="btn"
      @mouseover="hovered = true"
      @mouseleave="hideMenu"
      ref="openBtn"
    >
      <slot name="btn" />
    </div>
    <div
      v-if="isOpen"
      class="menu-window"
      ref="menuWindow"
      :style="positions"
      @mouseover="hovered = true"
      @mouseleave="hideMenu"
    >
      <div class="title">
        <slot name="title" />
      </div>
      <div class="menu">
        <slot name="menu" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
export default {
  name: 'drop-down',
  setup () {
    const isOpen = ref(false)
    const hovered = ref(false)
    const delay = ref(null)
    const windowSize = ref({
      width: 0,
      height: 0
    })
    const openBtn = ref(null)

    const handleResize = () => {
      isOpen.value = false
      windowSize.value.width = window.innerWidth
      windowSize.value.height = window.innerHeight
    }
    window.addEventListener('scroll', () => {
      isOpen.value = false
    })
    window.addEventListener('resize', handleResize)
    handleResize()
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', () => {
        isOpen.value = false
      })
      window.removeEventListener('resize', handleResize)
    })
    watch(hovered, () => {
      if (hovered.value === true) {
        isOpen.value = true
      }
    })
    const positions = computed(() => {
      const {
        top, left, right, bottom
      } = openBtn.value.getBoundingClientRect()
      const pos = {
        position: 'fixed'
      }
      if (windowSize.value.height / 2 > top) {
        pos.top = `${bottom}px`
      } else {
        pos.bottom = `${windowSize.value.height - top}px`
      }
      if (windowSize.value.width / 2 > left) {
        pos.left = `${right}px`
      } else {
        pos.right = `${windowSize.value.width - right + 100}px`
      }
      return pos
    })
    const menuTimer = () => {
      delay.value = setTimeout(() => {
        if (!hovered.value) isOpen.value = false
      }, 100)
    }
    const hideMenu = () => {
      hovered.value = false
      clearTimeout(delay.value)
      menuTimer()
    }
    return {
      hovered,
      hideMenu,
      positions,
      isOpen,
      openBtn
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 0;
  padding: 0;
  align-self: center;
}
.menu-window {
  border-radius: 15px;
  padding: 15px;
  background-color: teal
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}
.title {
  color: white;
}
</style>
