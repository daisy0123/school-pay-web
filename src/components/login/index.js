import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Input, Button, Modal, message, Menu, Dropdown } from 'antd'

import { alertLogin } from 'api/sp-user'

import './login.scss'

const handleLogout = ({ key }) => {
  if (key === 'logout') {
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem('username')
    window.location.href = '/'
  }
}

const menu = (
  <Menu onClick={handleLogout}>
    <Menu.Item key="personal"><Link to="/personal/personalIndex">个人中心</Link></Menu.Item>
    <Menu.Item key="logout">退出</Menu.Item>
  </Menu>
)

class Login extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'login',
  }

  constructor(props) {
    super(props)

    this.state = {
      loginVisible: false,
      loginParams: {},
      isLogin: sessionStorage.getItem('userid'),
      username: sessionStorage.getItem('username'),
    }
  }

  componentWillUnmount = () => {
    this.handleCancel()
  }

  onChange = (name, e) => {
    const params = { ...this.state.loginParams, [name]: e.target.value }
    this.setState({ loginParams: params })
  }

  showModal = () => {
    this.setState({
      loginVisible: true,
      loginParams: {},
    })
  }

  handleCancel = () => {
    this.setState({
      loginVisible: false,
    })
  }

  handleLogin = () => {
    const { loginParams } = this.state
    const { username, password } = loginParams
    if (username && password) {
      alertLogin(loginParams).then((data) => {
        if (data.isLogin) {
          sessionStorage.setItem('userid', data.userid)
          sessionStorage.setItem('username', data.username)
          message.success('登录成功！')
          window.location.href = '/'
        } else {
          message.error('登录失败！请确保该用户存在且用户名和密码正确！')
        }
      })
    } else {
      message.error('请输入登录名和密码！')
    }
  }

  renderInput = (placeholder, prefix, name) => (
    <Input
      className="login-input"
      placeholder={placeholder}
      type={name === 'password' ? 'password' : 'text'}
      prefix={<Icon type={prefix} style={{ color: 'rgba(0,0,0,.25)' }} />}
      onChange={e => this.onChange(name, e)}
    />
  )

  render() {
    const { prefixCls } = this.props
    const { loginVisible, isLogin, username } = this.state

    return (
      <div className={prefixCls}>
        {isLogin ? (
          <Dropdown overlay={menu} placement="bottomCenter">
            <span className="username">
              {username}
              <Icon type="down" />
            </span>
          </Dropdown>)
          : (<span key="login" onClick={this.showModal} onKeyDown={this.showModal}>登录</span>) }

        {loginVisible && (
          <Modal
            className={`${prefixCls}-modal`}
            title="用户登录"
            width={350}
            footer=""
            maskClosable={false}
            visible={loginVisible}
            onCancel={this.handleCancel}
          >
            {this.renderInput('请输入登录名', 'user', 'username')}

            {this.renderInput('请输入登录密码', 'lock', 'password')}

            <Button className="login-submit" type="primary" onClick={this.handleLogin}>登录</Button>

            <p className="to-register">
              如果没有账户，那么就
              <a href="/register">去注册</a>吧
            </p>
          </Modal>
        )}
      </div>
    )
  }
}

export default Login
