import axios from 'axios'
import { getToken } from '@/utils/token'


const domain = 'http://localhost:3000'

const instance = axios.create({
  baseURL: domain,
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

const getURL = (path) => {
  return `${domain}${path}`
}

// post请求
export const post = (url,data = {}) => {
  return instance.post(url,data)
}

// del请求
export const del = (url,data = {}) => {
  return instance.delete(url,data)
}

// get请求
export const get = (url,data = {}) => {
  return instance.get(url,data)
}



// 获取headers
export const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  }
}

/*
// post请求
export const post = (url,data = {}) => {
  return axios.post(getURL(url),data,{
    headers: getHeaders()
  })
}

// del请求
export const del = (url,data = {}) => {
  return axios.delete(getURL(url),data,{
    headers: getHeaders()
  })
}

// get请求
export const get = (url,data = {}) => {
  return axios.get(getURL(url),
    {
      ...data,
      headers: getHeaders()
    })
}
*/
