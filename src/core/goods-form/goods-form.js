import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import noop from 'lodash/noop'
import { Form, Input, Button, Select, InputNumber } from 'antd'

import { goodsClass } from 'constant/goods-constant'
import SpUpload from 'core/upload'

const { TextArea } = Input
const { Option } = Select
const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 12 },
}
const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 14 },
}

class GoodsForm extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,

    defaultParams: PropTypes.object,
    defaultData: PropTypes.object,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'goods-form',
    className: '',

    defaultParams: {},
    defaultData: {},
    onSubmit: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      params: props.defaultParams,
      namePass: true,
      introPass: true,
    }
  }

  handleOnchange = (name, value) => {
    const params = { ...this.state.params, [name]: value }
    this.setState({ params })
  }

  handleInput = (e) => {
    const { name, value } = e.target
    const len = value.trim().length
    if (name === 'goodsname') {
      this.setState({ namePass: len > 0 && len <= 50 })
    }
    if (name === 'goodsintro') {
      this.setState({ introPass: len > 0 })
    }
    const params = { ...this.state.params, [name]: value }
    if (value.trim() === '') {
      delete params[name]
    }
    this.setState({ params })
  }

  handleSubmit = () => {
    const { params } = this.state
    this.props.onSubmit(params)
  }

  handleUpload = (files) => {
    const { name, fileInfo } = files
    const params = { ...this.state.params }
    if (fileInfo) {
      params[name] = fileInfo
    } else {
      delete params[name]
    }
    this.setState({ params })
  }

  render() {
    const { prefixCls, className, defaultData } = this.props
    const classString = classNames(prefixCls, className)
    const { namePass, introPass } = this.state

    const {
      goodsname, goodsprice, goodsclass, goodsintro, goodscover, goodsdetails,
    } = defaultData

    const detail = []
    let coverList = []
    if (goodsdetails) {
      goodsdetails.split(',').map(item => (
        detail.push({
          uid: item,
          status: 'done',
          url: item,
        })
      ))
    }

    if (goodscover) {
      coverList = [{
        uid: 1,
        status: 'done',
        url: goodscover,
      }]
    }

    return (
      <Form className={classString}>
        <FormItem {...formItemLayout} label="商品名称" required>
          <Input name="goodsname" placeholder="请输入商品名称(50字以内)" defaultValue={goodsname} onChange={this.handleInput} />
          {!(namePass) && <span style={{ color: '#ff0000' }}>名称不能为空且不超过50字</span>}
        </FormItem>
        <FormItem {...formItemLayout} label="商品价格" required>
          <InputNumber defaultValue={goodsprice || 0} min={0} onChange={value => this.handleOnchange('goodsprice', value)} />
        </FormItem>
        <FormItem{...formItemLayout} label="商品类别" required>
          <Select defaultValue={goodsclass || 0} onSelect={value => this.handleOnchange('goodsclass', value)}>
            {goodsClass.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="商品简介" required>
          <TextArea name="goodsintro" defaultValue={goodsintro} onChange={this.handleInput} rows={4} />
          {!(introPass) && <span style={{ color: '#ff0000' }}>简介不能为空</span>}
        </FormItem>
        <FormItem {...formItemLayout} label="封面图(1张)" required>
          <SpUpload
            name="cover"
            text="上传封面图"
            url="/CoverImage"
            defaultLists={coverList}
            onUpload={this.handleUpload}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="详情图(4张)" required>
          <SpUpload
            name="details[]"
            text="上传详情图"
            url="/DetailImage"
            uploadCount={4}
            defaultLists={detail}
            onUpload={this.handleUpload}
          />
        </FormItem>
        <FormItem {...buttonItemLayout}>
          <Button type="primary" disabled={!(namePass && introPass)} onClick={this.handleSubmit}>确定</Button>
        </FormItem>
      </Form>
    )
  }
}

export default GoodsForm
