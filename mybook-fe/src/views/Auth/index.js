import { reactive } from "vue"
import { defineComponent } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
import {auth} from '@/service'
import { message } from 'ant-design-vue';
import { result } from '@/utils/result';


export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {

    // 注册表单数据
    const regForm = reactive({
      account:'',
      password: '',
      inviteCode: ''
    })

     // 登录表单数据
     const loginForm = reactive({
      account:'',
      password: '',
    })

    const forgetPassword = () => {}
    // 点击登录
    const login = async () => {
      // 若未填写用户密码，则提示弹窗
      if ( !loginForm.account || !loginForm.password ) return message.warn('请填写用户名或密码');
      
      const res = await auth.login(loginForm)
      // 判断登录是否成功
      result(res)
      .success((data) => {
        message.success(data.msg)
      })
    }
    // 点击注册
    const register = async () => {
      if ( !regForm.account || !regForm.password ) return message.warn('请填写用户名或密码');
      if ( !regForm.inviteCode ) return message.warn('请填写邀请码');
      const res = await auth.register(regForm)
       // 判断登录是否成功
       result(res)
       .success((data) => {
         message.success(data.msg)
       })
    }
    return {
      regForm,
      loginForm,
      forgetPassword,
      login,
      register
    }
  }
})