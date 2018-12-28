import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Row, Col, Avatar, Icon } from 'antd'

import { fetchUserInfo, fetchUserGoods, fetchUserOrder, fetchUserComment } from 'api/sp-user'
import GoodsList from 'core/goods-list'
import OrderItem from 'core/order-item'

import './index.scss'

const sexMatch = {
  0: 'man',
  1: 'woman',
}
class PersonalIndex extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'person-index',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      userData: {},
      goodsCount: 0,
      orderCount: 0,
      commentAllCount: 0,
      userSale: [],
      userBuy: [],
    }
  }

  componentWillMount = () => {
    const userId = sessionStorage.getItem('userid')
    fetchUserInfo({ userId }).then((data) => {
      this.setState({ userData: data.userInfo })
    })
    fetchUserGoods({ userId }).then((data) => {
      const { count } = data
      this.setState({ goodsCount: count })
    })
    fetchUserOrder({ userId, pageSize: 2, offset: 1 }).then((data) => {
      const { orderCount, userSale, userBuy } = data
      this.setState({ orderCount, userSale, userBuy })
    })
    fetchUserComment({ userId }).then((data) => {
      const { commentAllCount } = data
      this.setState({ commentAllCount })
    })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const {
      userData, goodsCount, orderCount, commentAllCount, userSale, userBuy,
    } = this.state
    const {
      userimage, username, phone, email, sex,
    } = userData

    const content = (
      <div>
        {userBuy.concat(userSale).length > 0 ? (
          <div>
            {userSale.map(item => (<OrderItem type="sale" key={item.goodsid} dataSource={item} />))}
            {userBuy.map(item => (<OrderItem type="buy" key={item.goodsid} dataSource={item} />))}
          </div>
        ) : (<p>你还没有购买或者出售商品，暂无订单！</p>)}
      </div>
    )

    return (
      <Row className={classString}>
        <Col span={18} offset={2}>
          <Row className={`${prefixCls}-intro`}>
            <Col span={4}>
              <Avatar className={`${prefixCls}-avatar`} src={userimage} />
            </Col>
            <Col className="author-mess" span={20}>
              <h3>{username} <Icon type={sexMatch[sex]} /></h3>
              <p><Icon type="phone" /> {phone}</p>
              <p><Icon type="mail" /> {email}</p>
              <p className={`${prefixCls}-detail`}>
                <Link to="/personal/personalGoods"><Icon type="gift" /> {`我的物品 (${goodsCount})`}</Link>
                <Link to="/personal/personalOrder"><Icon type="shopping-cart" /> {`我的交易 (${orderCount})`}</Link>
                <Link to="/personal/personalComment"><Icon type="bars" /> {`我的评价 (${commentAllCount})`}</Link>
              </p>
            </Col>
          </Row>

          <Row className={`${prefixCls}-order`}>
            <GoodsList seeMoreUrl="/personal/personalOrder" title="最近订单" content={content} />
          </Row>
        </Col>
      </Row>
    )
  }
}

export default PersonalIndex
