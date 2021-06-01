<template>
  <div>
    <!-- 顶部 navbar -->
    <top-search :tabIndex="tabIndex" backTo="/index" @searchConfirm="searchConfirm" />
    <div style="height: 2.6rem"></div>
    <!-- tabs -->
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      offset-top="2.6rem"
      tabsIndexName="tabActiveIndexSecondaryMarket"
      @clickTab="clickTab"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        immediate-check
        :offset="0"
        @load="onLoadRefresh"
      >
        <template v-if="tabIndex === 0">
          <shop-list
            v-if="shopList.length > 0"
            :shop-list="shopList"
            @toShoppingDetails="toShoppingDetails"
          />
          <van-empty v-else description="还没该商品哦~" />
        </template>
        <template v-else>
          <shop-list
            v-if="myShopList.length > 0"
            :shop-list="myShopList"
            :type="3"
            @toShoppingDetails="toShoppingDetails"
            @toDeleteShop="toDeleteShop"
          />
          <van-empty v-else description="还没该商品哦~" />
        </template>
      </van-list>
    </tabs>
    <div class="issu_btn" @click="toAddGoods">发布</div>
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
      id: 7,
      isSearch: false,
      searchValue: '',
      pageIndex: 0,
      // 搜索起始数据
      searchPageIndex: 1,
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      finishedText: '哼，我也是有底线的~',
      tabIndex: Number(
        window.sessionStorage.getItem('tabActiveIndexSecondaryMarket')
      )
        ? Number(window.sessionStorage.getItem('tabActiveIndexSecondaryMarket'))
        : 0,
      tabsList: [
        {
          title: '商品'
        },
        {
          title: '我的商品'
        }
      ],
      shopList: [],
      //   我的商品列表
      myShopList: []
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    // 获取商品数据
    async getShopList() {
      const index = this.tabIndex
      let url =
        index === 0 ? '/secondhand/product/list' : '/secondhand/product/my/list'
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData(url, data, { showLoading: true })
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        index === 0
          ? this.shopList.push(...res.data.secondhandProductInfo)
          : this.myShopList.push(...res.data.secondhandProductInfo)
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
        this.tabIndex === 0
          ? '/secondhand/product/search'
          : '/secondhand/product/my/search'
      if (this.searchValue) {
        const data = {
          productName: value,
          pageIndex: 0,
          pageLimit: 10
        }
        const res = await getData(url, data, {
          showLoading: true
        })
        console.log(res)
        if (res.code === '0') {
          if (this.tabIndex === 0) {
            this.shopList = [...res.data.secondhandProductInfo]
          } else {
            this.myShopList = [...res.data.secondhandProductInfo]
          }
          return false
        }
        this.$handleCode.handleCode(res)
      }
      this.$toast.fail('请输入搜索内容')
    },
    // 点击 tabs
    clickTab(index) {
      this.tabIndex = index
      this.pageIndex = 0
      this.shopList = []
      this.myShopList = []
      this.finished = false
      this.isSearch = false
      this.finishedText = '哼，我也是有底线的~'
      this.getShopList()
    },
    // 加载搜索上拉数据
    async onloadSearchList() {
      const data = {
        productName: this.searchValue,
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const url =
        this.tabIndex === 0
          ? '/secondhand/product/search'
          : '/secondhand/product/my/search'
      const res = await getData(url, data, {
        showLoading: true
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        if (this.tabIndex === 0) {
          this.shopList = [...this.shopList, ...res.data.secondhandProductInfo]
        } else {
          this.myShopList = [
            ...this.shopList,
            ...res.data.secondhandProductInfo
          ]
        }
        this.searchPageIndex += 1
        if (this.searchPageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 上拉刷新
    onLoadRefresh() {
      if (this.isSearch) {
        this.onloadSearchList()
        return false
      }
      if (this.shopList.length > 0 || this.myShopList.length > 0) {
        this.getShopList()
      }
    },
    // 删除商品
    async toDeleteShop(item) {
      const res = await getData(
        '/secondhand/product/id/delete',
        { id: item.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('删除成功！')
        this.$router.go(0)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    toShoppingDetails(id) {
      this.$router.push('/secondaryMarket/shoppingDetails?id=' + id)
    },
    // toShopping(item) {
    //   this.$router.push(`/shoppingShop?id=` + item.id)
    // },
    toAddGoods() {
      this.$router.push('/secondaryMarket/addGoods')
    }
  }
}
</script>
<style lang="less" scoped>
.issu_btn {
  position: fixed;
  background-color: #21b668;
  color: #fff;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0.8;
  bottom: 2rem;
  left: 2rem;
}
</style>
