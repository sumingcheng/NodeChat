import {createApp} from 'vue'
import '@/assets/reset.css'
import App from './App.vue'
import router from '@/routes/index.ts'
// import dayjs from 'dayjs'
// // 中文本地化插件
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

createApp(App).use(router).mount('#app')
