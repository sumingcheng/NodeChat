<template>
  <div class="main">
    <div class="left">
      <UserList/>
    </div>
    <div class="right">
      <div class="content">
        <!--        <div class="trademark"></div>-->
        <div class="message">
          <MessageList/>
        </div>
      </div>
      <div class="chat">
        <!--        <div class="tools">-->
        <!--          <div>emoji</div>-->
        <!--        </div>-->
        <textarea class="chat-input" placeholder="pleaseEnterContent"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject} from "vue";
import MessageList from "@/components/messageList/index.vue";
import UserList from "@/components/userList/index.vue";
// global
const state = inject<any>("state");
console.log(state.message)

</script>

<style lang="less" scoped>
@import '@/assets/index.less';
</style>
