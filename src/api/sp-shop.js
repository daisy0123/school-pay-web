import http from 'axios'

/**
 * 获取网上购物页面信息
 */
export const fetchShop = params => http.get('/shop/Shop', { params })

/**
 * 提交交易信息
 */
export const AlertOrder = params => http.post('/order/Order/editOrder', params)

/**
 * 订单提醒
 */
export const fetchOrderMessage = params => http.post('/order/Order/orderMessage', params)

/**
 * 取消订单
 */
export const cancelOrder = params => http.get('/order/Order/cancelOrder', { params })

/**
 * 确定交易
 */
export const confirmOrder = params => http.get('/order/Order/confirmOrder', { params })

/**
 * 获取交易信息
 */
export const fetchOrderDetail = params => http.get('/order/Order/orderDetail', { params })

/**
 * 完成交易
 */
export const finishOrder = params => http.get('/order/Order/finishOrder', { params })
