import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Avatar, Rate, Row, Col, Popconfirm, Icon, message } from 'antd'

import { unixDateFormat } from 'utils/date'
import { deleteComment } from 'api/sp-comment'

import './comment-item.scss'

class CommentItem extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,

    dataSource: PropTypes.object,
  }

  static defaultProps = {
    prefixCls: 'comment-item',
    className: '',
    type: 'person',

    dataSource: {},
  }

  handleDelete = () => {
    const commentId = this.props.dataSource.commentid
    deleteComment({ commentId }).then(() => {
      message.success('删除成功！')
      window.location.href = '/personal/personalComment'
    })
  }

  render() {
    const {
      prefixCls, className, dataSource, type,
    } = this.props
    const classString = classNames(className, prefixCls)
    const {
      username, commenttime, score, comment, userimage,
    } = dataSource

    return (
      <div className={classString}>
        <Row className={`${prefixCls}-${type}`}>
          <Col className={`${prefixCls}-avatar`} span={4}>
            <Avatar src={userimage} />
            <p>{username}</p>
          </Col>
          <Col className={`${prefixCls}-comment`} span={20}>
            <Rate disabled value={score} />
            <p className="comment-content">{comment}</p>
            <p>
              {unixDateFormat(commenttime)}
              {type === 'person' && (
                <Popconfirm
                  title="你确定要删除该评论？"
                  onConfirm={this.handleDelete}
                  okText="确定"
                  cancelText="取消"
                >
                  <span className="action" title="点击删除">
                    <Icon type="delete" />
                  </span>
                </Popconfirm>
              )}
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommentItem
