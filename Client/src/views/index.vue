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
            <MessageList :MsgList="MsgList"/>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <!--        <div class="tools">-->
      <!--          <div>emoji</div>-->
      <!--        </div>-->
      <textarea class="chat-input" placeholder="pleaseEnterContent" v-model="ClientData.message"
                @keydown.enter="toMsg"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// Socket
import {onMounted, onUnmounted, reactive, ref} from "vue"
import MessageList from "@/components/messageList/index.vue"
import UserList from "@/components/userList/index.vue"
import {io, Socket} from 'Socket.io-client'

const MsgList = reactive<Array<any>>([]);
const ClientData = ref<any>({});
const socket = ref<Socket | null>(null)

const toMsg = () => {
  ClientData.value.username = 'smc'
  if (ClientData.value.message) {
    socket.value?.emit('ServerMessage', ClientData.value)
    // 清空 ClientData 对象
    ClientData.value.message = ""
  }
}

onMounted(() => {
  socket.value = io('http://localhost:33445')

  socket.value?.on('connect', () => {
    console.log('已连接到服务器')
  })

  socket.value?.on('Client', (msgObj: object) => {
    MsgList.push(msgObj)
  });
})

onUnmounted(() => {
  if (socket.value) {
    socket.value?.disconnect()
  }
})

</script>

<style lang="less" scoped>
@import '@/assets/index.less';
</style>
