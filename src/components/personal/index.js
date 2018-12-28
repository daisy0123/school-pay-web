import React, { PureComponent, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Menu, Icon, Row, Col, message } from 'antd'

import ROUTES from 'routes'

import './index.scss'

class Personal extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'personal-page',
    className: '',
  }

  constructor(props) {
    super(props)

    let activeMenu = ''
    ROUTES.person.forEach((item) => {
      if (window.location.pathname === item.path) {
        activeMenu = item.id
      }
    })

    this.state = {
      activeMenu,
    }
  }

  componentWillMount() {
    const userid = sessionStorage.getItem('userid')
    if (!userid) {
      message.warning('请先登录！')
      this.props.history.push('/')
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
          <Col span={4}>
            <Menu style={{ height: 540 }} mode="inline" selectedKeys={activeKey} onClick={this.handleMenu}>
              {ROUTES.person.map(item => (
                <Menu.Item key={item.id}>
                  <Link to={item.path}><Icon type={item.icon} />{item.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Col>

          <Col className={`${prefixCls}-content`} span={20}>
            <Switch>
              {ROUTES.person.map(item => (
                <Route key={item.id} path={item.path} component={item.component} />
              ))}
            </Switch>
          </Col>
        </Row>
      </Router>
    )
  }
}

export default withRouter(Personal)
