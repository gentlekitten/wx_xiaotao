<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar v-if="!overlayIsShow" @toShare="toShare" />
    <!-- 轮播图 -->
    <swipe class="swiper" :images="swipeImagesList" />
    <!-- 商品信息 -->
    <shop-info :is-collect="isCollect" :item="shopInfiObj" @collectShop="collectShop" />
    <div class="shop_select_cell">
      <!-- 选择商品规格 -->
      <van-cell title="选择" value="请选择商品属性" is-link @click="shopSelectAttributeShow = true" />
      <van-cell title="配送" value="快递邮寄" />
    </div>
    <!-- 商品详细 -->
    <shop-details
      :product-detail-address="shopInfiObj.detailUrl"
      :isProductDetailAddress="isProductDetailAddress"
    />
    <!-- 商品规格弹出层 -->
    <van-sku
      v-model="shopSelectAttributeShow"
      :sku="sku"
      :goods="goods"
      :goods-id="skuObj.goodsId"
      :quota="skuObj.quota"
      :stock-threshold="skuObj.stockThreshold"
      :hide-stock="sku.hide_stock"
      :initial-sku="initialSku"
      @sku-selected="skuSelected"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <!-- 分享遮蔽层 -->
    <van-overlay :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
    <!-- 底部商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="店铺" color="#f2af49" to="/shoppingShop" />
      <van-goods-action-icon icon="chat-o" text="客服" badge="5" to="/chatView" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" to="/cart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="shopSelectAttributeShow = true" />
      <van-goods-action-button type="danger" text="立即购买" @click="shopSelectAttributeShow = true" />
    </van-goods-action>
    <!-- 回到顶部 -->
    <back-top :showDistance="800" />
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import Swipe from '@/components/common/Swipe.vue'
import BackTop from '@/components/common/BackTop.vue'

import ShopInfo from '@/components/shoppingDetails/ShopInfo.vue'
import ShopDetails from '@/components/shoppingDetails/ShopDetails.vue'

import OverlayItem from '@/components/snackShop/OverlayItem.vue'

import NavBar from '@/components/shoping/NavBar.vue'

import cartSku from '@/components/mixins/cartSku.js'

export default {
  components: {
    Swipe,
    BackTop,
    OverlayItem,
    NavBar,
    ShopInfo,
    ShopDetails
  },
  mixins: [cartSku],
  data() {
    return {
      // 是否有详情地址
      isProductDetailAddress: false,
      id: null,
      overlayIsShow: false,
      shopSelectAttributeShow: false,
      isCollect: false,
      shopInfiObj: {},
      swipeImagesList: []
    }
  },
  created() {
    this.$route.query.id && (this.id = Number(this.$route.query.id))
    this.getGoodsDetails()
    // console.log(this.shopInfiObj.detailUrl)

    // if (this.shopInfiObj.detailUrl !== '') {
    //   this.isProductDetailAddress = true
    // }
  },
  methods: {
    async getGoodsDetails() {
      const res = await getData(
        '/product/id/find',
        { productId: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfiObj = res.data
        if (this.shopInfiObj.detailUrl) {
          this.isProductDetailAddress = true
        }
        this.initViewData()
      }
    },
    // 初始化页面数据
    initViewData() {
      const shopInfiObj = this.shopInfiObj
      this.skuObj.quota =
        shopInfiObj.restriction === 0 ? 9999 : shopInfiObj.restriction
      this.sku.price = shopInfiObj.sellPrice
      this.isCollect = shopInfiObj.record === 0 ? false : true
      this.sku.stock_num =
        shopInfiObj.inventory === 0
          ? 9999999999999
          : shopInfiObj.productInventory.productNumber
      this.goods.picture = 'https://jixi.mynatapp.cc/' + shopInfiObj.logoAddress
      if (shopInfiObj.productInfoPicList.length > 0) {
        shopInfiObj.productInfoPicList.forEach(e => {
          this.swipeImagesList.push('https://jixi.mynatapp.cc/' + e.picAddress)
        })
      } else {
        this.swipeImagesList.push(
          'https://jixi.mynatapp.cc/' + shopInfiObj.logoAddress
        )
      }
      // 获取商品属性类，因为要等初始化页面数据加载完成才获取商品属性类，不然价格会出现NaN
      this.getGoodsproperty(this.id)
    },
    toShare() {
      this.overlayIsShow = true
    },
    // 收藏商品
    async collectShop() {
      const url = this.isCollect
        ? '/product/record/delete'
        : '/product/record/add'
      const res = await upData(
        url,
        { productId: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.isCollect = !this.isCollect
        if (this.isCollect) {
          this.$toast.success('收藏成功！')
          return false
        }
        this.$toast.success('取消成功！')
        return false
      }
      return this.$toast.fail(res.msg)
    },
    // 商品规格改变触发
    skuSelected(data) {},
    // 点击购买
    onBuyClicked(data) {
      console.log(data)
      this.$router.push('/shoppingOrderView')
    },
    // 点击加入购物车
    async onAddCartClicked(data) {
      // console.log(data)
      // 规格id
      let specificationId = null
      // 已选商品属性
      let orderCartProductProperties = []
      // 属性id列表
      let propertyIdList = []
      let propertyIdListSecound = []
      // 属性值id列表
      let propertyValueIdList = []
      // 获取选择的specificationId
      data.selectedSkuComb.s10001 &&
        (specificationId = data.selectedSkuComb.s10001)
      // 将商品里所有的k_s保存到propertyIdList
      this.sku.tree.forEach(e => {
        propertyIdList.push(e.k_s)
      })
      // 根据k_s去获取data.selectedSkuComb里的值,获取到属性值id
      propertyIdList.forEach(e => {
        if (e === 's10001') {
          return
        }
        data.selectedSkuComb[e] &&
          propertyValueIdList.push(data.selectedSkuComb[e])
      })
      // 根据k_s去获取data.selectedSkuComb里的值,获取到属性id
      propertyIdList.forEach(e => {
        if (e === 's10001') {
          return
        }
        data.selectedSkuComb[e] && propertyIdListSecound.push(e.substr(1))
      })
      // 将属性id添加到orderCartProductProperties数组中
      propertyIdListSecound.forEach(e => {
        orderCartProductProperties.push({ productPropertyId: Number(e) })
      })
      // 将属性值id添加到对应orderCartProductProperties数组中
      for (let index = 0; index < propertyValueIdList.length; index++) {
        orderCartProductProperties[index].productPropertyValueId = Number(
          propertyValueIdList[index]
        )
      }
      const cartShop = {
        productId: this.id,
        productAmount: data.selectedNum,
        orderCartProductProperties,
        productSpecificationId: specificationId
      }
      const res = await upData('/order/cart/add', cartShop, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('加入成功！')
        return (this.shopSelectAttributeShow = false)
      }
      return this.$toast.fail(res.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.swiper {
  height: 20rem;
}
.swiper_img {
  width: 100%;
  height: 10rem;
}
.shop_select_cell {
  margin: 1rem 0;
  .van-cell__value {
    color: #000;
  }
  .van-cell__title {
    color: #999;
  }
}
::v-deep .van-goods-action {
  height: 3rem;
}
::v-deep .van-sku-actions {
  height: 3rem;
  display: flex;
  align-items: center;
}
::v-deep .van-button {
  height: 2.5rem;
}
::v-deep .van-image {
  width: 5rem;
  height: 5rem;
}
::v-deep .van-sku-row__item-img {
  width: 2.5rem;
  height: 1.5rem;
}
</style>
