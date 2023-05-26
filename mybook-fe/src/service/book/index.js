import { get,post,del} from '@/utils/request'


/**
 * 添加书籍 add
 */
export const add = ({name,price,author,publishDate,classify,count}) => {
  return post('/book/add',{name,price,author,publishDate,classify,count})
}

/**
 * 获取书籍列表
 */
export const list = (params) => {
  return get('/book/list',{params})
}
/**
 * 删除某个书籍
 */
export const remove = (id) => {
  return del(`/book/${id}`)
}
/**
 * 更新库存
 */
export const updateCount = data => {
  return post(`/book/update/count`,data)
}
/**
 * 更新书籍
 */
export const update = data => {
  return post(`/book/update`,data)
}
/**
 * 获取书籍详情信息
 */
export const detail = id => {
  return get(`/book/detail/${id}`)
}