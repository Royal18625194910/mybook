import { get,post,del} from '@/utils/request'

/**
 * 获取重置密码用户列表
 */
export const list = (page, size) => {
  return get('/forget-password/list',
    {
      params: {
        page, 
        size
      }
    }
  )
}
/**
 * 添加重置密码用户
 */
export const add = (account) => {
  return post('/forget-password/add',{
    account
  })
}
/**
 * 更新账户重置密码状态
 * // 1 待处理  2 已重置  3 已忽略
 */
export const updateStatus = (id,status) => {
  return post('/forget-password/update/status',{
    id,
    status
  })
}
