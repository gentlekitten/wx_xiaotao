<template>
  <div>
    <!-- 顶部 navbar -->
    <top-search :tabIndex="tabIndex" @searchConfirm="searchConfirm" />
    <div style="height: 2.6rem"></div>
    <!-- tabs -->
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      offset-top="2.6rem"
      tabsIndexName="tabActiveIndexElectronicProducts"
      @clickTab="clickTab"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :immediate-check="false"
        :offset="0"
        @load="onLoadRefresh"
      >
        <template v-if="tabIndex !== 3">
          <shop-list
            v-if="shopList.length > 0"
            :shop-list="shopList"
            @toShoppingDetails="toShoppingDetails"
          />
          <van-empty v-else description="还没该商品哦~" />
        </template>
        <template v-else>
          <template v-if="shoppingList.length > 0">
            <store-item
              v-for="item in shoppingList"
              :key="item.id"
              :item="item"
              @toShopping="toShopping"
            />
          </template>
          <van-empty v-else description="还没该商品哦~" />
        </template>
      </van-list>
    </tabs>
    <!-- 回到顶部 -->
    <back-top :showDistance="1000" />
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import Tabs from '@/components/common/Tabs.vue'
import BackTop from '@/components/common/BackTop.vue'
import StoreItem from '@/components/common/StoreItem.vue'

import TopSearch from '@/components/shoping/TopSearch.vue'
import ShopList from '@/components/shoping/ShopList.vue'

export default {
  components: {
    Tabs,
    TopSearch,
    ShopList,
    BackTop,
    StoreItem
  },
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      id: 7,
      pageIndex: 0,
      searchPageIndex: 1,
      isSearch: false,
      finishedText: '哼，我也是有底线的~',
      searchValue: '',
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      tabIndex: Number(
        window.sessionStorage.getItem('tabActiveIndexElectronicProducts')
      )
        ? Number(
            window.sessionStorage.getItem('tabActiveIndexElectronicProducts')
          )
        : 0,
      tabsList: [
        {
          title: '综合'
        },
        {
          title: '销量'
        },
        {
          title: '优惠'
        },
        {
          title: '店铺'
        }
      ],
      shopList: [],
      //   商品店铺列表
      shoppingList: []
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    // 获取商品和店铺列表
    async getShopList() {
      const data = {
        shopCategoryId: 3,
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const url =
        this.tabIndex === 0
          ? '/shop/goods/product/all/find'
          : this.tabIndex === 1
          ? '/shop/goods/product/sale/list'
          : this.tabIndex === 2
          ? '/shop/goods/product/price/list'
          : '/shop/goods/info/find'
      const res = await getData(url, data, {
        showLoading: true
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.tabIndex === 3
          ? this.shoppingList.push(...res.data.shopAvatarVos)
          : this.shopList.push(...res.data.productInfoVos)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.finished = true
      this.finishedText = ''
      this.$handleCode.handleCode(res)
    },
    //   顶部搜索确认
    async searchConfirm(value) {
      this.searchValue = value
      this.isSearch = true
      const url =
        this.tabIndex === 3 ? '/shop/goods/shop/search' : '/shop/goods/search'
      if (this.searchValue) {
        const data = {
          shopCategoryId: 3,
          productName: this.searchValue,
          pageIndex: 0,
          pageLimit: 10
        }
        const res = await getData(url, data, {
          showLoading: true
        })
        console.log(res)
        if (res.code === '0') {
          this.tabIndex === 3
            ? (this.shoppingList = res.data.shopAvatarVos)
            : (this.shopList = res.data.productInfoVos)
          return false
        }
        // this.$handleCode.handleCode(res)
        return this.$toast.fail(res.msg)
      } else {
        this.$toast.fail('请输入搜索内容')
      }
    },
    // 加载搜索上拉数据
    async onloadSearchList() {
      const url =
        this.tabIndex === 3 ? '/shop/goods/shop/search' : '/shop/goods/search'
      const data = {
        shopCategoryId: 3,
        productName: this.searchValue,
        pageIndex: this.searchPageIndex,
        pageLimit: 10
      }
      const res = await getData(url, data, {
        showLoading: true
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.tabIndex === 3
          ? (this.shoppingList = [
              ...this.shoppingList,
              ...res.data.shopAvatarVos
            ])
          : (this.shopList = [...this.shopList, ...res.data.productInfoVos])
        this.searchPageIndex += 1

        if (this.searchPageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 点击 tabs
    clickTab(index) {
      this.tabIndex = index
      this.finished = false
      this.isSearch = false
      this.shopList = []
      this.shoppingList = []
      this.pageIndex = 0
      this.getShopList()
    },
    // 上拉刷新
    onLoadRefresh() {
      if (this.isSearch) {
        this.onloadSearchList()
        return false
      }
      if (this.shopList.length > 0 || this.shoppingList.lenght > 0) {
        this.getShopList()
      }
    },
    toShoppingDetails(id) {
      this.$router.push('/shoppingDetails?id=' + id)
    },
    toShopping(item) {
      this.$router.push(`/shoppingShop?id=` + item.shopId)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
