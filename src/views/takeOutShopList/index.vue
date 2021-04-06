<template>
  <div class="home">
    <nav-bar :isArrow="true" :isBackUp="true" />
    <!-- 外卖区域列表 -->
    <div class="take_out">
      <tabs :tab-list="tabList" :sticky="true" tabsIndexName="tabActiveTakeOutList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我是有底线的~"
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
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
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
      shopList: [
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
    }
  },
  methods: {
    onLoadRefresh() {
      setTimeout(() => {
        const moreShopList = {
          id: 9,
          status: 200,
          title: '哈哈',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isDiscounts: false,
          score: 4.5,
          onSale: 133,
          firstPrice: 10,
          distributionPrice: 5,
          shopType: '川菜',
          shopAddress: '昆明冶金高等专科学校'
        }

        this.shopList.push(moreShopList)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.shopList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.take_out {
  padding-bottom: 5rem;
}
</style>
