import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import noop from 'lodash/noop'
import { Table, Input } from 'antd'

import './admin-table.scss'

const { Search } = Input
class AdminTable extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    columns: PropTypes.array,
    random: PropTypes.number,

    onFetchData: PropTypes.func,
    transformTableData: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'admin-table',
    className: '',
    columns: [],
    random: 0,
    onFetchData: noop,
    transformTableData: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
    }
  }

  componentDidMount = () => {
    this.fetch()
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.random !== nextProps.random) {
      this.fetch()
    }
  }


  handleTableChange = () => {
    const { onFetchData } = this.props
    if (onFetchData) {
      this.fetch()
    }
  }

  handleSearch = (value) => {
    this.setState({ keyword: value.trim() === '' ? null : value.trim() }, () => {
      this.fetch()
    })
  }

  fetch = () => {
    const { onFetchData, transformTableData } = this.props
    this.setState({ loading: true })
    const { keyword } = this.state
    onFetchData({ keyword }).then((result) => {
      const { data } = transformTableData(result)
      this.setState({ loading: false, data })
    }).catch(() => {
      this.setState({ loading: false, data: [] })
    })
  }

  render() {
    const {
      prefixCls, className, columns, ...other
    } = this.props
    const classString = classNames(prefixCls, className)
    const { loading, data } = this.state

    return (
      <div className={classString}>
        <div className={`${prefixCls}-search`}>
          <Search
            className="search-input"
            placeholder="请输入你要查找的名称或Id"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          onChange={this.handleTableChange}
          {...other}
        />
      </div>
    )
  }
}

export default AdminTable
