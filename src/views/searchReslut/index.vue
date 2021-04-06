<template>
  <div>
    <!-- 顶部 navbar -->
    <top-search autofocus @searchConfirm="searchConfirm" />
    <div style="height: 2.6rem"></div>
    <template v-if="searchResulttList.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的~"
        @load="onLoadRefresh"
      >
        <!-- 商品列表 -->
        <food-list :shop-list="searchResulttList" />
      </van-list>
    </template>
    <template v-else>
      <van-empty description="暂没该商品或店铺" />
    </template>
  </div>
</template>
<script>
import TopSearch from '@/components/shoping/TopSearch.vue'

import FoodList from '@/components/common/FoodList.vue'

export default {
  components: {
    FoodList,
    TopSearch
  },
  data() {
    return {
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      //   搜索结果列表
      searchResulttList: []
    }
  },
  created() {
    const { value } = this.$route.query
    this.getSearchResulttList(value)
  },
  methods: {
    getSearchResulttList(value) {
      this.searchResulttList = [
        {
          id: 0,
          status: 200,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 1,
          status: 500,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 2,
          status: 400,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 3,
          status: 500,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 4,
          status: 200,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 5,
          status: 500,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 6,
          status: 400,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 7,
          status: 500,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        },
        {
          id: 8,
          status: 400,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: true,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        }
      ]
    },
    onLoadRefresh() {
      this.finished = true
      //   setTimeout(() => {
      //     const moreShopList = {
      //       id: 9,
      //       status: 200,
      //       title: '哈哈',
      //       imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
      //       isDiscounts: false,
      //       score: 4.5,
      //       onSale: 133,
      //       firstPrice: 10,
      //       distributionPrice: 5,
      //       shopType: '川菜',
      //       shopAddress: '昆明冶金高等专科学校'
      //     }
      //     this.searchResulttList.push(moreShopList)
      //     // 加载状态结束
      //     this.loading = false
      //     // 数据全部加载完成
      //     if (this.searchResulttList.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 1000)
    },
    searchConfirm(value) {
      this.searchResulttList = []
      setTimeout(() => {
        this.getSearchResulttList(value)
      }, 1000)
    }
  },
  destroyed() {
    window.sessionStorage.setItem('indexSearchValue', '')
  }
}
</script>
<style lang="less" scoped>
</style>
