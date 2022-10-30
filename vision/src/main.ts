import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import global.less
import '@/assets/css/global.less'
//引入字体的文件
import "@/assets/font/iconfont.css"
import SocketService from './utils/socket_service'
SocketService.Instance.connect()
const app = createApp(App)
app.use(store).use(router).mount('#app')
