import http from 'axios'

/**
 * 获取首页
 */
export const fetchIndex = params => http.get('/index', { params })
