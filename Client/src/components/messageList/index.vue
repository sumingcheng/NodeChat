<template>
  <div>
    list
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from 'vue'

defineComponent({
  name: 'messageList',
  props: {
    msg: String
  }
})

</script>

<style lang="less" scoped>

</style>
