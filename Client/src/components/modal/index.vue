<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 定义属性
defineProps({
  show: Boolean,
})
</script>

<style scoped lang="less">
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #000;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 20%;
}
</style>
