import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Row, Col, Avatar } from 'antd'

import CommentItem from 'core/comment-item'

import './author-info.scss'

class AuthorInfo extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    dataSource: PropTypes.object,
  }

  static defaultProps = {
    prefixCls: 'author-info',
    className: '',

    dataSource: {},
  }

  constructor(props) {
    super(props)

    const userId = sessionStorage.getItem('userid')
    this.state = {
      isLogin: !!userId,
    }
  }

  render() {
    const { prefixCls, className, dataSource } = this.props
    const classString = classNames(prefixCls, className)
    const {
      username, userimage, phone, email, saleCount, commentInfo,
    } = dataSource

    return (
      <div className={classString}>
        {this.state.isLogin ? (
          <div>
            <Row className={`${prefixCls}-intro`}>
              <Col span={4}>
                <Avatar className={`${prefixCls}-avatar`} src={userimage} />
              </Col>
              <Col className="author-mess" span={20}>
                <h3>{username}</h3>
                <p>{`联系电话： ${phone}`}</p>
                <p>{`邮箱地址： ${email}`}</p>
                <p>{`已售出 ${saleCount} 件`}</p>
              </Col>
            </Row>
            <div className={`${prefixCls}-comment`}>
              {commentInfo.map(item => (
                <CommentItem key={item.commentid} type="goods-page" dataSource={item} />
              ))}
            </div>
          </div>
        ) : (<h3>你未登录，暂无权限查看卖家信息！请先登录！</h3>)}
      </div>
    )
  }
}

export default AuthorInfo
