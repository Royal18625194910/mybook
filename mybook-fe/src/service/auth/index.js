import axios from 'axios'

// 注册
export const register = ({account,password}) => {
  return axios.post('http://localhost:3000/auth/register',{
    account,
    password,
  })
}