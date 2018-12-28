import React, { PureComponent, PropTypes } from 'react'

class NotFoundPage extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'not-found-page',
  }

  render() {
    const {
      prefixCls,
    } = this.props

    return (
      <div className={prefixCls}>
        <h1>404</h1>
      </div>
    )
  }
}

export default NotFoundPage
