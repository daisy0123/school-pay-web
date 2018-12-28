import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs } from 'antd'

import { fetchUserBuy, fetchUserSale } from 'api/sp-user'
import TabContent from 'core/tab-content'

import './index.scss'

const { TabPane } = Tabs

class PersonOrder extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'person-order',
    className: '',
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const userId = sessionStorage.getItem('userid')

    return (
      <div className={classString}>
        <Tabs defaultActiveKey="userSale" className={`${prefixCls}-tab`}>
          <TabPane tab="我购买的交易" key="userSale">
            <TabContent userId={userId} fetchData={fetchUserBuy} type="buy" tabType="order" />
          </TabPane>
          <TabPane tab="我出售的交易" key="userBuy">
            <TabContent userId={userId} fetchData={fetchUserSale} type="sale" tabType="order" />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default PersonOrder
