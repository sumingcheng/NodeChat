<template>
  <div class="main">
    <div class="msg">
      <span>2023年7月7日 17:15:52</span>
    </div>
    <div class="content">
      <span>用户1：</span>
      <span>这是一段文字</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from 'vue'

defineComponent({
  name: 'messageList',
  props: {
    MessageData: Object
  }
})

</script>

<style lang="less" scoped>
.main {
  .msg {
    margin: 4px 0;

    span {
      color: silver;
    }
  }

  .content {
    margin: 8px 0;
  }
}
</style>
