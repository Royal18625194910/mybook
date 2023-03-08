import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.less'
import SpaceBetween from './components/SpaceBetween/index.vue';


const app = createApp(App)

app.use(router)
app.component('space-between', SpaceBetween)
  

app.mount('#app')
