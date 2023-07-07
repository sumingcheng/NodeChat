<script setup lang="ts">
import {provide, reactive} from "vue";

let state = reactive({
  message: "Hello, Vue!",
});

provide("state", state);

</script>

<template>
  <router-view/>
</template>

<style lang="less" scoped>
h1 {
  color: orange;
}

</style>
