import http from 'axios'

/**
 * 提交评价
 */
export const alertComment = params => http.post('/comment/Comment/alertComment', params)

/**
 * 判断该订单是否已评价
 */
export const isComment = params => http.get('/comment/Comment/isComment', { params })

/**
 * 删除评价
 */
export const deleteComment = params => http.post('/comment/Comment/deleteComment', params)
