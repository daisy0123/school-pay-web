import React, { PureComponent, PropTypes } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'

import './admin-login.scss'

const FormItem = Form.Item

class AdminLogin extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'admin-login',
  }

  constructor(props) {
    super(props)

    this.state = {
      params: {},
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target
    const params = { ...this.state.params, [name]: value }
    if (value.trim() === '') {
      delete params[name]
    }
    this.setState({ params })
  }

  handleAdminLogin = () => {
    const { admin, adminAuth } = this.state.params
    if (admin === 'admin' && adminAuth === 'admin') {
      window.location.href = '/adminPage/userManage'
    } else {
      message.warning('请填写完整账号和密码!')
    }
  }

  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-header`}>管理员登录</div>
        <Form>
          <FormItem>
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} name="admin" onChange={this.handleInput} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" name="adminAuth" onChange={this.handleInput} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleAdminLogin}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default AdminLogin

