import { get,post,del} from '@/utils/request'

/**
 * 获取角色列表 list
 */
export const list = () => {
  return get('/character/list')
}