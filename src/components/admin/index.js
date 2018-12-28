import React, { PureComponent, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import classNames from 'classnames'
import { Menu, Icon, Row, Col } from 'antd'

import ROUTES from 'routes'

import './index.scss'

class Admin extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'admin',
    className: '',
  }

  constructor(props) {
    super(props)

    let activeMenu = ''
    ROUTES.admin.forEach((item) => {
      if (window.location.pathname === item.path) {
        activeMenu = item.id
      }
    })

    this.state = {
      activeMenu,
    }
  }

  handleMenu = ({ key }) => {
    this.setState({ activeMenu: key })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(className, prefixCls)
    const activeKey = [this.state.activeMenu]

    return (
      <Router>
        <Row className={classString}>
          <Col span={3}>
            <Menu style={{ height: 540 }} mode="inline" selectedKeys={activeKey} onClick={this.handleMenu}>
              {ROUTES.admin.map(item => (
                <Menu.Item key={item.id}>
                  <Link to={item.path}><Icon type={item.icon} />{item.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Col>

          <Col className={`${prefixCls}-content`} span={21}>
            <Switch>
              {ROUTES.admin.map(item => (
                <Route key={item.id} path={item.path} component={item.component} />
              ))}
            </Switch>
          </Col>
        </Row>
      </Router>
    )
  }
}

export default Admin
