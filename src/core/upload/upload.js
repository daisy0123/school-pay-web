import React, { PropTypes } from 'react'
import classNames from 'classnames'
import noop from 'lodash/noop'
import { Upload, Icon, Modal } from 'antd'

import { FILE_PICKER_BASE_URL } from 'constant/http'

class SpUpload extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    listType: PropTypes.string,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
    uploadCount: PropTypes.number,
    defaultLists: PropTypes.array,
    onUpload: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'sp-upload',
    className: '',
    name: '',
    text: '上传',
    listType: 'picture-card',
    uploadCount: 1,
    defaultLists: [],
    onUpload: noop,
  }

  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [...props.defaultLists],
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleFile = ({ fileList }) => {
    this.setState({ fileList })
    const fileInfo = []
    const { name, uploadCount } = this.props
    if (fileList.length === uploadCount) {
      fileList.forEach((item) => {
        if (item.status === 'done') {
          if (item.url) {
            fileInfo.push(item.url)
          } else {
            fileInfo.push(item.response.data.url)
          }
        }
      })
    } else {
      this.props.onUpload({ name: name.replace('[]', '') })
    }
    if (fileInfo.length === uploadCount) {
      const files = { name: name.replace('[]', ''), fileInfo: fileInfo.join(',') }
      this.props.onUpload(files)
    }
  }

  render() {
    const {
      prefixCls, className, name, listType, url, text, uploadCount,
    } = this.props
    const { previewVisible, previewImage, fileList } = this.state

    const classString = classNames(prefixCls, className)
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{text}</div>
      </div>
    )

    const uploadProps = {
      name,
      listType,
      accept: 'image/*',
      action: `${FILE_PICKER_BASE_URL}${url}`,
    }

    return (
      <div className={classString}>
        <Upload
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleFile}
          {...uploadProps}
        >
          {fileList.length >= uploadCount ? null : uploadButton}
        </Upload>

        {previewVisible && (
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="goodsImage" style={{ width: '100%', marginTop: 20 }} src={previewImage} />
          </Modal>
        )}
      </div>
    )
  }
}

export default SpUpload
