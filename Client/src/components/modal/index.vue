<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 定义属性
defineProps({
  show: Boolean,
})

// 定义发出的事件
const emit = defineEmits(['update:show'])

// 定义关闭模态框的方法
const close = () => {
  emit('update:show', false)
}
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

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
