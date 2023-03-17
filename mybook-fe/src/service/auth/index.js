import axios from 'axios'
import { getToken } from '@/utils/token'

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`


/**
 * 注册api
 * @param  {account,password}
 * @returns 
 */
export const register = ({account,password,inviteCode}) => {
  return axios.post('http://localhost:3000/auth/register',{
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
  return axios.post('http://localhost:3000/auth/login',{
    account,
    password,
  })
}