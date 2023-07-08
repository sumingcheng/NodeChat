<template>
  <div class="main">
    <div class="top">
      <div class="left">
        <UserList/>
      </div>
      <div class="right">
        <div class="content" ref="contentHeight">
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
    <Modal v-model:show="showModal">
      <h2 style="padding-bottom:10px ">请填写的昵称</h2>
      <input style="width: 80%" v-model="username" @keydown.enter="initName"/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
// Socket
import {onMounted, onUnmounted, reactive, ref} from "vue"
import MessageList from "@/components/messageList/index.vue"
import UserList from "@/components/userList/index.vue"
import Modal from "@/components/modal/index.vue"
import {io, Socket} from 'Socket.io-client'

const MsgList = reactive<Array<any>>([]);
const ClientData = ref<any>({});
const socket = ref<Socket | null>(null)
const username = ref('')
let showModal = ref(true)
let contentHeight = ref<number>(0)

const toMsg = () => {
  if (ClientData.value.message) {
    ClientData.value.message = encodeURIComponent(ClientData.value.message)
    socket.value?.emit('ServerMessage', (ClientData.value))
    // 清空 ClientData 对象
    ClientData.value.message = ""
  }
}

const initName = () => {
  if (username.value) {
    showModal.value = false
    ClientData.value.username = username.value
    ClientData.value.type = 'text'
  }
}

const backToTheBottom = (content: any) => {
  console.log(content.value.scrollHeight)
  content.value.scrollTop = content.value.scrollHeight;
}

onMounted(() => {
  socket.value = io('http://localhost:33445')
  socket.value?.on('connect', () => {
    console.log('已连接到服务器')
  })
  socket.value?.on('Client', (msgObj: any) => {
    msgObj.message = decodeURIComponent(msgObj.message)
    MsgList.push(msgObj)
    backToTheBottom(contentHeight)
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
