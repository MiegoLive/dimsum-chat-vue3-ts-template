<template>
  <DanmuView v-if="danmu" />
</template>

<script lang="ts" setup>
import DanmuView from './components/DanmuView.vue'
const urlParams = new URLSearchParams(window.location.search)

const danmu = (() => {
  if (urlParams.has('danmu')) {
    return true
  }
  return false
})()
</script>

<style lang="scss" scoped>

</style>
