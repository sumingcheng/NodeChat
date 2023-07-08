<template>
  <div class="List">
    <div v-for="item in MsgList" :key="item.id">
      <div class="msg">
        <span>{{ item.username + "  " }}</span>
        <span>{{ time(item.timestamp) }}</span>
      </div>
      <div class="content">
        <span>{{ item.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from 'vue'
import dayjs from 'dayjs'

defineProps({
  MsgList: {
    type: Array<any>,
    default: () => [],
  },
})

defineComponent({
  name: 'messageList',
})

const time = (val: number | string) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
}

</script>

<style lang="less" scoped>
.List {
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
