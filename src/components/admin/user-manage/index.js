import React, { PureComponent, PropTypes } from 'react'
import forEach from 'lodash/forEach'
import { Icon, Popconfirm, message, Radio, Form, Input, Modal } from 'antd'

import { adminUserInfo, deleteUser, fetchUser, updateUser } from 'api/sp-admin'
import AdminTable from 'core/admin-table'
import { unixDateFormat } from 'utils/date'

import './user-manage.scss'

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
}

const sexOptions = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
]

const FormItem = Form.Item
const RadioGroup = Radio.Group

class UserManage extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'user-manage',
  }

  constructor(props) {
    super(props)

    this.state = {
      random: 0,
      userVisible: false,
      params: {},
    }
  }

  transformData = (result) => {
    const data = []
    forEach(result, (item) => {
      data.push({ ...item, key: item.userid })
    })
    return { data }
  }

  handleDelete = (userId) => {
    deleteUser({ userId }).then(() => {
      message.success('删除成功!')
      this.reloadTable()
    })
  }

  reloadTable = () => {
    this.setState({ random: this.state.random + Math.random() })
  }

  handleOk = () => {
    const params = { ...this.state.params, userId: this.state.userId }
    updateUser(params).then(() => {
      message.success('编辑成功！')
      this.setState({ userVisible: false }, () => {
        this.reloadTable()
      })
    })
  }

  handleCancel = () => {
    this.setState({ userVisible: false })
  }

  handleShow = (userId) => {
    this.setState({ userVisible: true }, () => {
      fetchUser({ userId }).then((data) => {
        this.setState({ userData: data, userId })
      })
    })
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    const newValue = name === 'sex' ? value : value.trim()
    const params = { ...this.state.params, [name]: newValue }
    if (newValue === '') {
      delete params[name]
    }
    this.setState({ params })
  }

  columns = [{
    title: '用户Id',
    dataIndex: 'userid',
    key: 'userid',
  }, {
    title: '用户头像',
    dataIndex: 'userimage',
    key: 'userimage',
    render: (text, record) => (<img className="user-img" src={text} alt={record.userid} />),
  }, {
    title: '用户昵称',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '用户性别',
    dataIndex: 'sex',
    key: 'sex',
    render: text => <span>{text === 0 ? '男' : '女'}</span>,
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '邮箱地址',
    key: 'email',
    dataIndex: 'email',
  }, {
    title: '密码',
    key: 'password',
    dataIndex: 'password',
  }, {
    title: '注册时间',
    key: 'createtime',
    dataIndex: 'createtime',
    render: text => unixDateFormat(text),
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div className="action-icon">
        <span
          onClick={() => this.handleShow(record.userid)}
          onKeyDown={() => this.handleShow(record.userid)}
        >
          <Icon type="edit" title="点击编辑" />
        </span>
        <Popconfirm
          title={`你确定要删除${record.username}用户？`}
          onConfirm={() => this.handleDelete(record.userid)}
          okText="确定"
          cancelText="取消"
        >
          <span><Icon type="delete" title="点击删除" /></span>
        </Popconfirm>
      </div>),
  }]

  render() {
    const { prefixCls } = this.props
    const { userData, random, userVisible } = this.state

    return (
      <div className={prefixCls}>
        <AdminTable
          columns={this.columns}
          random={random}
          onFetchData={adminUserInfo}
          transformTableData={this.transformData}
        />

        {userVisible && (
          <Modal
            title="编辑用户"
            visible={userVisible}
            okText="保存"
            cancelText="取消"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {userData && (
              <Form>
                <FormItem label="用户昵称" {...formItemLayout} required>
                  <Input name="username" defaultValue={userData.username} onChange={this.handleOnChange} />
                </FormItem>
                <FormItem label="性别" {...formItemLayout} required>
                  <RadioGroup name="sex" options={sexOptions} defaultValue={userData.sex} onChange={this.handleOnChange} />
                </FormItem>
                <FormItem label="手机号码" {...formItemLayout} required>
                  <Input name="phone" defaultValue={userData.phone} onChange={this.handleOnChange} />
                </FormItem>
                <FormItem label="邮箱" {...formItemLayout} required>
                  <Input name="email" defaultValue={userData.email} onChange={this.handleOnChange} />
                </FormItem>
                <FormItem label="密码" {...formItemLayout} required>
                  <Input name="password" defaultValue={userData.password} onChange={this.handleOnChange} />
                </FormItem>
              </Form>
            )}
          </Modal>
        )}
      </div>
    )
  }
}

export default UserManage
