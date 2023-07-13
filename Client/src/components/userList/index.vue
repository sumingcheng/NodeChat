<template>
  <div class="userList">
    <div class="title" style="margin-top: 5px">Welcome ChatRoom</div>
    <div class="content">{{ formattedTime }}</div>
    <div class="title">当前昵称</div>
    <div class="editNickName">
      <div class="content">{{ nickname || "未输入" }}</div>
      <button @click="editNickName">修改昵称</button>
    </div>
    <div class="title">在线总人数</div>
    <div class="content">{{ UserListData.length }}人</div>
    <div class="title">当前在线用户</div>
    <div class="list">
      <div v-for="item in UserListData" :key="item.id">{{ item.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue'
import {time} from "@/utils";
import {User} from "@/views/type.ts";

const currentTime = ref(new Date().getTime());

const formattedTime = computed(() => {
  return time(currentTime.value); // 根据本地化格式将时间转换为字符串
});

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().getTime();
  }, 1000); // 每秒钟更新一次时间
});

const emit = defineEmits(['update:editNickName'])

const editNickName = () => {
  emit('update:editNickName');
}

defineComponent({
  name: 'userList',
})

defineProps({
  UserListData: {
    type: Array as () => User[],
    default: () => []
  },
  nickname: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.userList {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .editNickName {
    position: relative;

    button {
      position: absolute;
      cursor: pointer;
      border-radius: 5px;
      padding: 1px 4px;
      margin-right: 10px;
      left: 60px;
      top: 0;
    }
  }

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
