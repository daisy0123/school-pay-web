import React, { PureComponent, PropTypes } from 'react'
import { Row, BackTop } from 'antd'
import map from 'lodash/map'

import { fetchIndex } from 'api/sp-index'
import { goodsClass } from 'constant/goods-constant'
import IndexShop from './index-shop'

import './index.scss'

class Index extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'index-page',
  }

  constructor(props) {
    super(props)

    this.state = {
      shopData: [],
      indexImg: 'http://img61.ddimg.cn/topic_img/gys_04174/Pythony1200_40011.12.jpg',
    }
  }

  componentWillMount() {
    this.getShopData()
  }

  getShopData = () => {
    const goodsClassArr = map(goodsClass, 'value')
    const params = { goodsclass: goodsClassArr.join(',') }
    fetchIndex(params).then((data) => {
      const { indexData, indexImg } = data
      const shopData = []
      indexData.forEach((item) => {
        const { goodsclass, goodsvalue, goodslist } = item
        shopData.push({
          key: goodsclass,
          section: goodsclass,
          sectionUrl: `/shop/${goodsvalue}`,
          dataSource: goodslist,
        })
      })

      this.setState({ shopData, indexImg })
    })
  }

  render() {
    const { prefixCls } = this.props
    const { shopData, indexImg } = this.state

    return (
      <div className={prefixCls}>
        <Row>
          <div className={`${prefixCls}-pic`}>
            <img src={indexImg} alt="index-pic" />
          </div>
          {shopData && shopData.map(item => (
            <div className={`${prefixCls}-shop`} key={item.key}>
              <IndexShop
                key={item.key}
                title={item.section}
                dataSource={item.dataSource}
                seeMoreUrl={item.sectionUrl}
              />
            </div>
          ))}
        </Row>
        <BackTop />
      </div>
    )
  }
}

export default Index
