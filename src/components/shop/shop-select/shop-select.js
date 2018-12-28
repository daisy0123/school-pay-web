import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Input, Checkbox } from 'antd'
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'

import './shop-select.scss'

const { Search } = Input
const CheckboxGroup = Checkbox.Group

class ShopSelect extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    defaultValue: PropTypes.array,
    options: PropTypes.array,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'shop-select',
    className: '',
    defaultValue: [],
    options: [],
    onSelect: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      filterData: {},
    }
  }

  genSelection = () => {
    const { prefixCls, options, defaultValue } = this.props
    const selectionCon = []
    forEach(options, (item) => {
      const checkboxItem = (
        <CheckboxGroup
          key={item.name}
          defaultValue={defaultValue}
          options={item.value}
          onChange={checkedValues => this.handleSelect(item.name, checkedValues)}
        />)
      selectionCon.push(checkboxItem)
    })

    return (
      <div className={`${prefixCls}-class-tag`}>
        {selectionCon}
      </div>
    )
  }

  handleSelect = (name, checkedValues) => {
    const filterData = { ...this.state.filterData, [name]: checkedValues.join(',') }
    if (checkedValues.length === 0) {
      delete filterData[name]
    }
    this.setState({ filterData })
    this.props.onSelect(filterData)
  }

  handleKeyword = (value) => {
    const filterData = { ...this.state.filterData, keyword: value }
    if (value.trim() === '') {
      delete filterData.keyword
    }
    this.setState({ filterData })
    this.props.onSelect(filterData)
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)

    return (
      <div className={classString}>
        <div className={`${prefixCls}-selection`}>
          <div className={`${prefixCls}-search`}>
            <Search enterButton placeholder="请输入你要查询的商品" onSearch={this.handleKeyword} />
          </div>
        </div>

        {this.genSelection()}
      </div>
    )
  }
}

export default ShopSelect
