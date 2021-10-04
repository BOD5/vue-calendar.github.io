<template>
  <button class="line-btn">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'button-with-line'
}
</script>

<style scoped lang="scss">
.line-btn {
  background-color: transparent;
  border: none;
  padding: 10px;
  &::after {
    content: "";
    width: 0%;
    height: 2px;
    background: orange;
    display: block;
    margin: auto;
    transition: 0.5s;
  }
  &:hover::after {
    width: 100%;
  }
}
</style>
