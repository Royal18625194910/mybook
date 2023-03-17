import axios from 'axios'

/**
 * 获取日志列表数据  /log/list
 * @param {页码} page 
 * @param {每页数量} size 
 * @returns 
 */
export const list = ( page, size ) => {
  return axios.get('http://localhost:3000/log/list', {
    params: {
      page,
      size
    }
  })
}

/**
 * 删除某条日志记录
 */
export const remove = id => {
  return axios.post('http://localhost:3000/log/delete',{
    id
  })
}