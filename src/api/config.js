import http from 'axios'

import { message as Message } from 'antd'
import { BASE_URL } from 'constant/http'

http.defaults.baseURL = BASE_URL
http.interceptors.response.use(({ data: { state: { code, message }, data } }) => {
  if (code === 200) return data
  Message.error(`${message}!`)
  return Promise.reject(new Error(`${code}:${message}`))
})
