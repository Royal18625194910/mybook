import axios from 'axios'
/**
 * 获取日志数据 list
 */
export const list = ({page = 1, size = 10,keyword = ''}) => {
  return axios.get('http://localhost:3000/user/list',
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
  return axios.delete(`http://localhost:3000/user/${id}`)
}
/**
 * 添加用户
 */
export const add = ({account,password}) => {
  return axios.post('http://localhost:3000/user/add',{
    account,
    password
  })
}
/**
 * 重置密码
 */
export const resetPassword = (id) => {
  return axios.post('http://localhost:3000/user/reset/password',{
    id
  })
}