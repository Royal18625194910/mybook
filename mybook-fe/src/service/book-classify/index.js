import { get,post,del} from '@/utils/request'

/**
 * 添加书籍分类
 */
export const add = (title) => {
  return post('/book-classify/add',{
    title
  })
}
/**
 * 删除书籍分类接口
 */
export const remove = (id) => {
  return del(`/book-classify/${id}`)
}


/**
 * 获取书籍分类列表数据
 */
export const list = () => {
  return get('/book-classify/list')
}

/**
 * 更新书籍分类名称
 */
export const updateTitle = (id,title) => {
  return post('/book-classify/update/title',{
    id,
    title
  })
}