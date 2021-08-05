<template>
  <div class="home">
    <!-- 顶部导航 -->
    <nav-bar @toSearch="toSearch" @toPhone="toPhone" @toShare="toShare" />
    <!-- 顶部商店信息 -->
    <top-shop-info :isCollect="isCollect" :shopInfoObj="shopInfoObj" @toCollect="toCollect" />
    <!-- tab栏信息 -->
    <tabs-index
      :shop-id="id"
      :tab-index="tabIndex"
      :cart-list="cartList"
      :tab-list="tabList"
      :sidebar-list="sidebarList"
      :shop-list="shopList"
      :evaluate-info-list="evaluateInfoObj"
      :comment-list="commentList"
      :shop-info-obj="shopInfoObj"
      @sidebarChange="sidebarChange"
      @handleAdd="handleAdd"
      @cartSubmit="cartSubmit"
      @clickTab="clickTab"
      @clickCommnetImg="clickCommnetImg"
      @clearCart="clearCart"
      @clickImg="clickImg"
      @deleteFood="deleteFood"
      @shopNumChange="shopNumChange"
    />
    <!-- 搜索弹出层 -->
    <van-popup class="popup" v-model="searchIsShow" closeable round position="top">
      <search-popup @clickShopSearch="clickShopSearch" />
    </van-popup>
    <!-- 促销公告遮蔽层或店铺不营业遮蔽层提示 -->
    <van-overlay class="overlay" :show="noticeIsShow" @click="noticeIsShow = false">
      <notice-item :shop-info-obj="shopInfoObj" />
    </van-overlay>
    <!-- 分享遮蔽层 -->
    <van-overlay class="overlay" :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'

import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/snackShop/NavBar.vue'
import TopShopInfo from '@/components/snackShop/TopShopInfo.vue'
import TabsIndex from '@/components/snackShop/tabs/TabsIndex.vue'
import OverlayItem from '@/components/snackShop/OverlayItem.vue'
import NoticeItem from '@/components/snackShop/NoticeItem.vue'
import SearchPopup from '@/components/snackShop/SearchPopup.vue'

import takeOutShop from '@/components/mixins/takeOutShop.js'

export default {
  components: {
    NavBar,
    TopShopInfo,
    TabsIndex,
    OverlayItem,
    SearchPopup,
    NoticeItem
  },
  // 因为外卖店铺和零食铺店铺有很多共用模板 所以用mixins
  mixins: [takeOutShop],
  data() {
    return {}
  },
  created() {
    this.id = this.$route.query.id
    this.getShopInfo()
    this.getGoodsList()
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.popup {
  height: 10rem;
}
.overlay {
  z-index: 100;
}
</style>
