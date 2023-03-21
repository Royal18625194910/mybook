import axios from 'axios'
/**
 * 添加书籍分类
 */
export const add = (title) => {
  return axios.post('http://localhost:3000/book-classify/add',{
    title
  })
}
/**
 * 删除书籍分类接口
 */
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/book-classify/${id}`)
}


/**
 * 获取书籍分类列表数据
 */
export const list = () => {
  return axios.get('http://localhost:3000/book-classify/list')
}

/**
 * 更新书籍分类名称
 */
export const updateTitle = (id,title) => {
  return axios.post('http://localhost:3000/book-classify/update/title',{
    id,
    title
  })
}