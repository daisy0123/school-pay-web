import React, { PureComponent, PropTypes } from 'react'
import forEach from 'lodash/forEach'
import { Icon, Popconfirm, message, Modal } from 'antd'

import { adminGoodsInfo, deleteGoods, fetchGoods, updateGoods } from 'api/sp-admin'
import { unixDateFormat } from 'utils/date'
import { goodsStatus } from 'constant/goods-constant'
import AdminTable from 'core/admin-table'
import GoodsForm from 'core/goods-form'

import './goods-manage.scss'

class GoodsManage extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'goods-manage',
  }

  constructor(props) {
    super(props)

    this.state = {
      random: 0,
      goodsVisible: false,
    }
  }

  transformData = (result) => {
    const data = []
    forEach(result, (item) => {
      data.push({ ...item, key: item.goodsid })
    })
    return { data }
  }

  handleDelete = (goodsId) => {
    deleteGoods({ goodsId }).then(() => {
      message.success('删除成功！')
      this.reloadTable()
    })
  }

  reloadTable = () => {
    this.setState({ random: this.state.random + Math.random() })
  }

  handleCancel = () => {
    this.setState({ goodsVisible: false })
  }

  handleShow = (goodsId) => {
    this.setState({ goodsVisible: true }, () => {
      fetchGoods({ goodsId }).then((data) => {
        this.setState({ goodsData: data, goodsId })
      })
    })
  }

  handleUpdate = (result) => {
    const params = { ...result, goodsId: this.state.goodsId }
    updateGoods(params).then(() => {
      message.success('编辑成功！')
      this.setState({ goodsVisible: false }, () => {
        this.reloadTable()
      })
    })
  }

  columns = [{
    title: 'ID',
    dataIndex: 'goodsid',
    key: 'goodsid',
    width: 50,
  }, {
    title: '商品封面',
    dataIndex: 'goodscover',
    key: 'goodscover',
    render: (text, record) => (<img className="goods-img" src={text} alt={record.goodsid} />),
  }, {
    title: '商品名称',
    dataIndex: 'goodsname',
    key: 'goodsname',
    width: 150,
  }, {
    title: '商品价格',
    dataIndex: 'goodsprice',
    key: 'goodsprice',
  }, {
    title: '商品简介',
    dataIndex: 'goodsintro',
    key: 'goodsintro',
    width: 250,
  }, {
    title: '卖家ID',
    key: 'userid',
    dataIndex: 'userid',
    width: 50,
  }, {
    title: '发布时间',
    key: 'createtime',
    dataIndex: 'createtime',
    render: text => unixDateFormat(text),
  }, {
    title: '修改时间',
    key: 'modifytime',
    dataIndex: 'modifytime',
    render: text => unixDateFormat(text),
  }, {
    title: '状态',
    key: 'goodsstatus',
    dataIndex: 'goodsstatus',
    render: text => goodsStatus[text],
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div className="action-icon">
        <span
          onClick={() => this.handleShow(record.goodsid)}
          onKeyDown={() => this.handleShow(record.goodsid)}
        >
          <Icon type="edit" title="点击编辑" />
        </span>
        <Popconfirm
          title={`你确定要删除${record.goodsname}商品？`}
          onConfirm={() => this.handleDelete(record.goodsid)}
          okText="确定"
          cancelText="取消"
        >
          <span><Icon type="delete" title="点击删除" /></span>
        </Popconfirm>
      </div>),
  }]

  render() {
    const { prefixCls } = this.props
    const { goodsData, random, goodsVisible } = this.state
    return (
      <div className={prefixCls}>
        <AdminTable
          columns={this.columns}
          random={random}
          onFetchData={adminGoodsInfo}
          transformTableData={this.transformData}
        />

        {goodsVisible && (
          <Modal
            title="编辑用户"
            visible={goodsVisible}
            onCancel={this.handleCancel}
            footer=""
          >
            {goodsData && (
              <GoodsForm defaultData={goodsData} onSubmit={this.handleUpdate} />
            )}
          </Modal>
        )}
      </div>
    )
  }
}

export default GoodsManage
