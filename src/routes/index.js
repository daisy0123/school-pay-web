import Index from 'components/index'
import Shop from 'components/shop'
import Sale from 'components/sale'
import GoodsDetail from 'components/goods-detail'
import Admin from 'components/admin'
import Register from 'components/register'
import AdminLogin from 'components/admin/admin-login'
import SpTrade from 'components/trade'
import SaleOrder from 'components/sale-order'
import BuyOrder from 'components/buy-order'
import SpComment from 'components/comment'
import Personal from 'components/personal'
import PersonalInfo from 'components/personal/person-info'
import PersonalGoods from 'components/personal/person-goods'
import PersonalOrder from 'components/personal/person-order'
import PersonalSafe from 'components/personal/person-safe'
import PersonalIndex from 'components/personal/person-index'
import PersonalComment from 'components/personal/person-comment'
import UserManage from 'components/admin/user-manage'
import PayManage from 'components/admin/pay-manage'
import GoodsManage from 'components/admin/goods-manage'
import CommentManage from 'components/admin/comment-manage'

const menu = [{
  id: 'index',
  path: '/',
  exact: true,
  name: '首页',
  component: Index,
}, {
  id: 'shop',
  path: '/shop',
  name: '我要买',
  component: Shop,
}, {
  id: 'sale',
  path: '/sale',
  name: '我要卖',
  component: Sale,
}]

const routes = [{
  id: 'register',
  path: '/register',
  name: '注册',
  component: Register,
}, {
  id: 'goodsDetail',
  path: '/goodsDetail/:goodsId',
  name: '物品详情页',
  component: GoodsDetail,
}, {
  id: 'personal',
  path: '/personal',
  name: '个人中心',
  component: Personal,
}, {
  id: 'admin',
  path: '/admin',
  name: '后台管理登录页',
  component: AdminLogin,
}, {
  id: 'adminPage',
  path: '/adminPage',
  name: '后台管理',
  component: Admin,
}, {
  id: 'shopWithClass',
  path: '/shop/:classValue',
  name: '购物',
  component: Shop,
}, {
  id: 'spTrade',
  path: '/spTrade/:goodsId',
  name: '交易',
  component: SpTrade,
}, {
  id: 'saleOrder',
  path: '/saleOrder/:orderId',
  name: '卖家订单',
  component: SaleOrder,
}, {
  id: 'buyOrder',
  path: '/buyOrder/:orderId',
  name: '买家订单',
  component: BuyOrder,
}, {
  id: 'spComment',
  path: '/spComment/:orderId',
  name: '评价卖家',
  component: SpComment,
}]

const person = [{
  id: 'personalIndex',
  path: '/personal/personalIndex',
  name: '个人中心',
  icon: 'home',
  component: PersonalIndex,
}, {
  id: 'personalInfo',
  path: '/personal/personalInfo',
  name: '个人资料',
  icon: 'user',
  component: PersonalInfo,
}, {
  id: 'personalGoods',
  path: '/personal/personalGoods',
  name: '我的商品',
  icon: 'gift',
  component: PersonalGoods,
}, {
  id: 'personalOrder',
  path: '/personal/personalOrder',
  name: '我的交易',
  icon: 'shopping-cart',
  component: PersonalOrder,
}, {
  id: 'personalComment',
  path: '/personal/personalComment',
  name: '我的评论',
  icon: 'bars',
  component: PersonalComment,
}, {
  id: 'personalSafe',
  path: '/personal/personalSafe',
  name: '账号安全',
  icon: 'safety',
  component: PersonalSafe,
}]

const admin = [{
  id: 'userManage',
  path: '/adminPage/userManage',
  name: '用户管理',
  icon: 'home',
  component: UserManage,
}, {
  id: 'goodsManage',
  path: '/adminPage/goodsManage',
  name: '商品管理',
  icon: 'gift',
  component: GoodsManage,
}, {
  id: 'payManage',
  path: '/adminPage/payManage',
  name: '交易管理',
  icon: 'shopping-cart',
  component: PayManage,
}, {
  id: 'commentManage',
  path: '/adminPage/commentManage',
  name: '评价管理',
  icon: 'bars',
  component: CommentManage,
}]

const ROUTES = {
  menu, routes, person, admin,
}

export default ROUTES
