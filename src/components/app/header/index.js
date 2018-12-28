import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Layout } from 'antd'

import ROUTES from 'routes'
import Login from 'components/login'
import logo from './image/logo.png'

import './header.scss'

const { Header } = Layout
const { menu } = ROUTES
class SchoolPayHeader extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'school-pay-header',
  }

  constructor(props) {
    super(props)

    const { pathname } = window.location
    let activeMenu = ''
    menu.forEach((route) => {
      if (pathname.indexOf(route.path) !== -1) {
        activeMenu = route.id
      }
    })

    this.state = {
      activeMenu,
      isAdminPage: pathname === '/admin' || pathname.indexOf('/adminPage') !== -1,
    }
  }

  genMenuItem = () => {
    const menuBody = []
    if (this.state.isAdminPage) {
      menuBody.push('')
    } else {
      menu.forEach((route) => {
        const menuItem = (
          <Menu.Item key={route.id}>
            <Link to={route.path}>{route.name}</Link>
          </Menu.Item>
        )
        menuBody.push(menuItem)
      })
    }
    return menuBody
  }

  handleActive = (value) => {
    this.setState({ activeMenu: value.key })
  }

  render() {
    const { prefixCls } = this.props
    const activeMenu = [this.state.activeMenu]

    return (
      <div className={prefixCls}>
        <Header style={{ position: 'fixed', width: '100%' }}>
          {this.state.isAdminPage ? (<img className="admin-logo" src={logo} alt="logo" />) : (
            <Link className="logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
          )}
          <Menu
            theme="dark"
            mode="horizontal"
            className={`${prefixCls}-menu`}
            selectedKeys={activeMenu}
            style={{ lineHeight: '64px' }}
            onClick={this.handleActive}
          >
            {this.genMenuItem()}
          </Menu>

          {!this.state.isAdminPage && (
            <div className="login-mess">
              <Login />
            </div>
          )}
        </Header>
      </div>
    )
  }
}

export default SchoolPayHeader
