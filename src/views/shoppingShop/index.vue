<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar @toShare="toShare" @toSearch="toSearch" @toChat="toChat" @tabClick="tabClick" />
    <template v-if="tabIndex === 0">
      <!-- 商店信息 -->
      <shopping
        :is-collect="isCollect"
        :shop-info="shopInfo"
        @clickCollect="clickCollect"
        @clickNoticeBar="clickNoticeBar"
        @toShopDetails="toShopDetails"
      />
      <!-- tabs -->
      <tabs
        class="tabs"
        :tab-list="tabList"
        offsetTop="2.6rem"
        :sticky="true"
        tabsIndexName="tabActiveShopping"
        @clickTab="clickTab"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :offset="0"
          finished-text="哼，我也是有底线的~"
          @load="onLoadRefresh"
        >
          <!-- 商品列表 -->
          <shop-list
            :shop-list="shopList"
            :dropdownList="dropdownList"
            :dropdown-obj="dropdownObj"
            @dropdownChange="dropdownChange"
            @toShoppingDetails="toShoppingDetails"
          />
        </van-list>
      </tabs>
    </template>
    <template v-else>
      <!-- 商店信息 -->
      <shopping
        :is-collect="isCollect"
        :shop-info="shopInfo"
        @clickNoticeBar="clickNoticeBar"
        @clickCollect="clickCollect"
      />
      <div class="evaluate">
        <!-- 顶部评价分数 -->
        <evaluate class="evaluate_item" :evaluate-info-list="evaluateInfoList" />
        <!-- 用户评价 -->
        <template v-if="false">
          <van-empty description="该用户暂无评价" />
        </template>
        <!-- 用户评论 -->
        <template>
          <user-comment :comment-list="commentList" @clickCommnetImg="imagePreview" />
        </template>
      </div>
    </template>
    <!-- 搜索弹出层 -->
    <van-popup class="popup" v-model="searchIsShow" closeable round position="top">
      <search-popup @clickShopSearch="searchConfirm" />
    </van-popup>
    <!-- 分享遮蔽层 -->
    <van-overlay style="z-index: 999;" :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
    <!-- 点击通知栏遮蔽层 -->
    <van-overlay class="overlay" :show="noticeOverlayIsShow" @click="noticeOverlayIsShow = false">
      <div class="warp">
        <div class="shop_name">{{ shopInfo.shopName }}</div>
        <div class="title">☆☆&nbsp;促销公告&nbsp;☆☆</div>
        <div class="content">{{ shopInfo.salesPromotion }}</div>
      </div>
    </van-overlay>
    <!-- 回到顶部 -->
    <back-top :showDistance="800" />
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import { ImagePreview } from 'vant'

import Tabs from '@/components/common/Tabs.vue'
import BackTop from '@/components/common/BackTop.vue'

import NavBar from '@/components/shoppingShop/NavBar.vue'
import Shopping from '@/components/shoppingShop/Shopping.vue'

import ShopList from '@/components/shoping/ShopList.vue'

import OverlayItem from '@/components/snackShop/OverlayItem.vue'
import SearchPopup from '@/components/snackShop/SearchPopup.vue'
import Evaluate from '@/components/snackShop/tabs/tab1/Evaluate.vue'
import UserComment from '@/components/snackShop/tabs/tab1/UserComment.vue'

export default {
  components: {
    NavBar,
    OverlayItem,
    SearchPopup,
    Tabs,
    ShopList,
    BackTop,
    Shopping,
    Evaluate,
    UserComment
  },
  data() {
    return {
      // 店铺id
      shopId: 0,
      // rule (可选值 营业排序{shopState}，单量排序{sale} 优惠排序{discount}，不排序{""或者不提交})
      rule: '',
      // 是否搜索
      isSearch: false,
      searchValue: '',
      searchIsShow: false,
      overlayIsShow: false,
      noticeOverlayIsShow: false,
      isCollect: false,
      // 起始页
      pageIndex: 0,
      // 搜索起始
      searchPageIndex: 1,
      // 分类id
      categoryId: 0,
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      // 顶部tabs索引
      tabIndex: Number(window.sessionStorage.getItem('shoppingShopTabIndex'))
        ? Number(window.sessionStorage.getItem('shoppingShopTabIndex'))
        : 0,
      // 商品tabs索引
      goodsTabIndex: Number(window.sessionStorage.getItem('tabActiveShopping'))
        ? Number(window.sessionStorage.getItem('tabActiveShopping'))
        : 0,
      tabList: [
        {
          title: '全部',
          categoryId: '',
          sort: 9999
        }
      ],
      // 下拉选择框index
      dropdownIndex: 0,
      // 下拉选择框选中对象
      dropdownObj: { text: '综合排序', value: 0 },
      // 下拉选择框列表
      dropdownList: [
        { text: '综合排序', value: 0 },
        { text: '销量排序', value: 1 },
        { text: '价格优先', value: 2 },
        { text: '最新上架', value: 3 }
      ],
      // 商品列表
      shopList: [],
      // 店铺信息
      shopInfo: {},
      // 评价信息列表
      evaluateInfoList: [
        {
          num: 0,
          text: '服务态度'
        },
        {
          num: 0,
          text: '产品品质'
        },
        {
          num: 0,
          text: '送达速度'
        }
      ],
      // 用户评价列表
      commentList: [
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 3,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg'
          ],
          comment_video: ['https://img.yzcdn.cn/vant/apple-1.jpg']
        },
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 4,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: ['https://img.yzcdn.cn/vant/apple-1.jpg'],
          comment_video: []
        },
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 1,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [],
          comment_video: []
        }
      ]
    }
  },
  created() {
    this.shopId = this.$route.query.id ? this.$route.query.id : 0
    this.getShoppingInfo()
  },
  methods: {
    // 获取店铺信息
    async getShoppingInfo() {
      const res = await getData(
        '/shop/goods/info/detail',
        { shopId: this.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfo = res.data
        this.isCollect = this.shopInfo.hasRecord === 1 ? true : false
        // 商品分类信息
        this.shopInfo.productCategoryVos.forEach(e => {
          this.tabList.push({
            title: e.categoryName,
            categoryId: e.categoryId,
            sort: e.sort
          })
        })
        this.getShopList()
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取商品列表
    async getShopList() {
      const categoryId = this.tabList[this.goodsTabIndex].categoryId
      const data = {
        shopId: this.shopId,
        categoryId,
        pageIndex: this.pageIndex,
        pageLimit: 10,
        rule: this.rule
      }
      const res = await getData('/shop/goods/category/find', data, {
        showLoading: true
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.shopList.push(...res.data.productInfoVos)
        // 改变下拉框文字
        this.dropdownObj = this.dropdownList[this.dropdownIndex]
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    //   顶部搜索确认
    async searchConfirm(value) {
      this.searchValue = value
      this.isSearch = true
      if (this.searchValue) {
        const data = {
          shopId: this.shopId,
          productName: this.searchValue,
          pageIndex: 0,
          pageLimit: 10
        }
        const res = await getData('/shop/goods/search', data, {
          showLoading: true
        })
        console.log(res)
        this.searchIsShow = false
        if (res.code === '0') {
          this.shopList = res.data.productInfoVos
          return false
        }
        if (res.code === '4x10003') {
          return this.$toast.fail('没有该商品哦~')
        }
        this.$handleCode.handleCode(res)
      } else {
        this.$toast.fail('请输入搜索内容')
      }
    },
    // 加载搜索上拉数据
    async onloadSearchList() {
      const data = {
        shopId: this.shopId,
        productName: this.searchValue,
        pageIndex: this.searchPageIndex,
        pageLimit: 10
      }
      const res = await getData('/shop/goods/search', data, {
        showLoading: true
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.shopList.push(...res.data.productInfoVos)
        this.searchPageIndex += 1
        if (this.searchPageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 商品点击tab
    clickTab(index) {
      this.goodsTabIndex = index
      this.finished = false
      this.dropdownIndex = 0
      this.rule = ''
      // this.isSearch = false
      this.shopList = []
      this.pageIndex = 0
      this.getShopList()
    },
    // 下拉选择框改变
    dropdownChange(index) {
      this.pageIndex = 0
      this.shopList = []
      this.finished = false
      this.rule =
        index === 1 ? 'sale' : index === 2 ? 'price' : index === 3 ? 'new' : ''
      this.dropdownIndex = index
      this.getShopList()
    },
    toSearch() {
      this.searchIsShow = true
    },
    toChat() {
      this.$router.push('/chatView')
    },
    toShare() {
      this.overlayIsShow = true
    },
    // 顶部tabs点击
    tabClick(index) {
      this.tabIndex = index
    },
    // 收藏店铺
    async clickCollect() {
      const url = !this.isCollect ? '/shop/record/add' : '/shop/record/delete'
      const res = await upData(
        url,
        { shopId: this.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.isCollect = !this.isCollect
        if (this.isCollect) {
          this.$toast.success('收藏成功！')
        } else {
          this.$toast.success('取消收藏成功！')
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 显示促销公告栏
    clickNoticeBar() {
      this.noticeOverlayIsShow = true
    },
    // 商品详情
    toShoppingDetails(id) {
      this.$router.push('/shoppingDetails?id=' + id)
    },
    // 店铺详情
    toShopDetails(id) {
      this.$router.push('/shoppingShop/shoppingShopDetails?id=' + id)
    },
    // 上拉加载商品
    onLoadRefresh() {
      if (this.isSearch) {
        this.onloadSearchList()
        return false
      }
      if (this.shopList.length > 0) {
        this.getShopList()
      }
    },
    //   预览图片
    imagePreview(item, index) {
      ImagePreview({
        images: item,
        startPosition: index
      })
    }
  }
}
</script>
<style lang="less" scoped>
.popup {
  height: 10rem;
}
.tabs {
  margin-top: 1rem;
}
.evaluate {
  box-sizing: border-box;
  font-size: 0.8rem;
  margin-top: 1rem;
}
.overlay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 900;
  color: #fff;
  text-align: center;
  z-index: 999;
  .warp {
    margin-top: 3rem;
    .title {
      line-height: 3rem;
    }
    .content {
      font-weight: 400;
      line-height: 2.5rem;
    }
  }
}
</style>
