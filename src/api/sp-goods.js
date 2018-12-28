import http from 'axios'

/**
 * 发布商品
 */
export const publishGoods = params => http.post('/goods/Goods/Publish', params)

/**
 * 获取商品详情
 */
export const fetchGoodsDetail = params => http.get('/goods/Goods/Detail', { params })

/**
 * 下架商品
 */
export const OfflineGoods = params => http.post('/goods/Goods/Offline', params)

/**
 * 编辑商品信息
 */
export const EditGoods = params => http.post('/goods/Goods/Edit', params)
