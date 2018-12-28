import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Input, Checkbox, Row, Col, Pagination } from 'antd'

import { fetchUserGoods } from 'api/sp-user'
import { goodsFilter } from 'constant/goods-constant'
import GoodsItem from 'core/goods-item'

import './index.scss'

const { Search } = Input
const CheckBoxGroup = Checkbox.Group

class PersonGoods extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'person-goods',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      filterClass: null,
      keyword: null,
      userGoods: [],
      count: 0,
      offset: 1,
      pageSize: 6,
    }
  }

  componentWillMount = () => {
    this.filterData()
  }

  handelOnSelect = (value) => {
    const filterClass = value.join(',') !== '' ? value.join(',') : null
    this.setState({ filterClass, offset: 1 }, () => {
      this.filterData()
    })
  }

  handleOnKeyWord = (value) => {
    this.setState({ keyword: value }, () => {
      this.filterData()
    })
  }

  handlePage = (pageNumber) => {
    this.setState({ offset: pageNumber }, () => {
      this.filterData()
    })
  }

  filterData = () => {
    const userId = sessionStorage.getItem('userid')
    const {
      pageSize, offset, filterClass, keyword,
    } = this.state
    const params = {
      filterClass, keyword, userId, pageSize, offset,
    }
    fetchUserGoods(params).then((data) => {
      const { userGoods, count } = data
      this.setState({ userGoods, count })
    })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const {
      userGoods, count, pageSize, offset,
    } = this.state

    return (
      <div className={classString}>
        <div className={`${prefixCls}-selection`}>
          <label>筛选条件： </label>
          <CheckBoxGroup options={goodsFilter} onChange={this.handelOnSelect} />
          <Search
            className="sale-search"
            placeholder="请输入您要查找的物品名称"
            onSearch={this.handleOnKeyWord}
            style={{ width: 250 }}
          />
        </div>
        <p className={`${prefixCls}-count`}>{`共 ${count} 件`}</p>
        <Row className={`${prefixCls}-content`} gutter={8}>
          {userGoods.map(item => (
            <Col key={item.goodsid} span={12}>
              <GoodsItem className={`${prefixCls}-item`} type="horizontal" dataSource={item} />
            </Col>
          ))}
        </Row>
        <div className={`${prefixCls}-page`}>
          <Pagination
            current={offset}
            pageSize={pageSize}
            total={count}
            onChange={this.handlePage}
          />
        </div>
      </div>
    )
  }
}

export default PersonGoods
