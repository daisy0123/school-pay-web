import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Card } from 'antd'

import { unixDateFormat } from 'utils/date'

import './aside-goods.scss'

class AsideGoods extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    title: PropTypes.string,
    dataSource: PropTypes.array,
  }

  static defaultProps = {
    prefixCls: 'aside-goods',
    className: '',

    title: '',
    dataSource: [],
  }

  render() {
    const {
      prefixCls, className, dataSource, title,
    } = this.props
    const classString = classNames(prefixCls, className)

    return (
      dataSource.length > 0 && (
        <div className={classString}>
          <div className={`${prefixCls}-header`}>
            {title}
          </div>
          <div className={`${prefixCls}-content`}>
            {dataSource.map(item => (
              <a key={item.goodsid} href={`/goodsDetail/${item.goodsid}`}>
                <Card key={item.key} style={{ width: '100%' }}>
                  <img className="other-pic" src={item.goodscover} alt={item.goodsname} />
                  <div className="other-text">
                    <h3 title={item.goodsname}>{item.goodsname}</h3>
                    <p className="other-price">￥{item.goodsprice}</p>
                    <p>{unixDateFormat(item.modifytime)}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )
    )
  }
}

export default AsideGoods
