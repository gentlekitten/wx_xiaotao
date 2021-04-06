<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar @toShare="toShare" @toSearch="toSearch" @toChat="toChat" @tabClick="tabClick" />
    <template v-if="tabIndex === 0">
      <!-- 商店信息 -->
      <shopping
        :rateValue="rateValue"
        :is-collect="isCollect"
        @clickCollect="clickCollect"
        @clickNoticeBar="clickNoticeBar"
      />
      <!-- tabs -->
      <tabs
        class="tabs"
        :tab-list="tabList"
        offsetTop="2.6rem"
        :sticky="true"
        tabsIndexName="tabActiveShopping"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我是有底线的~"
          @load="onLoadRefresh"
        >
          <!-- 商品列表 -->
          <shop-list
            :shop-list="shopList"
            :dropdownList="dropdownList"
            @toShoppingDetails="toShoppingDetails"
          />
        </van-list>
      </tabs>
    </template>
    <template v-else>
      <!-- 商店信息 -->
      <shopping
        :rateValue="rateValue"
        :is-collect="isCollect"
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
      <search-popup @clickShopSearch="clickShopSearch" />
    </van-popup>
    <!-- 分享遮蔽层 -->
    <van-overlay style="z-index: 999;" :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
    <!-- 点击通知栏遮蔽层 -->
    <van-overlay class="overlay" :show="noticeOverlayIsShow" @click="noticeOverlayIsShow = false">
      <div class="warp">
        <div class="shop_name">哈哈哈</div>
        <div class="title">☆☆&nbsp;简介&nbsp;☆☆</div>
        <div class="content">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
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
      searchIsShow: false,
      overlayIsShow: false,
      noticeOverlayIsShow: false,
      isCollect: false,
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      id: 7,
      rateValue: 2.5,
      tabIndex: Number(window.sessionStorage.getItem('shoppingShopTabIndex')),
      tabList: [
        {
          title: '全部'
        },
        {
          title: '纸'
        },
        {
          title: '食品'
        },
        {
          title: '化妆品'
        }
      ],
      // 下拉选择框列表
      dropdownList: [
        { text: '综合排序', value: 0 },
        { text: '销量排序', value: 1 },
        { text: '价格优先', value: 2 },
        { text: '最新上架', value: 3 }
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
  methods: {
    async getShoppingInfo() {
      const res = await getData(
        '/shop/electronics/info/find',
        {},
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        return false
      }
      return this.$toast.fail(res.msg)
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
    tabClick(index) {
      this.tabIndex = index
    },
    clickShopSearch() {},
    // 收藏店铺
    async clickCollect() {
      const url = !this.isCollect ? '/shop/record/add' : '/shop/record/delete'
      const res = await upData(url, { shopId: 18 }, { showLoading: true })
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
      return this.$toast.fail(res.msg)
    },
    clickNoticeBar() {
      this.noticeOverlayIsShow = true
    },
    toShoppingDetails(id) {
      this.$router.push('/shoppingDetails?id=' + id)
    },
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
