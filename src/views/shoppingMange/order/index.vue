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
      <van-button class="search_btn" round @click="searchConfirm"
        >搜索</van-button
      >
    </div>
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      tabsIndexName="tabActiveOrderPeopleOrder"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="哼，我也是有底线的~"
        :immediate-check="false"
        :offset="0"
        @load="onLoadData"
      >
        <order-list
          v-if="shopManageId === 3"
          :order-list="orderList"
          @toOrderDetails="toOrderDetails"
        />
        <snack-order-list
          v-else
          :order-list="snackOrderList"
          @toOrderDetails="toOrderDetails"
        />
      </van-list>
      <!-- <van-empty v-else description="您还没有此类订单哦~"></van-empty -->
    </tabs>
  </div>
</template>
<script>
import Tabs from '@/components/common/Tabs.vue'

import TastList from '@/components/orderPeople/TastList.vue'

import OrderList from '@/components/manage/shoppingOrder/OrderList.vue'
import SnackOrderList from '@/components/manage/snackShopOrder/SnackOrderList.vue'

export default {
  components: {
    Tabs,
    TastList,
    OrderList,
    SnackOrderList,
  },
  data() {
    return {
      searchValue: '',
      shopManageId: Number(window.sessionStorage.getItem('shopManageId')),
      tabsList: [
        {
          title: '全部单',
        },
        {
          title: '待受理',
        },
        {
          title: '已受理',
        },
        {
          title: '配送中',
        },
        {
          title: '已完成',
        },
        {
          title: '被撤销',
        },
      ],
      myTaskList: [
        {
          id: 0,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '新食堂帮买东西',
          sexRequire: '性别不限',
          timeRequire: '今天',
          detailedTime: '尽快',
          price: '5',
          status: 200,
        },
        {
          id: 1,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '新食堂帮买东西',
          sexRequire: '性别不限',
          timeRequire: '今天',
          detailedTime: '尽快',
          price: '5',
          status: 201,
        },
        {
          id: 2,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '新食堂帮买东西',
          sexRequire: '性别不限',
          timeRequire: '今天',
          detailedTime: '尽快',
          price: '5',
          status: 201,
        },
        {
          id: 3,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '新食堂帮买东西',
          sexRequire: '性别不限',
          timeRequire: '今天',
          detailedTime: '尽快',
          price: '5',
          status: 200,
        },
      ],
      orderList: [
        {
          id: 0,
          status: 200,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣',
          price: '9.9',
          num: '1',
          type: '黑色；L码',
          totalPrice: '9.9',
          realPrice: '9.9',
        },
      ],
      snackOrderList: [
        {
          id: 0,
          status: 200,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣',
          price: '9.9',
          num: '1',
          totalPrice: '9.9',
          realPrice: '9.9',
        },
      ],
    }
  },
  methods: {
    searchConfirm() {},
    sendTaskInfo() {
      this.$router.push('/orderPeople/sendTaskInfoView')
    },
    toOrderDetails() {
      this.$router.push('/orderDetailsOfManage')
    },
    // 上拉加载数据
    onLoadData() {
      // 解决点击tab会重复发送请求
      if (this.orderList.length > 0) {
        this.getUserOrder(this.tabIndex)
      }
    },
  },
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
</style>
