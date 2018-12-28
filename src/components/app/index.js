import React, { PureComponent, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, notification } from 'antd'

import ROUTES from 'routes'
import NotFoundPage from 'components/not-found-page'
import { fetchOrderMessage } from 'api/sp-shop'

import SchoolPayHeader from './header'
import SchoolPayFooter from './footer'

import './index.scss'

const { Content } = Layout
const { menu, routes } = ROUTES

class App extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'school-pay-page',
  }

  componentDidMount = () => {
    this.timer = window.setInterval(this.handleOrderMessage, 60000)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.timer)
  }

  handleOrderMessage = () => {
    const userId = sessionStorage.getItem('userid')
    if (userId) {
      fetchOrderMessage({ buyerid: userId }).then((data) => {
        const len = data.length
        if (len > 0) {
          notification.info({
            message: `你有${len}份订单待处理！`,
            description: <a href="/personal/personalOrder">点击查看我的订单</a>,
          })
        }
      })
    }
  }

  render() {
    const { prefixCls } = this.props
    const route = item => (
      <Route
        key={item.id}
        exact={item.exact}
        path={item.path}
        component={item.component}
      />
    )

    return (
      <Router>
        <Layout className={prefixCls} style={{ height: '100vh' }}>
          <Layout>
            <SchoolPayHeader />
            <Content className={`${prefixCls}-content`}>
              <Switch>
                {routes.concat(menu).map(item => (route(item)))}
                <Route component={NotFoundPage} />
              </Switch>
            </Content>
            <SchoolPayFooter />
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default App
