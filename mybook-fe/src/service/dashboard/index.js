import { get,post,del} from '@/utils/request'

/**
 * 获取总览信息
 */
export const baseInfo = () => {
  return get(`/dashboard/base-info`)
}