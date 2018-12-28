import http from 'axios'

/**
 * 用户注册
 */
export const alertRegister = params => http.post('/user/User/register/', params)

/**
 * 获取已有的用户信息
 */
export const fetRegister = () => http.get('/user/User/register/')

/**
 * 用户登录
 */
export const alertLogin = params => http.post('/user/User/login/', params)

/**
 * 获取用户个人信息
 */
export const fetchUserInfo = params => http.get('/user/User/userInfo', { params })

/**
 * 修改用户个人信息
 */
export const updateUserInfo = params => http.post('/user/User/updateUserInfo', params)

/**
 * 修改用户密码
 */
export const updatePassword = params => http.post('/user/User/updatePassword', params)

/**
 * 获取用户商品信息
 */
export const fetchUserGoods = params => http.get('/user/User/userGoods', { params })

/**
 * 获取用户订单信息
 */
export const fetchUserOrder = params => http.get('/user/User/userOrder', { params })

export const fetchUserSale = params => http.get('/user/User/userSale', { params })

export const fetchUserBuy = params => http.get('/user/User/userBuy', { params })

/**
 * 获取用户评价信息
 */
export const fetchUserComment = params => http.get('/user/User/userComment', { params })

export const fetchCommenter = params => http.get('/user/User/userCommenter', { params })

export const fetchCommented = params => http.get('/user/User/userCommented', { params })
