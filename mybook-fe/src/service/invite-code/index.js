import { get,post,del} from '@/utils/request'


/**
 * 获取邀请码列表
 */
export const list = (page,size) => {
  return get('/invite/list',{
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
  return post('/invite/add',{
   count
  })
}
/**
 * 删除某个邀请码
 */
export const remove = (id) => {
  return del(`/invite/${id}`)
}