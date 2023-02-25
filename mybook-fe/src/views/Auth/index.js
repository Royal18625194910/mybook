import { reactive,toRefs } from "vue"
import { defineComponent } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';

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
      },
      regForm: {
        account: '12333',
        password: '666',
        inviteCode: 233
      }
    })

    const forgetPassword = () => {}
    const login = () => {}
    const register = () => {}
    return {
      ...toRefs(data),
      forgetPassword,
      login,
      register
    }
  }
})