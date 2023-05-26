import { get,post,del} from '@/utils/request'

/**
 * 重置密码 
 */
export const resetPassword = (password,oldPassword) => {
  return post('/profile/update/password',{
    password,
    oldPassword
  })
}