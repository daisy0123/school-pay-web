import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Icon } from 'antd'

import './goods-list.scss'

class GoodsList extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    seeMoreUrl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.element,
  }

  static defaultProps = {
    prefixCls: 'goods-list',
    className: '',

    seeMoreUrl: '',
    title: '',
    content: null,
  }

  render() {
    const {
      prefixCls, className, seeMoreUrl, title, content,
    } = this.props
    const classString = classNames(prefixCls, className)

    return (
      <div className={classString}>
        <div className={`${prefixCls}-header`}>
          <Link to={seeMoreUrl}>{title}</Link>
          <Link to={seeMoreUrl} className="see-more">
            查看更多
            <Icon type="right-square" />
          </Link>
        </div>
        {content}
      </div>
    )
  }
}

export default GoodsList
