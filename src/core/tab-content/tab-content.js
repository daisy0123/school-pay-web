import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import noop from 'lodash/noop'
import { Row, Col, Pagination } from 'antd'

import OrderItem from 'core/order-item'
import CommentItem from 'core/comment-item'

import './tab-content.scss'

class TabContent extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    tabType: PropTypes.string,
    type: PropTypes.string,
    pageSize: PropTypes.number,
    offset: PropTypes.number,
    userId: PropTypes.string.isRequired,
    fetchData: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'tab-content',
    className: '',
    type: 'sale',
    tabType: 'comment',

    pageSize: 6,
    offset: 1,
    fetchData: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      count: 0,
      offset: props.offset,
    }
  }

  componentWillMount = () => {
    this.filterData()
  }

  handlePage = (pageNumber) => {
    this.setState({ offset: pageNumber }, () => {
      this.filterData()
    })
  }

  filterData = () => {
    const { userId, fetchData, pageSize } = this.props
    const { offset } = this.state
    fetchData({ pageSize, offset, userId }).then((data) => {
      const { dataLists, count } = data
      this.setState({ dataSource: dataLists, count })
    })
  }

  genItemLists = () => {
    const { type, tabType } = this.props
    const { dataSource } = this.state
    const content = []
    if (tabType === 'order') {
      dataSource.forEach((item) => {
        const listItem = (
          <Col key={item.orderid} span={12}>
            <OrderItem dataSource={item} type={type} />
          </Col>
        )
        content.push(listItem)
      })
    } else if (tabType === 'comment') {
      dataSource.map(item => (
        content.push(<Col key={item.commentid} span={12}><CommentItem dataSource={item} /></Col>)
      ))
    }
    return content
  }

  render() {
    const { prefixCls, className, pageSize } = this.props
    const classString = classNames(prefixCls, className)
    const { count, offset, dataSource } = this.state

    return (
      <Row className={classString}>
        <Row gutter={8} className={`${prefixCls}-content`}>
          {dataSource.length === 0 ? (
            <p>暂无数据</p>
          ) : (this.genItemLists())}
        </Row>

        <div className={`${prefixCls}-page`}>
          <Pagination
            current={offset}
            pageSize={pageSize}
            total={count}
            onChange={this.handlePage}
          />
        </div>
      </Row>

    )
  }
}

export default TabContent
