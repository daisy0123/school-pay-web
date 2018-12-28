import React, { PureComponent, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Row, Col, Button, Avatar, message } from 'antd'

import { unixDateFormat } from 'utils/date'

import './goods-info.scss'

class GoodsInfo extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    goodsData: PropTypes.object,
    authorData: PropTypes.object,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'goods-info',
    className: '',

    goodsData: {},
    authorData: {},
  }

  constructor(props) {
    super(props)
    const userId = Number(sessionStorage.getItem('userid'))

    this.state = {
      isLogin: !!userId,
      userId,
    }
  }

  toTrade = () => {
    const { goodsData, authorData } = this.props
    if (this.state.isLogin) {
      if (authorData.userid === this.state.userId) {
        message.warning('不能购买本人出售的商品！')
      } else {
        this.props.history.push(`/spTrade/${goodsData.goodsid}`)
      }
    } else {
      message.warning('请先登录！')
    }
  }

  render() {
    const {
      prefixCls, className, goodsData, authorData,
    } = this.props
    const classString = classNames(prefixCls, className)

    const {
      goodscover, goodsname, goodsprice, goodsintro, modifytime, goodsstatus,
    } = goodsData

    return (
      <div className={classString}>
        <Row gutter={25}>
          <Col className={`${prefixCls}-cover`} span={10}>
            <img src={goodscover} alt={goodsname} />
          </Col>
          <Col span={14}>
            <div className={`${prefixCls}-info`}>
              <h2>{goodsname}</h2>
              <div className="goods-info-wrapper">
                <p className="goods-price">￥{goodsprice}</p>
                <p className="goods-intro">{goodsintro}</p>
                <p className="author-info">
                  <Avatar className="author-avatar" src={authorData.userimage} />
                  <span>{authorData.username}</span>
                  <span className="discuss-time">{unixDateFormat(modifytime)}</span>
                </p>
              </div>
              <Button type="primary" disabled={goodsstatus !== 0} onClick={this.toTrade}>点击购买</Button>
              {goodsstatus === 1 && <span className="tips">正在交易中</span>}
              {goodsstatus === 2 && <span className="tips">已出售</span>}
              {goodsstatus === 3 && <span className="tips">已下架</span>}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(GoodsInfo)
