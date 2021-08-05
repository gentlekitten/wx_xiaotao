<template>
  <div class="home">
    <template v-if="id === 0">
      <snack-shop-tip :snackShopTipObj="snackShopTipObj" />
    </template>
    <template v-else>
      <!-- 顶部导航 -->
      <nav-bar @toSearch="toSearch" @toPhone="toPhone" @toShare="toShare" />
      <!-- 顶部商店信息 -->
      <top-shop-info :isCollect="isCollect" :shopInfoObj="shopInfoObj" @toCollect="toCollect" />
      <!-- tab栏信息 -->
      <tabs-index
        :shop-id="id"
        :tab-index="tabIndex"
        :cart-list="cartList"
        :dropdown-list="dropdownList"
        :dropdown-obj="dropdownObj"
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
        @dropdownChange="dropdownChange"
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
    </template>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { ImagePreview } from 'vant'

import { getData, upData } from '@/api/api.js'

import SnackShopTip from '@/components/snackShop/SnackShopTip.vue'
import NavBar from '@/components/snackShop/NavBar.vue'
import SearchPopup from '@/components/snackShop/SearchPopup.vue'
import OverlayItem from '@/components/snackShop/OverlayItem.vue'
import NoticeItem from '@/components/snackShop/NoticeItem.vue'
import TopShopInfo from '@/components/snackShop/TopShopInfo.vue'
import TabsIndex from '@/components/snackShop/tabs/TabsIndex.vue'

import takeOutShop from '@/components/mixins/takeOutShop.js'

export default {
  components: {
    SnackShopTip,
    NavBar,
    TopShopInfo,
    TabsIndex,
    SearchPopup,
    OverlayItem,
    NoticeItem
  },
  // 因为外卖店铺和零食铺店铺有很多共用模板 所以用mixins
  mixins: [takeOutShop],
  data() {
    return {
      dropdownList: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 }
      ],
      // 下拉选择框选择的对象
      dropdownObj: { text: '全部商品', value: 0 },
      // 零食铺须知内容
      snackShopTipObj: {
        snackShopTip: ''
      }
    }
  },
  computed: {},
  created() {
    this.$route.query.id && (this.id = Number(this.$route.query.id))
    if (this.id === 0) {
      this.getExpressTip()
    } else {
      this.getShopInfo()
      this.getGoodsList()
    }
  },
  methods: {
    // 获取零食铺须知内容
    async getExpressTip() {
      const res = await getData(
        '/shop/snack/tip/find',
        {},
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        return (this.snackShopTipObj = res.data)
      }
      this.$handleCode.handleCode(res)
    }
  }
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
