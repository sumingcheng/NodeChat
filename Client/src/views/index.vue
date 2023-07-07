<template>
  <div class="main">
    <div class="top">
      <div class="left">
        <UserList/>
      </div>
      <div class="right">
        <div class="content">
          <!--        <div class="trademark"></div>-->
          <div class="message">
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
            <MessageList/>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <!--        <div class="tools">-->
      <!--          <div>emoji</div>-->
      <!--        </div>-->
      <textarea class="chat-input" placeholder="pleaseEnterContent" v-model="text" @keydown.enter="toMsg"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// socket
import {inject, onMounted, onUnmounted, ref} from "vue"
import MessageList from "@/components/messageList/index.vue"
import UserList from "@/components/userList/index.vue"
import {io, Socket} from 'socket.io-client'
// global
const state = inject<any>("state")
console.log(state)
const text = ref('');
const socket = ref<Socket | null>(null)

const toMsg = () => {
  if (text.value) {
    socket.value?.emit('chat message', text.value)
    text.value = ''
  }
}

onMounted(() => {
  socket.value = io('http://localhost:33445')

  socket.value.on('connect', () => {
    console.log('Connected to the server')
  })

  socket.value.on('chat message', (msg: string) => {
    console.log('Received a message: ' + msg)
  })

  socket.value.emit('chat message', 'Hello Server!')
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})

</script>

<style lang="less" scoped>
@import '@/assets/index.less';
</style>
