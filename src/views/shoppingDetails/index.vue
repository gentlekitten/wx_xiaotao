<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar v-if="!overlayIsShow" @toShare="toShare" />
    <!-- 轮播图 -->
    <swipe class="swiper" :images="swipeImagesList" />
    <!-- 商品信息 -->
    <shop-info
      :is-collect="isCollect"
      :item="shopInfoObj"
      :shopOrders="shopOrders"
      @collectShop="collectShop"
    />
    <div class="shop_select_cell">
      <!-- 选择商品规格 -->
      <van-cell
        title="选择"
        value="请选择商品属性"
        is-link
        @click="shopSelectAttributeShow = true"
      />
      <van-cell title="配送" value="快递邮寄" />
    </div>
    <!-- 商品详细 -->
    <shop-details
      :product-detail-address="shopInfoObj.detailUrl"
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
      <van-goods-action-icon
        icon="shop-o"
        text="店铺"
        color="#f2af49"
        :to="'/shoppingShop?id=' + shopInfoObj.shopId"
      />
      <van-goods-action-icon icon="chat-o" text="客服" to="/chatView" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="shopSelectAttributeShow = true"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="shopSelectAttributeShow = true"
      />
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
    ShopDetails,
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
      shopInfoObj: {},
      swipeImagesList: [],
      // 商品规格列表
      productInfoProperties: [],
      // 商品属性列表
      productInfoSpecifications: [],
      // 店铺优惠
      shopDiscount: {},
      // 店铺订单信息
      shopOrders: {},
    }
  },
  created() {
    this.$route.query.id && (this.id = Number(this.$route.query.id))
    this.getGoodsDetails()
    // console.log(this.shopInfoObj.detailUrl)

    // if (this.shopInfoObj.detailUrl !== '') {
    //   this.isProductDetailAddress = true
    // }
  },
  methods: {
    // 获取店铺优惠
    async getShopDiscount(shopId) {
      const res = await getData(
        '/shop/discount/find',
        { shopId },
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopDiscount = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取店铺订单信息
    async getShopOrders(shopId) {
      const res = await getData(
        '/shop/order/get',
        { shopId },
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopOrders = res.data.shopOrder
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取商品详情
    async getGoodsDetails() {
      const res = await getData(
        '/product/id/find',
        { productId: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        this.getShopDiscount(res.data.shopId)
        this.getShopOrders(res.data.shopId)
        if (this.shopInfoObj.detailUrl) {
          this.isProductDetailAddress = true
        }
        this.initViewData()
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 初始化页面数据
    initViewData() {
      const shopInfoObj = this.shopInfoObj
      this.skuObj.quota =
        shopInfoObj.restriction === 0 ? 9999999999999 : shopInfoObj.restriction
      this.sku.price = shopInfoObj.sellPrice
      this.isCollect = shopInfoObj.record === 0 ? false : true
      this.sku.stock_num =
        shopInfoObj.inventory === 0
          ? 9999999999999
          : shopInfoObj.productInventory.productNumber
      this.goods.picture = this.imgBaseUrl + shopInfoObj.logoAddress
      if (shopInfoObj.productInfoPicList.length > 0) {
        shopInfoObj.productInfoPicList.forEach((e) => {
          this.swipeImagesList.push({ picAddress: e.picAddress })
        })
      } else {
        this.swipeImagesList.push({ picAddress: shopInfoObj.logoAddress })
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
      this.$handleCode.handleCode(res)
    },
    // 商品规格改变触发
    skuSelected(data) {},
    // 点击购买
    onBuyClicked(data) {
      let shopType = ''
      let discountPrice = 0
      let totalPrice = this.sku.price
      // 处理优惠
      if (this.shopDiscount.length > 0 && this.shopDiscount.requirePrice) {
        if (totalPrice >= this.shopDiscount.requirePrice) {
          totalPrice -= this.shopDiscount.discountPrice
          discountPrice = this.shopDiscount.discountPrice
        }
      }

      // 是否有属性
      if (this.productInfoProperties.length > 0) {
        this.productInfoProperties.forEach((c) => {
          shopType += c.productPropertyValues[0].propertyValue + ';'
        })
      }
      // 是否有规格
      if (this.productInfoSpecifications.length > 0) {
        shopType += this.productInfoSpecifications[0].specificationName
      }
      const shopInfo = [
        {
          id: this.shopInfoObj.shopId,
          img: this.shopInfoObj.shopPic,
          name: this.shopInfoObj.shopName,
          totalPrice,
          discountPrice,
          shopList: [
            {
              id: this.shopInfoObj.id,
              productId: this.shopInfoObj.id,
              isCheck: true,
              img: this.shopInfoObj.logoAddress,
              name: this.shopInfoObj.productName,
              shopType,
              price: this.sku.price,
              rePrice: this.shopInfoObj.sellPrice,
              deliveryFee: this.shopInfoObj.deliveryFee,
              restriction: this.shopInfoObj.restriction,
              inventory: this.shopInfoObj.inventory,
              productInventory: this.shopInfoObj.productInventory,
              num: data.selectedNum,
              shopOrders: this.shopOrders ? this.shopOrders : '',
              productInfoProperties: this.productInfoProperties,
              productInfoSpecifications: this.productInfoSpecifications,
              shopDiscount: this.shopDiscount ? this.shopDiscount : '',
            },
          ],
        },
      ]
      window.sessionStorage.setItem('shopCartList', JSON.stringify(shopInfo))
      this.$router.push('/shoppingOrderView?form=1')
    },
    // 点击加入购物车
    async onAddCartClicked(data) {
      // console.log(data)
      // 规格id
      let specificationId = ''
      // 已选商品属性
      let orderCartProductProperties = []
      // 属性id列表
      let propertyIdList = []
      let propertyIdListSecound = []
      // 属性值id列表
      let propertyValueIdList = []
      // 获取选择的specificationId
      // selectedSkuComb是商品属性弹出层中你选中的规格或属性列表（k_s）
      if (data.selectedSkuComb && data.selectedSkuComb.s10001) {
        specificationId = data.selectedSkuComb.s10001
      }
      // 将商品里所有的k_s保存到propertyIdList
      this.sku.tree.forEach((e) => {
        propertyIdList.push(e.k_s)
      })
      // 根据k_s去获取data.selectedSkuComb里的值,获取到属性值id
      propertyIdList.forEach((e) => {
        // 不要规格 k_s:'s10001'代表规格
        if (e === 's10001') {
          return
        }
        data.selectedSkuComb[e] &&
          propertyValueIdList.push(data.selectedSkuComb[e])
      })
      // 根据k_s去获取data.selectedSkuComb里的值,获取到属性id
      propertyIdList.forEach((e) => {
        if (e === 's10001') {
          return
        }
        // productPropertyId 在cartSku.js中添加的时候是's'+ productPropertyId，使用productPropertyId截取1以后的就是了
        data.selectedSkuComb[e] && propertyIdListSecound.push(e.substr(1))
      })
      // 将属性id添加到orderCartProductProperties数组中
      propertyIdListSecound.forEach((e) => {
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
        productSpecificationId: specificationId,
      }
      const res = await upData('/order/cart/add', cartShop, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('加入成功！')
        return (this.shopSelectAttributeShow = false)
      }
      this.$handleCode.handleCode(res)
    },
  },
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
