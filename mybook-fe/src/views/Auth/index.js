import { reactive,toRefs } from "vue"
import { defineComponent } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
import {auth} from '@/service'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
    const data = reactive({
      loginForm: {
        account: '12333',
        password: '666'
      }
    })

    const regForm = reactive({
      account:'',
      password: '',
    })

    const forgetPassword = () => {}
    const login = () => {}
    const register = () => {
      // console.log(regForm);
      auth.register(regForm).then(res => {
        console.log(res);
      })
    }
    return {
      ...toRefs(data),
      regForm,
      forgetPassword,
      login,
      register
    }
  }
})