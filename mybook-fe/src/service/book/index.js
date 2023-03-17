import axios from 'axios'
import { getToken } from '@/utils/token'

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`
/**
 * 添加书籍 add
 */
export const add = ({name,price,author,publishDate,classify,count}) => {
  return axios.post('http://localhost:3000/book/add',{name,price,author,publishDate,classify,count})
}

/**
 * 获取书籍列表
 */
export const list = (params) => {
  return axios.get('http://localhost:3000/book/list',{params})
}
/**
 * 删除某个书籍
 */
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/book/${id}`)
}
/**
 * 更新库存
 */
export const updateCount = data => {
  return axios.post(`http://localhost:3000/book/update/count`,data)
}
/**
 * 更新书籍
 */
export const update = data => {
  return axios.post(`http://localhost:3000/book/update`,data)
}
/**
 * 获取书籍详情信息
 */
export const detail = id => {
  return axios.get(`http://localhost:3000/book/detail/${id}`)
}