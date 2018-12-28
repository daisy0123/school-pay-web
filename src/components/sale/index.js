import React, { PureComponent, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, message } from 'antd'
import keys from 'lodash/keys'

import { publishGoods } from 'api/sp-goods'
import GoodsForm from 'core/goods-form'

import './sale.scss'

const defaultParams = {
  goodsprice: 0,
  goodsclass: 0,
}
class Sale extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'sale-page',
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentWillMount() {
    const userid = sessionStorage.getItem('userid')
    if (!userid) {
      message.warning('请先登录！')
      this.props.history.push('/')
    } else {
      this.setState({ userid })
    }
  }

  handleSale = (params) => {
    const { userid } = this.state
    const saleParams = { ...params, userid }
    if (keys(saleParams).length === 7) {
      publishGoods(saleParams).then(() => {
        message.success('发布成功！')
        this.props.history.push('/personal/personalGoods')
      })
    } else {
      message.warning('请填写完整所有必填的信息！')
    }
  }

  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        <Row>
          <Col className={`${prefixCls}-form`} span={18} offset={3}>
            <p className="sale-header">发布二手商品</p>
            <GoodsForm defaultParams={defaultParams} onSubmit={this.handleSale} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Sale)
