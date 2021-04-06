<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar v-if="!overlayIsShow" @toShare="toShare" />
    <!-- 轮播图 -->
    <swipe class="swiper" :images="swipeImagesList" />
    <!-- 商品信息 -->
    <shop-info :type="3" :item="shopInfiObj" @collectShop="collectShop" />
    <div class="shop_select_cell">
      <!-- 选择商品规格 -->
      <van-cell title="配送" value="快递邮寄" />
    </div>
    <!-- 商品详细 -->
    <shop-details :product-detail-address="shopInfiObj.productDetailAddress" />
    <!-- 商品规格弹出层 -->
    <!-- 分享遮蔽层 -->
    <van-overlay :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
    <!-- 底部商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" badge="5" to="/chatView" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" to="/cart" />
      <van-goods-action-button type="danger" text="立即购买" @click="onBuyClicked" />
    </van-goods-action>
    <!-- 回到顶部 -->
    <back-top :showDistance="800" />
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import Swipe from '@/components/common/Swipe.vue'
import BackTop from '@/components/common/BackTop.vue'

import ShopInfo from '@/components/shoppingDetails/ShopInfo.vue'
import ShopDetails from '@/components/shoppingDetails/ShopDetails.vue'

import OverlayItem from '@/components/snackShop/OverlayItem.vue'

import NavBar from '@/components/shoping/NavBar.vue'

export default {
  components: {
    Swipe,
    BackTop,
    OverlayItem,
    NavBar,
    ShopInfo,
    ShopDetails
  },
  data() {
    return {
      id: 0,
      overlayIsShow: false,
      shopSelectAttributeShow: false,
      shopInfiObj: {},
      swipeImagesList: []
    }
  },
  created() {
    this.$route.query.id && (this.id = this.$route.query.id)
    this.getShoppingDatails()
  },
  methods: {
    async getShoppingDatails() {
      const res = await getData(
        '/secondhand/product/id/find',
        { id: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfiObj = res.data
        if (res.data.secondhandProductPics.length > 0) {
          res.data.secondhandProductPics.forEach(e => {
            this.swipeImagesList.push(
              'https://jixi.mynatapp.cc/' + e.picAddress
            )
          })
        } else {
          this.swipeImagesList.push(
            'https://jixi.mynatapp.cc/' + res.data.logoAddress
          )
        }
        return false
      }
      return this.$toast.fail(res.msg)
    },
    // https://jixi.mynatapp.cc/static/product/11/8/detail/1616482377691.html
    toShare() {
      this.overlayIsShow = true
    },
    collectShop() {
      this.isCollect = !this.isCollect
      if (this.isCollect) {
        this.$toast.success('收藏成功！')
        return false
      }
      this.$toast.success('取消成功！')
    },
    onBuyClicked(data) {
      console.log(data)
      this.$router.push('/shoppingOrderView')
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
::v-deep .van-button {
  height: 2.5rem;
}
::v-deep .van-image {
  width: 5rem;
  height: 5rem;
}
</style>
