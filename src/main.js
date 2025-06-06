import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'
import axios from 'axios'
import { createPinia } from 'pinia'

// 创建 Pinia 实例
const pinia = createPinia();

// 设置axios默认携带cookie
axios.defaults.withCredentials = true;

// 将 Pinia 和 router 挂载到 Vue 应用上
createApp(App).use(pinia).use(router).mount('#app')
