<template>
  <div class="userList">
    <div class="title" style="margin-top: 5px">服务器时间</div>
    <div class="content">2023年7月12日 09:27:57</div>
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
import {defineComponent} from 'vue'

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
