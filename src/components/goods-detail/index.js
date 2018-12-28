import React, { PureComponent, PropTypes } from 'react'
import { Row, Col, Tabs } from 'antd'

import { fetchGoodsDetail } from 'api/sp-goods'
import AsideGoods from './aside-goods'
import GoodsInfo from './goods-info'
import AuthorInfo from './author-info'

import './index.scss'

const { TabPane } = Tabs
class GoodsDetail extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    prefixCls: 'goods-detail',
  }

  constructor(props) {
    super(props)

    this.state = {
      authorGoods: [],
      goodsDetail: {},
      similarGoods: [],
      goodsImages: [],
      userInfo: {},
      goodsId: props.match.params.goodsId,
    }
  }

  componentWillMount = () => {
    const { goodsId } = this.state
    fetchGoodsDetail({ goodsId }).then((data) => {
      const {
        userInfo, goodsDetail, authorGoods, similarGoods,
      } = data
      const goodsImages = goodsDetail.goodsdetails.split(',')
      this.setState({
        userInfo, goodsDetail, authorGoods, similarGoods, goodsImages,
      })
    })
  }

  render() {
    const { prefixCls } = this.props
    const {
      userInfo, goodsDetail, authorGoods, similarGoods, goodsImages,
    } = this.state

    return (
      <div className={prefixCls}>
        <Row>
          <Col className={`${prefixCls}-con`} span={18} offset={3}>
            <GoodsInfo goodsData={goodsDetail} authorData={userInfo} />

            <Row className={`${prefixCls}-detail-section`} gutter={20}>
              <Col className={`${prefixCls}-detail`} span={16}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="商品详情" key="1">
                    {goodsImages.map(item => <img key={item} src={item} alt={item} />)}
                  </TabPane>
                  <TabPane tab="卖家信息" key="2">
                    <AuthorInfo dataSource={userInfo} />
                  </TabPane>
                </Tabs>
              </Col>

              <Col className={`${prefixCls}-other`} span={8}>
                <AsideGoods className="author-goods" title="卖家的其他商品" dataSource={authorGoods} />
                <AsideGoods title="类似商品" dataSource={similarGoods} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GoodsDetail
