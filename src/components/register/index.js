import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Form, Input, Radio, Button, message } from 'antd'
import _ from 'lodash'

import { alertRegister, fetRegister } from 'api/sp-user'

import './register.scss'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 },
}

const sexOptions = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
]

const FormItem = Form.Item
const RadioGroup = Radio.Group

class Register extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'register',
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      registerParams: {},
      usernameError: '',
      phoneError: '',
      emailError: '',
      confirmError: false,
    }
  }

  componentWillMount = () => {
    fetRegister().then((data) => {
      const { uname, uphone, uemail } = data
      this.setState({ uname, uphone, uemail })
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
    } else if (name === 'password') {
      const { confirm } = this.state.registerParams
      this.setState({ confirmError: value === '' || value !== confirm })
    } else if (name === 'confirm') {
      const { password } = this.state.registerParams
      this.setState({ confirmError: value === '' || value !== password })
    }

    const registerParams = { ...this.state.registerParams, [name]: value }
    this.setState({ registerParams })
  }

  handleRegister = () => {
    const { registerParams } = this.state
    const isAll = _.keys(registerParams).length === 6
    if (isAll) {
      alertRegister(registerParams).then(() => {
        message.success('注册成功！请登录')
        window.location.href = '/'
      })
    } else {
      message.error('请填写完整必填的注册信息')
    }
  }

  renderFormItem = (label, name, placeholder) => {
    const {
      usernameError, phoneError, emailError, confirmError,
    } = this.state

    let item = null
    if (name === 'sex') {
      item = (<RadioGroup options={sexOptions} onChange={e => this.handleOnChange(name, e)} />)
    } else if (name === 'password' || name === 'confirm') {
      item = (<Input type="password" placeholder={placeholder} onChange={e => this.handleOnChange(name, e)} />)
    } else {
      item = (<Input placeholder={placeholder} onChange={e => this.handleOnChange(name, e)} />)
    }

    return (
      <FormItem
        className="sp-form-item"
        label={label}
        {...formItemLayout}
        required
      >
        {item}
        {name === 'username' && <p>{usernameError}</p>}
        {name === 'phone' && <p>{phoneError}</p>}
        {name === 'email' && <p>{emailError}</p>}
        {confirmError && name === 'confirm' && <p>密码不能为空且两次密码输入需相同！</p>}
      </FormItem>
    )
  }

  render() {
    const { prefixCls, className } = this.props
    const classString = classNames(prefixCls, className)
    const {
      usernameError, phoneError, emailError, confirmError,
    } = this.state

    const isDisabled = usernameError !== '' || phoneError !== '' || emailError !== '' || confirmError

    return (
      <div className={classString}>
        <h2>用户注册</h2>
        <div className={`${prefixCls}-content`}>
          {this.renderFormItem('用户昵称', 'username', '请输入用户昵称(10字以内)')}

          {this.renderFormItem('性别', 'sex')}

          {this.renderFormItem('手机号码', 'phone', '请输入手机号码')}

          {this.renderFormItem('邮箱', 'email', '请输入邮箱')}

          {this.renderFormItem('密码', 'password', '请输入密码')}

          {this.renderFormItem('确认密码', 'confirm', '请再次输入密码')}

          <Button
            className="register-submit"
            type="primary"
            disabled={isDisabled}
            onClick={this.handleRegister}
          >
            注册
          </Button>
        </div>
      </div>
    )
  }
}

export default Register
