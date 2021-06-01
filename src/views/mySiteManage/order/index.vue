<template>
  <div>
    <div class="search_warp">
      <van-search
        class="search"
        v-model="searchValue"
        background="#fff"
        clearable
        shape="round"
        placeholder="请输入搜索关键词"
      />
      <van-button class="search_btn" round @click="searchConfirm">搜索</van-button>
    </div>
    <tabs
      class="tabs"
      :tab-list="tabsList"
      :sticky="true"
      tabsIndexName="tabActiveMySiteManage"
      @clickTab="clickTab"
    >
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="哼，我是有底线的~"
        @load="onLoadRefresh"
        :offset="0"
      >
        <order-people-list v-if="tabIndex === 0" :order-people-list="orderPeopleList" />
        <!-- <common-chat-list v-show="tabIndex === 1" :chat-list="chatList" @toChatView="toChatView" /> -->
        <div v-if="tabIndex === 2 || tabIndex === 0 || tabIndex === 1">
          <div class="report_warp" v-for="item in reportList" :key="item.id">
            <report-list :report-item="item" />
          </div>
        </div>
        <div v-if="tabIndex === 3">
          <template v-if="shopList.length > 0">
            <div v-for="item in shopList" :key="item.id" @click="toShopDetails(item)">
              <shop-list :item="item" />
            </div>
          </template>
          <van-empty v-else description="还没该内容哦~" />
        </div>
        <div v-if="tabIndex === 4">
          <template v-if="feedBackList.length > 0">
            <div class="feedback" v-for="item in feedBackList" :key="item.id">
              <feed-back-list :item="item" />
            </div>
          </template>
          <van-empty v-else description="还没该内容哦~" />
        </div>
      </van-list>
    </tabs>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import Tabs from '@/components/common/Tabs.vue'

import TastList from '@/components/orderPeople/TastList.vue'

import OrderPeopleList from '@/components/manage/mySite/OrderPeopleList.vue'
import ReportList from '@/components/manage/mySite/ReportList.vue'
import FeedBackList from '@/components/manage/mySite/FeedBackList.vue'
import ShopList from '@/components/manage/mySite/ShopList.vue'

import CommonChatList from '@/components/chat/CommonChatList.vue'

export default {
  components: {
    Tabs,
    TastList,
    OrderPeopleList,
    CommonChatList,
    ReportList,
    ShopList,
    FeedBackList
  },
  data() {
    return {
      searchValue: '',
      siteId: JSON.parse(window.sessionStorage.getItem('mySiteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('mySiteInfo')).id
        : 0,
      tabIndex: Number(window.sessionStorage.getItem('tabActiveMySiteManage')),
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      pageIndex: 0,
      // 下拉选择框列表
      tabsList: [
        {
          title: '领跑者'
        },
        {
          title: '客服消息'
        },
        {
          title: '举报消息'
        },
        {
          title: '店铺申请'
        },
        {
          title: '意见反馈'
        }
      ],
      // 客服消息列表
      chatList: [],
      // 举报列表
      reportList: [],
      // 店铺申请列表
      shopList: [],
      // 领跑者申请列表
      orderPeopleList: [],
      // 意见反馈列表
      feedBackList: []
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 根据tabIndex获取数据
    getDataList() {
      if (this.tabIndex === 0) {
        this.getOrderPeopleList()
      } else if (this.tabIndex === 1) {
        // this.getChatList()
        this.getReportList()
      } else if (this.tabIndex === 2) {
        this.getReportList()
      } else if (this.tabIndex === 3) {
        this.getShopList()
      } else if (this.tabIndex === 4) {
        this.getFeedBackList()
      }
    },
    searchConfirm() {},
    // 获取领跑申请列表
    async getOrderPeopleList() {
      const data = {
        siteId: this.siteId,
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/site/delivery/person/list', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.orderPeopleList.push(...res.data.deliveryPersonInfo)
        this.pageIndex += 1
        this.loading = false
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取举报信息列表
    async getReportList() {
      const data = {
        siteId: this.siteId,
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/site/report/find', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.reportList.push(...res.data.siteReport)
        this.pageIndex += 1
        this.loading = false
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取店铺申请列表
    async getShopList() {
      const data = {
        siteId: this.siteId,
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/shop/apply/find', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.shopList.push(...res.data.shopInfo)
        this.pageIndex += 1
        this.loading = false
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取意见反馈列表
    async getFeedBackList() {
      // console.log(this.pageIndex)
      const data = {
        siteId: this.siteId,
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/site/opinion/find', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.feedBackList.push(...res.data.siteOpinion)
        this.pageIndex += 1
        this.loading = false
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    getChatList() {
      const arr = [
        {
          id: 0,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 10,
          isTop: false
        },
        {
          id: 1,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 20,
          isTop: false
        },
        {
          id: 2,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '11:00',
          noReadNum: 0,
          isTop: true
        },
        {
          id: 3,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 15,
          isTop: false
        },
        {
          id: 4,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 100,
          isTop: false
        }
      ]
      arr.sort((a, b) => b.isTop - a.isTop)
      this.chatList = arr
    },
    toChatView(item) {
      this.$router.push('/chatView')
    },
    // 删除消息
    deleteChatItem(index) {
      this.chatList = this.chatList.filter(i => {
        return i.id !== index
      })
    },
    // 置顶消息
    topChatItem(item) {
      const index = this.chatList.findIndex(i => {
        return i.id === item.id
      })
      this.chatList.splice(index, 1)
      item.isTop = true
      this.chatList.unshift(item)
    },
    // 取消置顶
    closeTopChatItem(item) {
      const index = this.chatList.findIndex(i => {
        return i.id === item.id
      })
      this.chatList.splice(index, 1)
      const topChatList = this.chatList.filter(i => {
        return i.isTop === true
      })
      item.isTop = false
      this.chatList.splice(topChatList.length, 0, item)
    },
    // 上拉刷新
    onLoadRefresh() {
      // 解决点击tab会重复发送请求
      if (this.tabIndex === 0 && this.reportList.length > 0) {
        this.getOrderPeopleList()
      } else if (this.tabIndex === 1 && this.reportList.length > 0) {
        this.getReportList()
      } else if (this.tabIndex === 2 && this.reportList.length > 0) {
        this.getReportList()
      } else if (this.tabIndex === 3 && this.shopList.length > 0) {
        this.getShopList()
      } else if (this.tabIndex === 4 && this.feedBackList.length > 0) {
        this.getFeedBackList()
      }
    },
    clickTab(index) {
      this.feedBackList = []
      this.shopList = []
      this.reportList = []
      this.tabIndex = index
      this.pageIndex = 0
      this.finished = false
      this.getDataList()
    },
    // 去申请店铺详情页面
    toShopDetails(item) {
      this.$router.push(
        `/mySiteManage/order/shopApplyDetails?id=${item.id}&state=${item.state}`
      )
    }
  }
}
</script>
<style lang="less" scoped>
.search_warp {
  display: flex;
  padding: 0 1rem;
  background-color: #fff;
  align-items: center;
  .search {
    width: 80%;
    height: 3.5rem;
    margin-right: 1rem;
    .van-cell {
      height: 2rem;
    }
    .van-search__content {
      border: 2px solid @themeColor;
    }
  }
  .search_btn {
    width: 5rem;
    height: 2rem;
    background-color: @themeColor;
    color: #fff;
  }
}
.list {
  padding-bottom: 3.5rem;
  // min-height: 70vh;
}
.report_warp {
  box-sizing: border-box;
}
.feedback {
  box-sizing: border-box;
}
.tabs {
  // margin-top: 20rem;
}
</style>
