import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.less'
import SpaceBetween from './components/SpaceBetween/index.vue';
import { regDirectives } from '@/utils/directive';


const app = createApp(App)

regDirectives(app);

app.use(router)
app.use(store)
app.component('space-between', SpaceBetween)
  

app.mount('#app')
