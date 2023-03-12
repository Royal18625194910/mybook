import axios from 'axios'
/**
 * 获取日志数据 list
 */
export const list = ({type = 1,page = 1, size = 10}) => {
  return axios.get('http://localhost:3000/inventory-log/list',
    {
      params: {
        type,
        page,
        size
      }
    }
  )
}