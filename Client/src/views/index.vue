<template>
  <div class="main">
    <div class="top">
      <div class="left" v-show="!isMobile">
        <UserList :UserListData="UserListData" @update:editNickName="editNickName" :nickname="nickname"/>
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
      <textarea class="chat-input" placeholder="ENTER 发送消息" v-model="ClientData.message"
                @keydown.enter="toMsg" @keydown.enter.prevent/>
    </div>
    <Modal :show="showModal">
      <span class="close" @click="showModal=false">&times;</span>
      <h2 style="padding-bottom:10px ">请输入的昵称</h2>
      <input class="MoInput" v-model="username" @keydown.enter="initName"/>
      <div class="randomName">想不出？
        <button @click="randomName">随机一个</button>
        <button @click="initName">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue"
import MessageList from "@/components/messageList/index.vue"
import UserList from "@/components/userList/index.vue"
import Modal from "@/components/modal/index.vue"
import {io, Socket} from 'socket.io-client'
import {generateNickname, getLocalStorage, isMobile, setLocalStorage} from "@/utils/index.ts";
import {User} from "@/views/type.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL
const MsgList = reactive<Array<any>>([]);
const ClientData = ref<any>({});
const socket = ref<Socket | null>(null)
const username = ref('')
let UserListData = reactive([] as User[])
let rightRef = ref<null | HTMLDivElement>()
let showModal = ref(true)
let contentHeight = ref<any>()
let nickname = ref('')
let isLeave = ref(false)

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
    nickname.value = username.value
    ClientData.value.type = 'text'
    showModal.value = false
    setLocalStorage('username', username.value)
    disconnect()
    initConnect()
  }
}

const editNickName = () => {
  showModal.value = !showModal.value
}

// 建立连接
const initConnect = () => {
  const username = getLocalStorage('username');
  socket.value = io(`${BASE_URL}`, {query: {username: username}})

  socket.value?.on('connect', () => {
    console.log('已连接到服务器')
  })

  socket.value.on('onlineUsers', (onlineUsers: Array<any>) => {
    if (Array.isArray(onlineUsers) && onlineUsers.length > 0) {
      UserListData.splice(0, UserListData.length, ...onlineUsers);
    }
  });

  socket.value?.on('disconnect', () => {
    reconnect()
  })

  socket.value?.on('Client', (msgObj: any) => {
    msgObj.message = decodeURIComponent(msgObj.message)
    MsgList.push(msgObj)
    if (isLeave.value) {
      titleFlash()
    }
    nextTick(() => {
      scrollToBottom()
    });
  });
}

// 标题栏闪烁
const titleFlash = () => {
  document.title = '💬有新的消息等待您的回复！';
  console.log('闪烁')
}

// 断开连接
const disconnect = () => {
  if (socket.value) {
    socket.value.disconnect()
  }
}

//重新连接
const reconnect = () => {
  const st = setTimeout(() => {
    initConnect()
  }, 1000)
  clearTimeout(st)
}

// 随机昵称
const randomName = () => {
  username.value = generateNickname()
}

const scrollToBottom = () => {
  if (rightRef.value) {
    rightRef.value.scrollTop = rightRef.value.scrollHeight;
  }
}

onMounted(() => {
  let LocalName = getLocalStorage('username')
  // 获取昵称
  if (LocalName) {
    ClientData.value.username = LocalName;
    nickname.value = LocalName;
    showModal.value = false;
    initConnect()
  } else {
    showModal.value = true;
  }

  window.onblur = function () {
    isLeave.value = true
    document.title = '🚀您的应用正在等待您的返回';
    console.log('离开')
  }

  window.onfocus = function () {
    isLeave.value = false
    document.title = 'SMC ChatRoom';
    console.log('回来')
  }
})

onUnmounted(() => {
  disconnect()  // 在组件卸载时断开连接
})

</script>

<style lang="less" scoped>
@import '@/assets/index.less';
</style>
