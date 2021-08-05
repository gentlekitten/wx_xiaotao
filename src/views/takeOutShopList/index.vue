<template>
  <div class="home">
    <nav-bar :isArrow="true" :isBackUp="true" />
    <!-- 外卖区域列表 -->
    <div class="take_out">
      <tabs
        :tab-list="tabList"
        :sticky="true"
        tabsIndexName="tabActiveTakeOutList"
        @clickTab="clickTab"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我是有底线的~"
          :immediate-check="false"
          :offset="0"
          @load="onLoadRefresh"
        >
          <!-- 商品列表 -->
          <food-list :shop-list="shopList" />
        </van-list>
      </tabs>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

import Tabs from '@/components/common/Tabs.vue'
import FoodList from '@/components/common/FoodList.vue'

export default {
  components: {
    NavBar,
    Tabs,
    FoodList
  },
  data() {
    return {
      tabIndex: 0,
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      // 请求数据页数
      pageIndex: 0,
      tabList: [
        {
          title: '综合排序'
        },
        {
          title: '营业状态'
        },
        {
          title: '单量排序'
        },
        {
          title: '优惠活动'
        }
      ],
      shopList: [],
      shopListTwo: []
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    // 获取店铺列表
    async getShopList(siteId) {
      // (可选值 营业排序{shopState}，单量排序{sale} 优惠排序{discount}，不排序{""或者不提交})
      const rule =
        this.tabIndex === 0
          ? ''
          : this.tabIndex === 1
          ? 'shopState'
          : this.tabIndex === 2
          ? 'sale'
          : 'discount'
      // shopCategoryId 1零食 2 美妆 3 数码 4 外卖 5 食堂
      const data = {
        rule,
        pageIndex: this.pageIndex,
        shopCategoryId: 4,
        pageLimit: 1
      }
      const res = await getData('/shop/info/basic/find', data, {
        showLoading: false
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.shopList.push(...res.data.pageIndexShopInfoVo)
        this.shopListTwo.push(...res.data.pageIndexShopInfoVo)
        this.pageIndex += 1
        if (this.pageIndex * 1 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 点击tab栏
    clickTab(index) {
      this.tabIndex = index
      this.pageIndex = 0
      this.shopList = []
      this.finished = false
      this.getShopList()
    },
    // 上拉加载
    onLoadRefresh() {
      if (this.shopList.length > 0) {
        this.getShopList()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.take_out {
  padding-bottom: 5rem;
}
</style>
