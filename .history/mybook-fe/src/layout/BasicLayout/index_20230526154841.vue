<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left">
        <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
        <!-- <div class="title">{{ $$.SITE_NAME }}</div> -->
        <div class="title">图书</div>
      </div>
      <div class="right">
        <!-- <div class="hello-msg">你好，{{ store.userInfo.account }}</div> -->
        <div class="hello-msg">你好，{{ store.state.userInfo.account }}</div>
        <!-- <div class="logout" @click="logout">退出</div> -->
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>
    <div class="app-header-placeholder"></div>
    <div class="app-content">
      <div class="left">
        <AppNav />
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Nav from './Nav/index.vue'
import { setToken } from '@/utils/token'
import { useRouter } from 'vue-router'
import store from '@/store'

export default defineComponent({
  components: {
    AppNav: Nav
  },
  setup () {
    const router = useRouter()
    const logout = () => {
      setToken('')
      router.push('/auth')
    }
    console.log(store.state.userInfo.account);
    

    return {
      logout,
      store
    }
  }
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>