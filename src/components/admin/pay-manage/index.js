import React, { PureComponent, PropTypes } from 'react'
import forEach from 'lodash/forEach'
import { Icon, Popconfirm, message, Modal, Input, Form } from 'antd'

import AdminTable from 'core/admin-table'
import { adminOrderInfo, deleteOrder, fetchOrder, updateOrder } from 'api/sp-admin'
import { orderStatus } from 'constant/goods-constant'
import { unixDateFormat, unixTimeFormat } from 'utils/date'

import './pay-manage.scss'

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
}

const FormItem = Form.Item

class PayManage extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'pay-manage',
  }

  constructor(props) {
    super(props)

    this.state = {
      random: 0,
      orderVisible: false,
      params: {},
    }
  }

  transformData = (result) => {
    const data = []
    forEach(result, (item) => {
      data.push({ ...item, key: item.orderid })
    })
    return { data }
  }

  handleDelete = (orderId) => {
    deleteOrder({ orderId }).then(() => {
      message.success('删除成功！')
      this.reloadTable()
    })
  }

  reloadTable = () => {
    this.setState({ random: this.state.random + Math.random() })
  }

  handleOk = () => {
    const params = { ...this.state.params, orderId: this.state.orderId }
    updateOrder(params).then(() => {
      message.success('编辑成功！')
      this.setState({ orderVisible: false }, () => {
        this.reloadTable()
      })
    })
  }

  handleCancel = () => {
    this.setState({ orderVisible: false })
  }

  handleShow = (orderId) => {
    this.setState({ orderVisible: true }, () => {
      fetchOrder({ orderId }).then((data) => {
        this.setState({ orderData: data, orderId })
      })
    })
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    const params = { ...this.state.params, [name]: value.trim() }
    if (value.trim() === '') {
      delete params[name]
    }
    this.setState({ params })
  }

  columns = [{
    title: 'ID',
    dataIndex: 'orderid',
    key: 'orderid',
  }, {
    title: '商品ID',
    dataIndex: 'goodsid',
    key: 'goodsid',
  }, {
    title: '卖家ID',
    dataIndex: 'salerid',
    key: 'salerid',
  }, {
    title: '买家ID',
    dataIndex: 'buyerid',
    key: 'buyerid',
  }, {
    title: '交易人',
    dataIndex: 'tradename',
    key: 'tradename',
  }, {
    title: '交易时间',
    key: 'tradetime',
    dataIndex: 'tradetime',
    render: text => unixTimeFormat(text),
  }, {
    title: '交易地址',
    key: 'address',
    dataIndex: 'address',
  }, {
    title: '订单时间',
    key: 'ordertime',
    dataIndex: 'ordertime',
    render: text => unixDateFormat(text),
  }, {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: text => orderStatus[text],
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div className="action-icon">
        <span
          onClick={() => this.handleShow(record.orderid)}
          onKeyDown={() => this.handleShow(record.orderid)}
        >
          <Icon type="edit" title="点击编辑" />
        </span>
        <Popconfirm
          title="你确定要删除该交易？"
          onConfirm={() => this.handleDelete(record.orderid)}
          okText="确定"
          cancelText="取消"
        >
          <span><Icon type="delete" title="点击删除" /></span>
        </Popconfirm>
      </div>),
  }]

  render() {
    const { prefixCls } = this.props
    const { orderData, random, orderVisible } = this.state

    return (
      <div className={prefixCls}>
        <AdminTable
          columns={this.columns}
          random={random}
          onFetchData={adminOrderInfo}
          transformTableData={this.transformData}
        />

        {orderData && (
          <Modal
            title="编辑用户"
            visible={orderVisible}
            okText="保存"
            cancelText="取消"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {orderData && (
              <Form>
                <FormItem label="交易人" {...formItemLayout} required>
                  <Input name="tradename" defaultValue={orderData.tradename} onChange={this.handleOnChange} />
                </FormItem>
                <FormItem label="交易时间" {...formItemLayout} required>
                  <Input name="buytime" defaultValue={orderData.buytime} onChange={this.handleOnChange} />
                </FormItem>
                <FormItem label="交易地址" {...formItemLayout} required>
                  <Input name="address" defaultValue={orderData.address} onChange={this.handleOnChange} />
                </FormItem>
              </Form>
            )}
          </Modal>
        )}
      </div>
    )
  }
}

export default PayManage
