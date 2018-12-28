import React, { PureComponent, PropTypes } from 'react'
import { BackTop, Pagination } from 'antd'
import GoodsItem from 'core/goods-item'
import { goodsClass } from 'constant/goods-constant'
import { fetchShop } from 'api/sp-shop'
import ShopSelect from './shop-select'

import './index.scss'

const selectOptions = [{ name: 'goodsclass', value: goodsClass }]

class Shop extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'shop-page',
  }

  constructor(props) {
    super(props)

    const { classValue } = props.match.params
    this.state = {
      shopData: [],
      listSize: 0,
      pageSize: 20,
      offset: 1,
      classValue: classValue ? [Number(classValue)] : [],
      filterData: {
        goodsclass: classValue || null,
      },
    }
  }

  componentWillMount() {
    const { classValue, pageSize, offset } = this.state
    const params = { goodsclass: classValue.length === 0 ? null : classValue.join(','), pageSize, offset }
    fetchShop(params).then((data) => {
      const { goodsList, listSize } = data
      this.setState({ shopData: goodsList, listSize })
    })
  }

  handleOnFilter = (filterData) => {
    const { pageSize } = this.state
    const params = { ...filterData, pageSize, offset: 0 }
    this.setState({ filterData })
    fetchShop(params).then((data) => {
      const { goodsList, listSize } = data
      this.setState({ shopData: goodsList, listSize })
    })
  }

  handlePage = (pageNumber) => {
    const { filterData, pageSize } = this.state
    this.setState({ offset: pageNumber })
    const params = { ...filterData, pageSize, offset: pageNumber }
    fetchShop(params).then((data) => {
      const { goodsList, listSize } = data
      this.setState({ shopData: goodsList, listSize })
    })
  }

  render() {
    const { prefixCls } = this.props
    const {
      shopData, classValue, listSize, pageSize, offset,
    } = this.state

    return (
      <div className={prefixCls} style={{ padding: 20 }}>
        <ShopSelect
          defaultValue={classValue}
          options={selectOptions}
          onSelect={this.handleOnFilter}
        />

        <div className={`${prefixCls}-shop-con`}>
          {shopData.map(item => (
            <GoodsItem key={item.goodsid} className={`${prefixCls}-item`} dataSource={item} />
          ))}
        </div>

        <div className={`${prefixCls}-page`}>
          <Pagination
            current={offset}
            pageSize={pageSize}
            total={listSize}
            onChange={this.handlePage}
          />
        </div>
        <BackTop />
      </div>
    )
  }
}

export default Shop
