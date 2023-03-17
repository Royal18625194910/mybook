const TOKEN_STORAGE_KEY = '_tt'

// 获取token
export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || ''
}

// 设置token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
  return token
}