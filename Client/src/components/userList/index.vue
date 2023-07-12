<template>
  <div class="userList">
    <div class="title" style="margin-top: 5px">Welcome ChatRoom</div>
    <div class="content">{{ formattedTime }}</div>
    <div class="title">在线总人数</div>
    <div class="content">81人</div>
    <div class="title">当前在线用户</div>
    <div class="list">
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
      <div>昵称</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue'
import {time} from "@/utils";

const currentTime = ref(new Date().getTime());

const formattedTime = computed(() => {
  return time(currentTime.value); // 根据本地化格式将时间转换为字符串
});

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().getTime();
  }, 1000); // 每秒钟更新一次时间
});

defineComponent({
  name: 'userList',
  props: {
    msg: String,
    time: Number
  }
})


</script>

<style lang="less" scoped>
.userList {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }

  .content {
    font-size: 16px;
    margin-top: 10px;
  }

  .list {
    margin-top: 10px;

    div {
      margin-top: 10px;
    }
  }
}
</style>
