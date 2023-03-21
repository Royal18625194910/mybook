import { reactive } from "vue"
import { defineComponent } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
import {auth,resetPassword } from '@/service'
import { message,Modal,Input  } from 'ant-design-vue';
import { getCharacterInfoById } from '@/utils/character'
import { result } from '@/utils/result';
import store from '@/store';
import { useRouter } from 'vue-router'
import { setToken } from '@/utils/token';


export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {

    const router = useRouter()
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

    const forgetPassword = () => {
      Modal.confirm({
        title: '请输入要重置密码的账户',
        content:(
          <>
            <Input class='__forgetPassword_input'></Input>
          </>
        ),
        onOk: async () => {
          const input = document.querySelector('.__forgetPassword_input')
          const account = input.value
          const res = await resetPassword.add(account)
          result(res)
          .success(({msg}) => {
            message.success(msg)
          })
        },
      });
    }
    // 点击登录
    const login = async () => {
      // 若未填写用户密码，则提示弹窗
      if ( !loginForm.account || !loginForm.password ) return message.warn('请填写用户名或密码');
      
      const res = await auth.login(loginForm)
      // 判断登录是否成功
      result(res)
      .success( async ({msg,data: {user,token}}) => {
        message.success(msg)
        setToken(token)
        // 获取用户的角色信息
        await store.dispatch('getCharacterInfo');
        // 改变用户信息
        store.commit('setUserInfo',user)
        // 设置用户角色信息
        store.commit('setUserCharacter',getCharacterInfoById(user.character))
     
        router.replace('/books')
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