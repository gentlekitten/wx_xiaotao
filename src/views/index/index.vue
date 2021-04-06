<template>
  <div class="home container">
    <!-- 顶部 -->
    <top-area @toSearch="toSearch" />
    <!-- 轮播图 -->
    <swipe :images="SwipeImagesList" height="500px" />
    <!-- 宫格 -->
    <grid :gird-list="girdList" :column-num="4" />

    <!-- 公告 -->
    <advertising />
    <!-- 外卖区域 -->
    <div class="take_out">
      <tabs
        :tab-list="tabsList"
        :sticky="true"
        tabsIndexName="tabActiveIndexTakeOut"
        @clickTab="clickTab"
      >
        <div class="top_type">
          <div class="title">{{ dropdownObj.text }}</div>
          <!-- 下拉选择 -->
          <dropdown-menu :dropdown-list="dropdownList" @dropdownChange="dropdownChange" />
        </div>
        <template v-if="shopList.length > 0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="哼，我也是有底线的~"
            :immediate-check="false"
            @load="onLoadRefresh"
          >
            <!-- 商品列表 -->
            <food-list :dropdown-list="dropdownList" :shop-list="shopList" />
          </van-list>
        </template>
        <template v-else>
          <van-empty description="暂无该内容" />
        </template>
      </tabs>
    </div>
    <!-- 回到顶部 -->
    <back-top />
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'
import wechatUtil from '@/utils/wechatUtil'

import Grid from '@/components/common/Grid.vue'
import Swipe from '@/components/common/Swipe.vue'
import BackTop from '@/components/common/BackTop.vue'
import DropdownMenu from '@/components/common/DropdownMenu.vue'

import TopArea from '@/components/index/TopArea.vue'
import Advertising from '@/components/index/Advertising.vue'
import Tabs from '@/components/common/Tabs.vue'
import FoodList from '@/components/common/FoodList.vue'

export default {
  components: {
    Grid,
    TopArea,
    Swipe,
    Advertising,
    Tabs,
    FoodList,
    BackTop,
    DropdownMenu
  },
  data() {
    return {
      dropdownObj: { text: '综合排序', value: 0 },
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      // 下拉选择框列表
      dropdownList: [
        { text: '综合排序', value: 0 },
        { text: '营业状态', value: 1 },
        { text: '单量排序', value: 2 },
        { text: '优惠活动', value: 3 }
      ],
      isShowFilterType: false,
      tabIndex: Number(sessionStorage.getItem('tabActiveIndexTakeOut'))
        ? Number(sessionStorage.getItem('tabActiveIndexTakeOut'))
        : 0,
      // 请求数据页数
      pageIndex: 0,
      // 轮播图列表
      SwipeImagesList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      girdList: [
        {
          img: require('../../assets/img/index/snackShop.png'),
          text: '零食',
          url: 'snackShopList'
        },
        {
          img: require('../../assets/img/index/expressage.png'),
          text: '快递服务',
          url: 'expressage'
        },
        {
          img: require('../../assets/img/index/orderPeople.png'),
          text: '领跑者',
          url: 'orderPeople'
        },
        {
          img: require('../../assets/img/index/beautyMakeup.png'),
          text: '美妆',
          url: 'beautyMakeup'
        },
        {
          img: require('../../assets/img/index/electronic.png'),
          text: '数码',
          url: 'electronicProducts'
        },
        {
          img: require('../../assets/img/index/secondMarket.png'),
          text: '跳蚤市场',
          url: 'secondaryMarket'
        },
        {
          img: require('../../assets/img/index/takeOut.png'),
          text: '外卖',
          url: 'takeOutShopList'
        },
        // {
        //   img: require('../../assets/img/index/shop.png'),
        //   text: '商城',
        //   url: 'shoppingMall'
        // },
        {
          img: require('../../assets/img/index/partTime.png'),
          text: '兼职信息',
          url: 'partTimeJobInfo'
        }
      ],
      tabsList: [
        {
          title: '周边外卖'
        },
        {
          title: '零食铺'
        },
        {
          title: '校园食堂'
        },
        {
          title: '全部店铺'
        }
      ],
      shopList: [
        // {
        //   id: 0,
        //   status: 200,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 1,
        //   status: 500,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 2,
        //   status: 400,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 3,
        //   status: 500,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 4,
        //   status: 200,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 5,
        //   status: 500,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 6,
        //   status: 400,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 7,
        //   status: 500,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // },
        // {
        //   id: 8,
        //   status: 400,
        //   title: '书香苑',
        //   imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        //   isDiscounts: true,
        //   score: 4.5,
        //   onSale: 133,
        //   firstPrice: 10,
        //   distributionPrice: 5,
        //   shopType: '川菜',
        //   shopAddress: '昆明冶金高等专科学校'
        // }
      ],
      shopListTwo: []
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    //排序函数
    getSortFun(order, sortBy) {
      var ordAlpah = order == 'asc' ? '>' : '<'
      var sortFun = new Function(
        'a',
        'b',
        'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1'
      )
      return sortFun
    },
    // 下拉选择框改变
    dropdownChange(index) {
      if (index === 1) {
        this.shopList.sort(this.getSortFun('asc', 'shopState.state'))
      } else if (index === 2) {
        this.shopList.sort(this.getSortFun('desc', 'sale'))
      } else if (index === 3) {
        this.shopList = this.shopList.filter(e => {
          return e.shopDiscount.discountPrice
        })
      } else {
        this.shopList = this.shopListTwo
      }
      this.dropdownObj = this.dropdownList[index]
    },
    // 获取店铺列表
    async getShopList() {
      const shopCategoryId =
        this.tabIndex === 0
          ? 4
          : this.tabIndex === 1
          ? 1
          : this.tabIndex === 2
          ? 5
          : 0
      const data = {
        siteId: 50,
        pageIndex: this.pageIndex,
        shopCategoryId,
        pageLimit: 1
      }
      const res = await getData('/shop/info/basic/find', data, {
        showLoading: true
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.shopList.push(...res.data.shopInfo)
        this.shopListTwo.push(...res.data.shopInfo)
        this.pageIndex += 1
        if (this.pageIndex * 1 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      return this.$toast.fail(res.msg)
    },
    toSearch() {
      this.$router.push('/search')
    },
    // 获取站点信息
    async getSiteInfo() {
      const wxApi = ['getLocation']
      const wx = await wechatUtil.init(wxApi)
    },
    showFilterType() {
      console.log('showFilterType')
      this.isShowFilterType = !this.isShowFilterType
    },
    // 点击tabs
    clickTab(name) {
      this.tabIndex = name
      this.pageIndex = 0
      this.shopList = []
      this.finished = false
      this.getShopList()
    },
    // 上拉刷新
    async onLoadRefresh() {
      this.getShopList()
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
}

.take_out {
  position: relative;
  padding-bottom: 5rem;
}
.top_type {
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  .title {
    color: #999;
    font-size: 0.8rem;
  }
}
</style>
