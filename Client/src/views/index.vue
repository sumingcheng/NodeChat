<template>
  <div class="main">
    <div class="top">
      <div class="left">
        <UserList/>
      </div>
      <div class="right" ref="rightRef">
        <div class="content" :ref="contentHeight">
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
                @keydown.shift.enter="toMsg" @keydown.shift.enter.prevent/>
    </div>
    <Modal v-model:show="showModal">
      <h2 style="padding-bottom:10px ">请输入的昵称</h2>
      <input style="width: 80%" v-model="username" @keydown.enter="initName"/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue"
import MessageList from "@/components/messageList/index.vue"
import UserList from "@/components/userList/index.vue"
import Modal from "@/components/modal/index.vue"
import {io, Socket} from 'Socket.io-client'
import {getSessionStorage, setSessionStorage} from "@/utils/index.ts";

const MsgList = reactive<Array<any>>([]);
const ClientData = ref<any>({});
const socket = ref<Socket | null>(null)
const username = ref('')
let rightRef = ref<null | HTMLDivElement>()
let showModal = ref(true)
let contentHeight = ref<any>()

const toMsg = () => {
  if (ClientData.value.message && ClientData.value.message.length > 0) {
    ClientData.value.message = encodeURIComponent(ClientData.value.message)
    socket.value?.emit('ServerMessage', ClientData.value)
    // 清空 ClientData 对象
    ClientData.value.message = '';
  }
}

// 初始化昵称
const initName = () => {
  if (username.value) {
    ClientData.value.username = username.value
    ClientData.value.type = 'text'
    showModal.value = false
    setSessionStorage('username', username.value)
  }
}

const scrollToBottom = () => {
  if (rightRef.value) {
    rightRef.value.scrollTop = rightRef.value.scrollHeight;
  }
}
const BASE_URL = `http://82.157.118.166:33445`

onMounted(() => {
  socket.value = io(`${BASE_URL}`)
  socket.value?.on('connect', () => {
    console.log('已连接到服务器')
  })

  socket.value?.on('Client', (msgObj: any) => {
    msgObj.message = decodeURIComponent(msgObj.message)
    MsgList.push(msgObj)
    nextTick(() => {
      scrollToBottom()
    });
  });

  // 获取昵称
  if (getSessionStorage('username')) {
    ClientData.value.username = getSessionStorage('username')
    showModal.value = false
  }
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
