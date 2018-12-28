import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'

class About extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'about',
    className: '',
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)

    return (
      <div className={classString}>
        About
      </div>
    )
  }
}

export default About
