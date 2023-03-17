import { createStore } from 'vuex'
import { character,user } from '@/service'
import { result } from '@/utils/result'
import { getCharacterInfoById } from '@/utils/character'

// 创建一个新的 store 实例
const store = createStore({
  state: {
      characterInfo: [],  // 角色用户列表
      userInfo: {},   // 用户信息
      userCharacter: {},   // 用户角色信息
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter
    },
  },
  actions: {
    // 获取角色列表异步数据
    async getCharacterInfo(store) {
      const res = await character.list()
      result(res)
      .success(({data}) => {
        store.commit('setCharacterInfo',data)
      })
    },
    async getUserInfo(store) {
      const res = await user.info()
      // console.log(res);
      result(res)
      .success(({data}) => {
        store.commit('setUserInfo',data)
        store.commit('setUserCharacter',getCharacterInfoById(data.character))
      })
    }
  }
})

export default store