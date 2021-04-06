<template>
  <div>
    <!-- 顶部 navbar -->
    <top-search @searchConfirm="searchConfirm" />
    <div style="height: 2.6rem"></div>
    <!-- tabs -->
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      offset-top="2.6rem"
      tabsIndexName="tabActiveIndexShoppingMall"
      @clickTab="clickTab"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的~"
        @load="onLoadRefresh"
      >
        <template v-if="tabIndex !== 3">
          <shop-list :shop-list="shopList" @toShoppingDetails="toShoppingDetails" />
        </template>
        <template v-else>
          <store-item :shopping-list="shoppingList" @toShopping="toShopping" />
        </template>
      </van-list>
    </tabs>
    <!-- 回到顶部 -->
    <back-top :showDistance="1000" />
  </div>
</template>
<script>
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
      searchValue: '',
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      tabIndex: Number(
        window.sessionStorage.getItem('tabActiveIndexShoppingMall')
      ),
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
      shopList: [
        {
          id: 1,
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          newPrice: '10',
          oldPrice: '16',
          buyNum: '200'
        },
        {
          id: 2,
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          newPrice: '10',
          oldPrice: '',
          buyNum: '200'
        },
        {
          id: 3,
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          newPrice: '10',
          oldPrice: '16',
          buyNum: '200'
        },
        {
          id: 4,
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          newPrice: '10',
          oldPrice: '16',
          buyNum: '200'
        },
        {
          id: 5,
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          newPrice: '10',
          oldPrice: '16',
          buyNum: '200'
        },
        {
          id: 6,
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          newPrice: '10',
          oldPrice: '16',
          buyNum: '200'
        }
      ],
      //   商品店铺列表
      shoppingList: [
        {
          id: 0,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '哈哈哈',
          rate: 4
        },
        {
          id: 1,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '哈哈哈',
          rate: 4
        },
        {
          id: 2,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '哈哈哈',
          rate: 4
        }
      ]
    }
  },
  methods: {
    //   顶部搜索确认
    searchConfirm(value) {
      console.log(value)
    },
    // 点击 tabs
    clickTab(index) {
      this.tabIndex = index
    },
    // 上拉刷新
    onLoadRefresh() {
      setTimeout(() => {
        const moreShopList = [
          {
            id: this.id,
            img: 'https://img.yzcdn.cn/vant/cat.jpeg',
            title:
              '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            newPrice: '10',
            oldPrice: '16',
            buyNum: '200'
          },
          {
            id: this.id + 1,
            img: 'https://img.yzcdn.cn/vant/cat.jpeg',
            title:
              '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            newPrice: '10',
            oldPrice: '',
            buyNum: '200'
          }
        ]
        this.id++
        this.shopList.push(...moreShopList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.shopList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    toShoppingDetails(id) {
      this.$router.push('/shoppingDetails?id=' + id)
    },
    toShopping(item) {
      this.$router.push(`/shoppingShop?id=` + item.id)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
