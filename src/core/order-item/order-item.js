import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Row, Col } from 'antd'

import { orderStatus } from 'constant/goods-constant'
import { unixTimeFormat } from 'utils/date'

import './order-item.scss'

class OrderItem extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    type: PropTypes.string,
    dataSource: PropTypes.object,
  }

  static defaultProps = {
    prefixCls: 'order-item',
    className: '',

    type: 'sale',
    dataSource: {
    },
  }

  render() {
    const {
      prefixCls, className, dataSource, type,
    } = this.props
    const classString = classNames(prefixCls, className)

    return (
      <Row className={classString}>
        <a href={type === 'sale' ? `/saleOrder/${dataSource.orderid}` : `/buyOrder/${dataSource.orderid}`}>
          <span className="order-status">{orderStatus[dataSource.status]}</span>
        </a>
        <Col className={`${prefixCls}-cover`} span={7}>
          <a href={`/goodsDetail/${dataSource.goodsid}`}>
            <img src={dataSource.goodscover} alt={dataSource.goodsname} />
          </a>
        </Col>
        <Col className={`${prefixCls}-detail`} span={17}>
          <h3><a href={`/goodsDetail/${dataSource.goodsid}`}>{dataSource.goodsname}</a></h3>
          <p>{`￥ ${dataSource.goodsprice} 元`}</p>
          <p>
            {type === 'sale' ? `购买人： ${dataSource.buyername}` : `出售人： ${dataSource.salername}`}
            <span className="trade-time">{`联系方式： ${dataSource.phone}`}</span>
          </p>
          <p>{`交易人： ${dataSource.tradename}`} <span className="trade-time">{`交易时间： ${unixTimeFormat(dataSource.buytime)}`}</span></p>
          <p>{`交易地址： ${dataSource.address}`}</p>
        </Col>
      </Row>
    )
  }
}

export default OrderItem
