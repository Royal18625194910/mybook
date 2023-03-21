import axios from 'axios'

/**
 * 获取邀请码列表
 */
export const list = (page,size) => {
  return axios.get('http://localhost:3000/invite/list',{
   params: {
    page,
    size
   }
  })
}

/**
 * 添加一个邀请码
 */
export const add = (count) => {
  return axios.post('http://localhost:3000/invite/add',{
   count
  })
}
/**
 * 删除某个邀请码
 */
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/invite/${id}`)
}