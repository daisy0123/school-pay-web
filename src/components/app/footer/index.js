import React, { PureComponent, PropTypes } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class SchoolPayFooter extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'school-pay-footer',
  }

  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        <Footer style={{ textAlign: 'center' }}>
          校园二手街 ©2017 丘玉秀
        </Footer>
      </div>
    )
  }
}

export default SchoolPayFooter
