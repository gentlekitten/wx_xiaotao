<template>
  <div>
    <nav-bar :title="'我的记录'" back-to="/user/taoCoins" :is-arrow="true" />
    <van-list
      v-if="historyList.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="哼，我也是有底线的~"
      :immediate-check="false"
      :offset="0"
      @load="onLoadData"
    >
      <div class="cell" v-for="item in historyList" :key="item.id">
        <div class="left">
          <div class="type">{{ item.msg }}</div>
          <div class="time">{{ item.createTime }}</div>
        </div>
        <div class="right">
          <div class="price">
            {{ item.msgType === 0 ? '-' : '+' }}{{ item.msgMoney }}
          </div>
          <div class="remain_price">余额 {{ item.cMoney }}</div>
        </div>
      </div>
    </van-list>
    <van-empty v-else description="您还没有该记录哦~"></van-empty>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      historyList: [],
      finished: false,
      loading: false,
      pageIndex: 0,
    }
  },
  created() {
    this.getHistoryMoneyList()
  },
  methods: {
    // 获取收支记录
    async getHistoryMoneyList() {
      const res = await getData(
        '/customer/money/use/detail',
        {
          pageIndex: this.pageIndex,
          pageLimit: 10,
        },
        { showLoading: true }
      )
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        this.historyList.push(res.data.customerMoneyRecord)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 下拉加载更多
    onLoadData() {
      if (this.historyList.length > 0) {
        this.getHistoryMoneyList()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.cell {
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  .left {
    .time {
      color: #999;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
  .right {
    .price {
      font-weight: 900;
    }
    .remain_price {
      color: #999;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
