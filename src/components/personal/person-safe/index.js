import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Row, Col, Form, Input, Button, message } from 'antd'
import keys from 'lodash/keys'
import { updatePassword } from 'api/sp-user'

import './index.scss'

const formItemLayout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 12 },
}
const FormItem = Form.Item
class PersonSafe extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'person-safe',
    className: '',
  }

  constructor(props) {
    super(props)

    const userId = sessionStorage.getItem('userid')
    this.state = {
      params: { userId },
      confirmError: false,
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    if (name === 'password') {
      const { confirm } = this.state.params
      this.setState({ confirmError: value === '' || value !== confirm })
    } else if (name === 'confirm') {
      const { password } = this.state.params
      this.setState({ confirmError: value === '' || value !== password })
    }
    const params = { ...this.state.params, [name]: value }
    this.setState({ params })
  }

  handleSubmit = () => {
    const { params } = this.state
    if (keys(params).length === 4) {
      updatePassword(params).then((data) => {
        if (data.isUpdate) {
          message.success('修改成功！')
        } else {
          message.error('旧密码不正确，修改失败！')
        }
      })
    } else {
      message.warning('请填写完整信息!')
    }
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const { confirmError } = this.state

    return (
      <Row className={classString}>
        <Col span={12} offset={6}>
          <Form className={`${prefixCls}-form`}>
            <FormItem label="旧密码" {...formItemLayout} required>
              <Input name="oldPassword" type="password" onChange={this.handleOnChange} />
            </FormItem>
            <FormItem label="新密码" {...formItemLayout} required>
              <Input name="password" type="password" onChange={this.handleOnChange} />
            </FormItem>
            <FormItem label="确认密码" {...formItemLayout} required>
              <Input name="confirm" type="password" onChange={this.handleOnChange} />
              <p>{confirmError && <p>密码不能为空且两次密码输入需相同！</p>}</p>
            </FormItem>
            <Button type="primary" className="submit" onClick={this.handleSubmit}>保存</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default PersonSafe
