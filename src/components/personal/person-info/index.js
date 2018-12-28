import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import pull from 'lodash/pull'
import keys from 'lodash/keys'
import { Row, Col, Form, Button, Input, Radio, message } from 'antd'

import SpUpload from 'core/upload'
import { fetRegister, fetchUserInfo, updateUserInfo } from 'api/sp-user'

import './index.scss'

const formItemLayout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 12 },
}

const sexOptions = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
]

const FormItem = Form.Item
const RadioGroup = Radio.Group

class PersonInfo extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'person-info',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      updateParams: {},
      usernameError: '',
      phoneError: '',
      emailError: '',
    }
  }

  componentWillMount = () => {
    const userId = sessionStorage.getItem('userid')
    fetchUserInfo({ userId }).then((result) => {
      const { userInfo } = result
      this.setState({ userInfo })

      fetRegister().then((data) => {
        const { uname, uphone, uemail } = data
        pull(uname, userInfo.username)
        pull(uphone, userInfo.phone)
        pull(uemail, userInfo.email)
        this.setState({
          uname, uphone, uemail, userId,
        })
      })
    })
  }

  handleOnChange = (name, e) => {
    const { uname, uphone, uemail } = this.state
    const value = name === 'sex' ? e.target.value : e.target.value.trim()
    const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
    const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
    if (name === 'username') {
      const isUserName = value && value.length <= 10 && value.length > 0
      let usernameError = ''
      if (!isUserName) {
        usernameError = '用户昵称不能为空且小于11个字！'
      } else if (uname.indexOf(value) !== -1) {
        usernameError = '该用户昵称已被注册！'
      } else {
        usernameError = ''
      }
      this.setState({ usernameError })
    } else if (name === 'phone') {
      const isPhone = value && value.length === 11 && phoneReg.test(value)
      let phoneError = ''
      if (!isPhone) {
        phoneError = '电话号码不能为空且格式需有效！'
      } else if (uphone.indexOf(value) !== -1) {
        phoneError = '该电话号码已被注册！'
      } else {
        phoneError = ''
      }
      this.setState({ phoneError })
    } else if (name === 'email') {
      const isEmail = value && emailReg.test(value)
      let emailError = ''
      if (!isEmail) {
        emailError = '邮箱不能为空且格式需有效！'
      } else if (uemail.indexOf(value) !== -1) {
        emailError = '该邮箱已被注册！'
      } else {
        emailError = ''
      }
      this.setState({ emailError })
    }

    const updateParams = { ...this.state.updateParams, [name]: value }
    this.setState({ updateParams })
  }

  handleUpdate = () => {
    const { updateParams, userId } = this.state
    if (keys(updateParams).length === 0) {
      message.success('你没有修改信息！')
    } else {
      updateUserInfo({ updateParams, userId }).then(() => {
        message.success('修改成功！')
        window.location.href = '/personal/personalInfo'
      })
    }
  }

  handleUpload = (files) => {
    const { name, fileInfo } = files
    const updateParams = { ...this.state.updateParams, [name]: fileInfo }
    this.setState({ updateParams })
  }

  renderFormItem = (label, name, value) => {
    const { usernameError, phoneError, emailError } = this.state

    let item = null
    if (name === 'sex') {
      item = (
        <RadioGroup
          options={sexOptions}
          defaultValue={value}
          onChange={e => this.handleOnChange(name, e)}
        />
      )
    } else {
      item = (<Input defaultValue={value} onChange={e => this.handleOnChange(name, e)} />)
    }

    return (
      <FormItem
        className="sp-form-item"
        label={label}
        {...formItemLayout}
      >
        {item}
        {name === 'username' && <p>{usernameError}</p>}
        {name === 'phone' && <p>{phoneError}</p>}
        {name === 'email' && <p>{emailError}</p>}
      </FormItem>
    )
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const {
      usernameError, phoneError, emailError, userInfo,
    } = this.state
    const isSubmit = usernameError === '' && phoneError === '' && emailError === ''

    return (
      <Row className={classString}>
        { userInfo && (
          <Col span={12} offset={6}>
            <Row>
              <Col offset={9}>
                <SpUpload
                  name="userimage"
                  text="上传"
                  url="/UserImage"
                  defaultLists={[{
                    uid: userInfo.userid,
                    status: 'done',
                    url: userInfo.userimage,
                  }]}
                  onUpload={this.handleUpload}
                />
              </Col>
            </Row>

            <Form className={`${prefixCls}-form`}>
              {this.renderFormItem('用户昵称', 'username', userInfo.username)}

              {this.renderFormItem('性别', 'sex', userInfo.sex)}

              {this.renderFormItem('手机号码', 'phone', userInfo.phone)}

              {this.renderFormItem('邮箱', 'email', userInfo.email)}

              <Button
                className="update-submit"
                type="primary"
                disabled={!isSubmit}
                onClick={this.handleUpdate}
              >
                保存
              </Button>
            </Form>
          </Col>
        )}
      </Row>
    )
  }
}

export default PersonInfo
