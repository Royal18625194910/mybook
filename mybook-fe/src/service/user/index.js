import { get,post,del} from '@/utils/request'

/**
 * 获取日志数据 list
 */
export const list = ({page = 1, size = 10,keyword = ''}) => {
  return get('/user/list',
    {
      params: {
        page,
        size,
        keyword
      }
    }
  )
}
/**
 * 删除某个用户
 */
export const remove = (id) => {
  return del(`/user/${id}`)
}
/**
 * 添加用户
 */
export const add = ({account,password,character}) => {
  return post('/user/add',{
    account,
    password,
    character
  })
}
/**
 * 重置密码
 */
export const resetPassword = (id) => {
  return post('/user/reset/password',{
    id
  })
}
/**
 * 编辑用户角色
 */
export const editCharacter = (characterId,userId) => {
  return post('/user/update/character',{
    character: characterId,
    userId
  })
}
/**
 * 获取token
 */
export const info = () => {
  return get('/user/info')
}

export const addMany = (key) => {
  return post('/user/addMany', {
    key,
  });
};