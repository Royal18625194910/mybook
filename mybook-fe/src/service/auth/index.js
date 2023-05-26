import { get,post,del} from '@/utils/request'

/**
 * 注册api
 * @param  {account,password}
 * @returns 
 */
export const register = ({account,password,inviteCode}) => {
  return post('/auth/register',{
    account,
    password,
    inviteCode
  })
}

/**
 * 登录api
 * @param  {account,password}
 * @returns 
 */
export const login = ({account,password}) => {
  return post('/auth/login',{
    account,
    password,
  })
}