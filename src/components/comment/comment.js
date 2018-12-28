import React, { PureComponent, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Row, Col, Avatar, Input, Button, message, Rate } from 'antd'

import { fetchUserInfo } from 'api/sp-user'
import { alertComment } from 'api/sp-comment'
import { fetchOrderDetail } from 'api/sp-shop'

import './comment.scss'

const { TextArea } = Input
class SpComment extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'sp-comment',
    className: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      orderId: props.match.params.orderId,
      saleData: {},
      comment: '',
      commentParams: {},
      score: 0,
    }
  }

  componentWillMount = () => {
    const { orderId } = this.state
    const userId = sessionStorage.getItem('userid')
    if (!userId) {
      message.warning('请先登录！')
      this.props.history.push('/')
    } else {
      fetchOrderDetail({ orderId }).then((result) => {
        const saleId = result.salerid
        fetchUserInfo({ userId: saleId }).then((data) => {
          const commentParams = { commenterid: userId, commentedid: saleId, orderid: orderId }
          this.setState({ saleData: data.userInfo, commentParams })
        })
      })
    }
  }

  handleInput = (e) => {
    const value = e.target.value.trim()
    const commentParams = { ...this.state.commentParams, comment: value }
    this.setState({ comment: value, commentParams })
  }

  handleChange = (value) => {
    const commentParams = { ...this.state.commentParams, score: value }
    this.setState({ score: value, commentParams })
  }

  handleComment = () => {
    const { commentParams } = this.state
    alertComment(commentParams).then(() => {
      message.success('评价成功！')
      this.props.history.push('/personal/personalIndex')
    })
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const { saleData, comment, score } = this.state
    const {
      username, userimage, phone, email, count,
    } = saleData
    const isSubmit = comment !== '' && score !== 0

    return (
      <Row className={classString}>
        <Col span={16} offset={4}>
          <h2>评价卖家</h2>
          <Row className={`${prefixCls}-intro`}>
            <Col span={4}>
              <Avatar className={`${prefixCls}-avatar`} src={userimage} />
            </Col>
            <Col className="author-mess" span={20}>
              <h3>{username}</h3>
              <p>{`联系电话： ${phone}`}</p>
              <p>{`邮箱地址： ${email}`}</p>
              <p>{`已售出 ${count} 件`}</p>
            </Col>
          </Row>
          <Col className={`${prefixCls}-edit`} span={16}>
            <h3>填写评价：</h3>
            <span className="rate">评分：<Rate onChange={this.handleChange} value={score} /></span>
            <TextArea name="comment" rows={4} placeholder="请输入评价内容" onChange={this.handleInput} />
            <Button className="submit" type="primary" disabled={!isSubmit} onClick={this.handleComment}>提交</Button>
          </Col>
        </Col>
      </Row>
    )
  }
}

export default withRouter(SpComment)
