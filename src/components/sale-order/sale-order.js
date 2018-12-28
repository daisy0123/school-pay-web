import React, { PureComponent, PropTypes } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Steps, Row, Col, Spin, Icon, message, Button } from 'antd'
import classNames from 'classnames'

import { unixTimeFormat } from 'utils/date'
import { fetchOrderDetail, confirmOrder, finishOrder, cancelOrder } from 'api/sp-shop'

import './sale-order.scss'

const { Step } = Steps

class SaleOrder extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'sale-order',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      orderId: props.match.params.orderId,
      orderDetail: {},
    }
  }

  componentWillMount = () => {
    const { orderId } = this.state
    const userId = sessionStorage.getItem('userid')
    if (!userId) {
      message.warning('请先登录！')
      this.props.history.push('/')
    } else {
      fetchOrderDetail({ orderId }).then((data) => {
        this.setState({
          orderDetail: data,
          current: data.status === -2 ? 0 : data.status,
          goodsId: data.goodsid,
          status: data.status,
        })
      })
    }
  }

  confirmOrder = () => {
    const { orderId, current } = this.state
    confirmOrder({ orderId }).then(() => {
      const newCurrent = current + 1
      this.setState({ current: newCurrent })
    })
  }

  finishOrder = () => {
    const { orderId, current, goodsId } = this.state
    finishOrder({ orderId, goodsId }).then(() => {
      const newCurrent = current + 1
      this.setState({ current: newCurrent })
    })
  }

  cancelOrder = () => {
    const { goodsId, orderId } = this.state
    cancelOrder({ goodsId, orderId }).then(() => {
      window.location.href = `/saleOrder/${orderId}`
    })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const { current, orderDetail, status } = this.state

    return (
      <Row className={classString}>
        <Col span={16} offset={4}>
          <Steps current={current}>
            <Step title="确认订单信息" />
            <Step title="交易中" />
            <Step title="交易完成" />
          </Steps>

          <div className={`${prefixCls}-con`}>
            {current === 0 && (
              <div className={`${prefixCls}-current0`}>
                {status === -2 ? (
                  <div className={`${prefixCls}-fail`}>
                    <Icon type="close-circle" />
                    <p>交易失败！已被取消交易</p>
                    <Link to="/personal/personalOrder">点击返回个人订单</Link>
                  </div>
                ) : (
                  <div>
                    <img src={orderDetail.goodscover} alt="goods" />
                    <div className="goods-intro">
                      <h3>{orderDetail.goodsname}</h3>
                      <p>{orderDetail.goodsintro}</p>
                      <p>{`应付金额：${orderDetail.goodsprice} 元`}</p>
                      <p>{`购买人：${orderDetail.buyername} (${orderDetail.phone})`}</p>
                    </div>

                    <div className={`${prefixCls}-detail`}>
                      <h3>交易信息：</h3>
                      <Row>
                        <Col span={8}>{`交易人：${orderDetail.tradename}`} </Col>
                        <Col span={8}>{`联系方式：${orderDetail.tradephone}`}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>{`交易时间：${unixTimeFormat(orderDetail.buytime)}`} </Col>
                        <Col span={8}>{`交易地址：${orderDetail.address}`}</Col>
                      </Row>
                    </div>
                    <Button type="primary" className="order-submit" onClick={this.confirmOrder}>确定交易</Button>
                    <Button className="order-submit" onClick={this.cancelOrder}>取消交易</Button>
                  </div>
                )}
              </div>
            )}

            {current === 1 && (
              <div className={`${prefixCls}-current1`}>
                <Spin size="large" tip="交易中" />
                <p>请按照规定时间完成交易！</p>
                <Button type="primary" className="order-submit" onClick={this.finishOrder}>已完成交易</Button>
              </div>
            )}

            {current === 2 && (
              <div className={`${prefixCls}-current1`}>
                <Icon className={`${prefixCls}-ok`} type="check-circle" />
                <p>恭喜你完成交易！点击查看<Link to="/personal/personalOrder">我的订单</Link>！</p>
              </div>
            )}
          </div>


        </Col>
      </Row>
    )
  }
}

export default withRouter(SaleOrder)
