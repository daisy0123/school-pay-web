import http from 'axios'

/**
 * 获取用户信息
 */
export const adminUserInfo = params => http.get('/admin/Admin/userInfo', { params })

/**
 * 获取商品信息
 */
export const adminGoodsInfo = params => http.get('/admin/Admin/goodsInfo', { params })

/**
 * 获取交易信息
 */
export const adminOrderInfo = params => http.get('/admin/Admin/orderInfo', { params })

/**
 * 获取评价信息
 */
export const adminCommentInfo = params => http.get('/admin/Admin/commentInfo', { params })

export const deleteUser = params => http.get('/admin/Admin/deleteUser', { params })

export const deleteGoods = params => http.get('/admin/Admin/deleteGoods', { params })

export const deleteOrder = params => http.get('/admin/Admin/deleteOrder', { params })

export const deleteComment = params => http.get('/admin/Admin/deleteComment', { params })

export const fetchUser = params => http.get('/admin/Admin/fetchUser', { params })

export const fetchGoods = params => http.get('/admin/Admin/fetchGoods', { params })

export const fetchOrder = params => http.get('/admin/Admin/fetchOrder', { params })

export const fetchComment = params => http.get('/admin/Admin/fetchComment', { params })

export const updateUser = params => http.post('/admin/Admin/updateUser', params)

export const updateGoods = params => http.post('/admin/Admin/updateGoods', params)

export const updateOrder = params => http.post('/admin/Admin/updateOrder', params)

export const updateComment = params => http.post('/admin/Admin/updateComment', params)

