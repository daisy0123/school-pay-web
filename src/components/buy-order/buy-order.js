import React, { PureComponent, PropTypes } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Steps, Row, Col, Button, Spin, Icon, message } from 'antd'
import classNames from 'classnames'

import { fetchOrderDetail, cancelOrder } from 'api/sp-shop'
import { isComment } from 'api/sp-comment'

import './buy-order.scss'

const { Step } = Steps
class BuyOrder extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'buy-order',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      orderId: props.match.params.orderId,
      hasComment: true,
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
          current: data.status === -2 ? 0 : data.status,
          goodsId: data.goodsid,
          status: data.status,
        })
      })
      isComment({ orderId }).then((result) => {
        if (result === -1) {
          this.setState({ hasComment: false })
        }
      })
    }
  }

  handleCancel = () => {
    const { goodsId, orderId } = this.state
    cancelOrder({ goodsId, orderId }).then(() => {
      window.location.href = `/buyOrder/${orderId}`
    })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const {
      current, status, orderId, hasComment,
    } = this.state

    return (
      <Row className={classString}>
        <Col span={16} offset={4}>
          <Steps current={current}>
            <Step title="等待卖家确认" />
            <Step title="交易中" />
            <Step title="交易完成" />
          </Steps>

          <div className={`${prefixCls}-con`}>
            {current === 0 && (
              <div className={`${prefixCls}-current1`}>
                {status === -2 ? (
                  <div>
                    <Icon type="close-circle" />
                    <p>交易失败！已被取消交易</p>
                    <Link to="/personal/personalOrder">点击返回个人订单</Link>
                  </div>
                ) : (
                  <div>
                    <Spin size="large" tip="等待卖家确认" />
                    <p>若卖家一直没确认，可联系卖家提醒卖家！</p>
                    <Button type="primary" onClick={this.handleCancel}>取消交易</Button>
                  </div>
                )}
              </div>
            )}

            {current === 1 && (
              <div className={`${prefixCls}-current1`}>
                <Spin size="large" tip="交易中" />
                <p>请按照规定时间完成交易！</p>
              </div>
            )}

            {current === 2 && (
              <div className={`${prefixCls}-current1`}>
                <Icon className={`${prefixCls}-ok`} type="check-circle" />
                <p>恭喜你完成交易！点击查看<Link to="/personal/personalOrder">我的订单</Link>！</p>
                {!hasComment && <p>点击进行<Link to={`/spComment/${orderId}`}>评价卖家</Link>！</p>}
              </div>
            )}
          </div>


        </Col>
      </Row>
    )
  }
}

export default withRouter(BuyOrder)
