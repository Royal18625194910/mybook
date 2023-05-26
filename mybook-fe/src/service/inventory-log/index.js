import { get,post,del} from '@/utils/request'

/**
 * 获取日志数据 list
 */
export const list = ({type = 1,page = 1, size = 10}) => {
  return get('/inventory-log/list',
    {
      params: {
        type,
        page,
        size
      }
    }
  )
}