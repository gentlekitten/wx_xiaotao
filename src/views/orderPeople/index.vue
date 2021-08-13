<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="siteInfo.siteName" is-arrow backTo="/index">
      <template v-slot:right_icon>
        <van-icon name="search" size="1.5rem" @click="searchIsShow = true" />
      </template>
    </nav-bar>
    <div class="top_info">
      <div class="left" @click="registerOrderPeople">
        成为“校园领跑者”
        <br />任务接单校内兼职赚钱》
      </div>
      <div class="right" @click="toOrderPeopleView">
        {{ orderPeopleNum }}领跑者接单中》
      </div>
    </div>
    <!-- tabs -->
    <tabs
      class="tabs"
      :tab-list="tabList"
      :sticky="true"
      tabsIndexName="orderPeopleTabsIndex"
      @clickTab="clickTab"
    >
      <template v-slot:tab0>
        <van-pull-refresh
          v-if="taskList.length > 0"
          v-model="taskListDownLoading"
          @refresh="taskListRefresh"
        >
          <van-list
            v-model="taskListUpLoading"
            :finished="taskListFinished"
            finished-text="哼，我也是有底线的~"
            :offset="0"
            :immediate-check="false"
            @load="taskListLoad"
          >
            <tast-list :taskList="taskList" @clickTast="clickTast" />
          </van-list>
        </van-pull-refresh>
        <van-empty v-else description="还没任务信息哦~" />
      </template>
      <template v-slot:tab1>
        <van-pull-refresh
          v-if="myTaskList.length > 0"
          v-model="myTaskListDownLoading"
          @refresh="myTaskListRefresh"
        >
          <van-list
            v-model="myTaskListUpLoading"
            :finished="myTaskListFinished"
            finished-text="哼，我也是有底线的~"
            :immediate-check="false"
            :offset="0"
            @load="myTaskListLoad"
          >
            <tast-list
              :taskList="myTaskList"
              @clickTast="sendTaskInfo"
              @toPayment="toPayment"
            />
          </van-list>
        </van-pull-refresh>
        <van-empty v-else description="还没任务信息哦~" />
      </template>
    </tabs>
    <!-- 搜索弹出层 -->
    <van-popup
      class="popup"
      v-model="searchIsShow"
      closeable
      round
      position="top"
    >
      <search-popup @clickShopSearch="clickShopSearch" />
    </van-popup>
    <!-- 发布按钮 -->
    <div class="send_btn" @click="toSendTast">发布</div>
    <div class="popup_warp">
      <!-- 注册零跑者弹出层 -->
      <van-popup
        class="popup"
        v-model="popupIsShow"
        :close-on-click-overlay="false"
        round
      >
        <div class="popup_item">
          <van-icon class="icon" name="fail" size="3rem" />你还不是领跑者哦~
        </div>
        <div class="btn_warp">
          <van-button
            class="btn"
            round
            block
            type="warning"
            @click="registerOrderPeopleBtn"
            >申请</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'
import Tabs from '@/components/common/TabIsDifferent.vue'

import SearchPopup from '@/components/snackShop/SearchPopup.vue'

import TastList from '@/components/orderPeople/TastList.vue'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    NavBar,
    Tabs,
    SearchPopup,
    TastList,
  },
  mixins: [onBridgeReady],
  data() {
    return {
      // 站点信息
      siteInfo: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo'))
        : {},
      tabIndex: Number(sessionStorage.getItem('orderPeopleTabsIndex'))
        ? Number(sessionStorage.getItem('orderPeopleTabsIndex'))
        : 0,
      searchIsShow: false,
      popupIsShow: false,
      // 当前接单中领跑者数量
      orderPeopleNum: 0,
      pageIndex: 0,
      tabList: [
        {
          title: '任务大厅',
        },
        {
          title: '我的发布',
        },
      ],
      taskList: [],
      myTaskList: [],
      //   上拉
      taskListUpLoading: false,
      taskListFinished: false,
      //   下拉
      taskListDownLoading: false,
      //   上拉
      myTaskListUpLoading: false,
      myTaskListFinished: false,
      //   下拉
      myTaskListDownLoading: false,
      // 是否是领跑者
      isOrderPeopPeolple: false,
    }
  },
  created() {
    this.getData()
    this.getOrderPelpleNumber()
  },
  methods: {
    getData() {
      this.tabIndex === 0 ? (this.taskList = []) : (this.myTaskList = [])
      this.tabIndex === 0 ? this.getTaskList(true) : this.getMyTaskList(true)
    },
    // 获取领跑者数量
    async getOrderPelpleNumber() {
      let orderPeopleList = []
      const res = await getData(
        '/site/delivery/person/state/find',
        {},
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        orderPeopleList = res.data.filter((e) => {
          return e.state === 1
        })
        this.orderPeopleNum = orderPeopleList.length

        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取任务列表
    async getTaskList(showLoading) {
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10,
      }
      const res = await getData('/site/delivery/order/all/find', data, {
        showLoading,
      })
      this.taskListUpLoading = false
      console.log(res)
      if (res.code === '0') {
        this.taskList.push(...res.data.deliveryOrder)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.taskListFinished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取我的任务列表
    async getMyTaskList(showLoading) {
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10,
      }
      console.log(this.pageIndex)

      const res = await getData('/site/delivery/order/all/my/find', data, {
        showLoading,
      })
      this.myTaskListUpLoading = false
      console.log(res)

      if (res.code === '0') {
        this.myTaskList.push(...res.data.deliveryOrder)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.myTaskListFinished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取判断是否是领跑者
    async handleIsOrderPeople() {
      const res = await getData('/page/userInfo', {}, { showLoading: false })
      console.log(res)
      if (res.code === '0') {
        if (
          res.data.deliveryPersonId ||
          res.data.userInfo.deliveryPersonId === 0
        ) {
          this.isOrderPeopPeolple = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 支付
    async toPayment(cOrderSn) {
      const res = await upData(
        '/order/info/unify/pay',
        { cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.onBridgeReady(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 商品搜索事件
    clickShopSearch(shopSearchValue) {
      if (shopSearchValue !== '') {
        this.searchIsShow = false
      } else {
        this.$toast.fail('请输入搜索内容！')
      }
    },
    clickTab(index) {
      this.tabIndex = index
      this.pageIndex = 0
      this.getData()
    },
    // 上拉加载
    taskListLoad() {
      this.taskList.lenght > 0 && this.getTaskList(false)
    },
    // 下拉刷新数据
    taskListRefresh() {
      this.taskList = []
      this.pageIndex = 0
      this.getTaskList(true)
      this.taskListDownLoading = false
    },
    // 我的发布上拉加载
    myTaskListLoad() {
      this.myTaskList.length > 0 && this.getMyTaskList(false)
    },
    // 我的发布下拉刷新数据
    myTaskListRefresh() {
      this.myTaskList = []
      this.pageIndex = 0
      this.getMyTaskList(true)
      this.myTaskListDownLoading = false
    },
    // 去发布界面
    toSendTast() {
      this.$router.push('/orderPeople/taskSendType')
    },
    // 去注册界面
    registerOrderPeople() {
      // 判断是否是领跑者
      if (this.isOrderPeopPeolple) {
        this.$toast.fail('你已经是领跑者了！')
        return false
      }
      this.popupIsShow = true
    },
    // popup的申请按钮
    registerOrderPeopleBtn() {
      this.$router.push('/orderPeople/registerOrderPeople')
    },
    // 点击任务大厅任务
    clickTast(cOrderSn) {
      if (this.isOrderPeopPeolple) {
        this.$router.push(`/orderPeople/sendTaskInfoView?cOrderSn=${cOrderSn}`)
        return false
      }
      // 不是领跑者弹出零跑者申请弹框
      this.popupIsShow = true
    },
    // 跳转我的发布详细界面
    sendTaskInfo(cOrderSn) {
      this.$router.push(`/orderPeople/sendTaskInfoView?cOrderSn=${cOrderSn}`)
    },
    toOrderPeopleView() {
      this.$router.push('/orderPeople/orderPeopleList')
    },
  },
}
</script>
<style lang="less" scoped>
.popup {
  height: 10rem;
}
.popup_warp {
  .popup {
    box-sizing: border-box;
    width: 15rem;
    height: 13rem;
    text-align: center;
    .popup_item {
      width: 100%;
      margin-top: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
    .icon {
      position: absolute;
      top: 1rem;
    }
    .btn_warp {
      width: 100%;
      margin-top: 2rem;
      display: flex;
      justify-content: space-around;
      .btn {
        width: 45%;
        height: 2.5rem;
      }
    }
  }
  .van-popup--center {
    top: 25%;
  }
}
.send_btn {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 2rem;
  bottom: 2.5rem;
  width: 3rem;
  height: 3rem;
  background-color: #21b668;
  color: #fff;
  border-radius: 50%;
  opacity: 0.8;
}
.top_info {
  display: flex;
  font-size: 0.8rem;
  width: 100%;
  height: 5rem;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  .left {
    flex: 2;
    color: @themeColor;
    line-height: 1.5rem;
  }
  .right {
    flex: 1;
    color: cadetblue;
  }
}
</style>
