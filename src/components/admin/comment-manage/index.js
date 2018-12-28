import React, { PureComponent, PropTypes } from 'react'
import forEach from 'lodash/forEach'
import { Icon, Popconfirm, message, Form, Input, Modal } from 'antd'

import AdminTable from 'core/admin-table'
import { adminCommentInfo, deleteComment, fetchComment, updateComment } from 'api/sp-admin'
import { unixDateFormat } from 'utils/date'

import './comment-manage.scss'

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
}
const { TextArea } = Input
const FormItem = Form.Item

class CommentManage extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'comment-manage',
  }

  constructor(props) {
    super(props)

    this.state = {
      random: 0,
      params: {},
      commentVisible: false,
    }
  }

  transformData = (result) => {
    const data = []
    forEach(result, (item) => {
      data.push({ ...item, key: item.commentid })
    })
    return { data }
  }

  handleDelete = (commentId) => {
    deleteComment({ commentId }).then(() => {
      message.success('删除成功！')
      this.reloadTable()
    })
  }

  handleOk = () => {
    const params = { ...this.state.params, commentId: this.state.commentId }
    updateComment(params).then(() => {
      message.success('编辑成功！')
      this.setState({ commentVisible: false }, () => {
        this.reloadTable()
      })
    })
  }

  handleCancel = () => {
    this.setState({ commentVisible: false })
  }

  handleShow = (commentId) => {
    this.setState({ commentVisible: true }, () => {
      fetchComment({ commentId }).then((data) => {
        this.setState({ commentData: data, commentId })
      })
    })
  }

  handleInput = (e) => {
    const { name, value } = e.target
    const params = { ...this.state.params, [name]: value.trim() }
    if (value.trim() === '') {
      delete params[name]
    }
    this.setState({ params })
  }

  reloadTable = () => {
    this.setState({ random: this.state.random + Math.random() })
  }

  columns = [{
    title: 'ID',
    dataIndex: 'commentid',
    key: 'commentid',
  }, {
    title: '评价人ID',
    dataIndex: 'commenterid',
    key: 'commenterid',
  }, {
    title: '被评价人ID',
    dataIndex: 'commentedid',
    key: 'commentedid',
  }, {
    title: '评价内容',
    dataIndex: 'comment',
    key: 'comment',
  }, {
    title: '评价时间',
    dataIndex: 'commenttime',
    key: 'commenttime',
    render: text => unixDateFormat(text),
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div className="action-icon">
        <span
          onClick={() => this.handleShow(record.commentid)}
          onKeyDown={() => this.handleShow(record.commentid)}
        >
          <Icon type="edit" title="点击编辑" />
        </span>
        <Popconfirm
          title="你确定要删除该评价？"
          onConfirm={() => this.handleDelete(record.commentid)}
          okText="确定"
          cancelText="取消"
        >
          <span><Icon type="delete" title="点击删除" /></span>
        </Popconfirm>
      </div>),
  }]

  render() {
    const { prefixCls } = this.props
    const { commentData, random, commentVisible } = this.state

    return (
      <div className={prefixCls}>
        <AdminTable
          columns={this.columns}
          random={random}
          onFetchData={adminCommentInfo}
          transformTableData={this.transformData}
        />

        {commentVisible && (
          <Modal
            title="编辑用户"
            visible={commentVisible}
            okText="保存"
            cancelText="取消"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {commentData && (
              <Form>
                <FormItem label="评价内容" {...formItemLayout} required>
                  <TextArea name="comment" defaultValue={commentData.comment} onChange={this.handleInput} rows={4} />
                </FormItem>
              </Form>
            )}
          </Modal>
        )}
      </div>
    )
  }
}

export default CommentManage
