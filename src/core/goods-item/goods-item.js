import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Icon, Popconfirm, Modal, message } from 'antd'

import { unixDateFormat } from 'utils/date'
import { GoodsClassify, goodsStatus } from 'constant/goods-constant'
import { OfflineGoods, EditGoods } from 'api/sp-goods'
import GoodsForm from 'core/goods-form'

import './goods-item.scss'

class GoodsItem extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    dataSource: PropTypes.object,
    type: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'goods-item',
    className: '',
    dataSource: {},
    type: 'vertical',
  }

  constructor(props) {
    super(props)

    this.state = {
      editModal: false,
    }
  }

  handleOffline = () => {
    const goodsId = this.props.dataSource.goodsid
    OfflineGoods({ goodsId }).then(() => {
      message.success('下架成功!请刷新页面查看最新状态')
    })
  }

  handleEdit = () => {
    this.setState({ editModal: true })
  }

  handleCancel = () => {
    this.setState({ editModal: false })
  }

  AlertEdit = (params) => {
    const goodsId = this.props.dataSource.goodsid
    EditGoods({ ...params, goodsId }).then(() => {
      message.success('修改成功！')
      window.location.href = '/personal/personalGoods'
      this.setState({ editModal: false })
    })
  }

  render() {
    const {
      prefixCls, className, dataSource, type,
    } = this.props
    const classString = classNames(prefixCls, className)
    const { editModal } = this.state

    const {
      goodsid, goodsname, goodscover, goodsprice, goodsintro, goodsclass, modifytime, goodsstatus,
    } = dataSource

    return (
      <div className={classString}>
        {type === 'vertical' ? (
          <Link to={`/goodsDetail/${goodsid}`}>
            <Card className={`${prefixCls}-vertical`} bodyStyle={{ padding: 5 }} hoverable>
              <div className="custom-image">
                <img alt={goodsname} src={goodscover} />
              </div>
              <div className="custom-card">
                <p className="card-title" title={goodsname}>{goodsname}</p>
                <p className="card-title">￥ {goodsprice}</p>
                <p title={goodsintro}>{goodsintro}</p>
              </div>
            </Card>
          </Link>
        ) : (
          <Row className={`${prefixCls}-horizontal`}>
            <span className="goods-status">{goodsStatus[goodsstatus]}</span>
            <Col className="goods-cover" span={7}>
              <a href={`/goodsDetail/${goodsid}`}>
                <img src={goodscover} alt={goodsname} />
              </a>
            </Col>
            <Col className="goods-detail" span={17}>
              <h3><a href={`/goodsDetail/${goodsid}`}>{goodsname}</a></h3>
              <p>￥{goodsprice}</p>
              <p>{goodsintro}</p>
              <p>{`类型：${GoodsClassify[goodsclass]}`}</p>
              <p>
                <span>{unixDateFormat(modifytime)}</span>
                {goodsstatus === 0 && (
                  <span className="action" title="点击编辑" onClick={this.handleEdit} onKeyDown={this.handleEdit}>
                    <Icon type="edit" />
                  </span>
                )}
                {goodsstatus === 0 && (
                  <Popconfirm
                    title="你确定要下架该商品？"
                    onConfirm={this.handleOffline}
                    okText="确定"
                    cancelText="取消"
                  >
                    <span className="action" title="点击下架">
                      <Icon type="delete" />
                    </span>
                  </Popconfirm>
                )}
              </p>
            </Col>

            {editModal && (
              <Modal
                width="50%"
                title="编辑商品"
                visible={editModal}
                maskClosable={false}
                onCancel={this.handleCancel}
                footer=""
              >
                <GoodsForm defaultData={dataSource} onSubmit={this.AlertEdit} />
              </Modal>
            )}
          </Row>
        )}
      </div>
    )
  }
}

export default GoodsItem
