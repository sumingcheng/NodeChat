<template>
  <div>
    <div>SHIFT+ENTER 发送消息</div>
    <!--    <div>服务器状态</div>-->
    <!--    <div>今日总人数</div>-->
    <!--    <div>在线总人数</div>-->
    <!--    <div></div>-->
    <!--    <div></div>-->
    <!--    <div></div>-->
    <!--    <div></div>-->
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

</style>
