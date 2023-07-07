import {createApp} from 'vue'
import '@/assets/reset.css'
import App from './App.vue'
import router from '@/routes/index.ts'

createApp(App)
    .use(router)
    .mount('#app')


