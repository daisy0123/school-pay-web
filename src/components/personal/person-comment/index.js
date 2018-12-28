import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs } from 'antd'

import { fetchCommented, fetchCommenter } from 'api/sp-user'
import TabContent from 'core/tab-content'

import './index.scss'

const { TabPane } = Tabs

class PersonComment extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'person-comment',
    className: '',
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const userId = sessionStorage.getItem('userid')

    return (
      <div className={classString}>
        <Tabs defaultActiveKey="userComment" className={`${prefixCls}-tab`}>
          <TabPane tab="我发出的评价" key="userComment">
            <TabContent userId={userId} fetchData={fetchCommenter} tabType="comment" />
          </TabPane>
          <TabPane tab="我收到的评价" key="userCommented">
            <TabContent userId={userId} fetchData={fetchCommented} tabType="comment" />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default PersonComment
