import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'

import GoodsItem from 'core/goods-item'
import GoodsList from 'core/goods-list'

import './index-shop.scss'

class IndexShop extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    seeMoreUrl: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    dataSource: PropTypes.array,
  }

  static defaultProps = {
    prefixCls: 'index-shop',
    className: '',
    title: '',
    seeMoreUrl: '/',
    dataSource: [],
  }

  render() {
    const {
      prefixCls, dataSource, title, seeMoreUrl, className,
    } = this.props

    const classString = classNames(prefixCls, className)
    const content = (
      <div className={`${prefixCls}-shop-con`}>
        {dataSource.map(item => (
          <GoodsItem key={item.goodsid} className={`${prefixCls}-item`} dataSource={item} />
        ))}
      </div>
    )

    return (
      dataSource.length > 0 && (
        <div className={classString}>
          <GoodsList seeMoreUrl={seeMoreUrl} title={title} content={content} />
        </div>
      )
    )
  }
}

export default IndexShop
