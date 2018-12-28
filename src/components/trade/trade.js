import React, { PureComponent, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Input, Form, Button, DatePicker, message } from 'antd'
import classNames from 'classnames'
import keys from 'lodash/keys'

import { fetchGoodsDetail } from 'api/sp-goods'
import { AlertOrder } from 'api/sp-shop'

import './trade.scss'

const { TextArea } = Input
const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 },
}
const buttonItemLayout = {
  wrapperCol: { span: 12, offset: 3 },
}

class SpTrade extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'sp-trade',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      goodsId: props.match.params.goodsId,
      userInfo: {},
      goodsDetail: {},
      orderParams: {},
      phoneError: '',
    }
  }

  componentWillMount = () => {
    const { goodsId } = this.state
    const userId = sessionStorage.getItem('userid')
    if (!userId) {
      message.warning('请先登录！')
      this.props.history.push('/')
    } else {
      fetchGoodsDetail({ goodsId }).then((result) => {
        const { userInfo, goodsDetail } = result
        const orderParams = {
          ...this.state.orderParams,
          buyerid: userId,
          salerid: userInfo.userid,
          goodsid: goodsId,
        }
        this.setState({ userInfo, goodsDetail, orderParams })
      })
    }
  }

  onDateChange = (value, dateString) => {
    const orderParams = { ...this.state.orderParams, buytime: dateString }
    if (dateString.trim() === '') {
      delete orderParams.buytime
    }
    this.setState({ orderParams })
  }

  disabledDate = current => current && current < Date.now()

  handleInput = (e) => {
    const { name, value } = e.target
    const orderParams = { ...this.state.orderParams, [name]: value }
    if (name === 'tradephone') {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      const isPhone = value && value.length === 11 && phoneReg.test(value)
      this.setState({ phoneError: isPhone ? '' : '电话号码不能为空且格式需有效！' })
    }
    if (value.trim() === '') {
      delete orderParams[name]
    }
    this.setState({ orderParams })
  }

  handleOrder = () => {
    const { orderParams } = this.state
    AlertOrder(orderParams).then((data) => {
      this.props.history.push(`/buyOrder/${data.orderId}`)
    })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const {
      userInfo, goodsDetail, orderParams, phoneError,
    } = this.state

    const isSubmit = keys(orderParams).length === 7

    return (
      <Row className={classString}>
        <Col span={16} offset={4} className={`${prefixCls}-con`}>
          <img src={goodsDetail.goodscover} alt="goods" />
          <div className="goods-intro">
            <h3>{goodsDetail.goodsname}</h3>
            <p>{goodsDetail.goodsintro}</p>
            <p>{`应付金额：${goodsDetail.goodsprice} 元`}</p>
            <p>{`出售人： ${userInfo.username}`}</p>
          </div>

          <div className={`${prefixCls}-input-order`}>
            <h3>填写交易信息：</h3>
            <Form className="order-form">
              <FormItem label="交易人" {...formItemLayout} required>
                <Input name="tradename" placeholder="请输入交易人的姓名（建议真实姓名）" onChange={this.handleInput} />
              </FormItem>
              <FormItem label="联系方式" {...formItemLayout} required>
                <Input name="tradephone" placeholder="请输入交易人的联系方式" onChange={this.handleInput} />
                <p className="warning-tip">{phoneError}</p>
              </FormItem>
              <FormItem label="交易时间" {...formItemLayout} required>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="请选择交易时间"
                  disabledDate={this.disabledDate}
                  onChange={this.onDateChange}
                />
              </FormItem>
              <FormItem label="交易地址" {...formItemLayout} required>
                <TextArea name="address" rows={3} placeholder="请输入交易地址" onChange={this.handleInput} />
              </FormItem>
              <FormItem {...buttonItemLayout}>
                <Button type="primary" disabled={!isSubmit} onClick={this.handleOrder}>确认交易</Button>
              </FormItem>
            </Form>

          </div>
        </Col>
      </Row>
    )
  }
}

export default withRouter(SpTrade)
