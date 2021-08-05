<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="统计分析" is-arrow isBackUp />
    <div class="home">
      <div class="top_prive">
        <div class="left">
          <div class="price">￥{{ todayMoney }}</div>
          <div class="text">今日入账</div>
        </div>
        <div class="right">
          <div class="price">￥{{ yesterdayMoney }}</div>
          <div class="text">昨日入账</div>
        </div>
      </div>
      <div class="grid_warp">
        <grid
          class="grid"
          :gutter="10"
          isManage
          :gird-list="girdList"
          :column-num="2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import timeForamt from '@/assets/js/time.js'

import NavBar from '@/components/common/NavBar.vue'
import Grid from '@/components/common/Grid.vue'
import statisticAnalysis from '@/components/mixins/statisticAnalysis.js'

export default {
  components: {
    NavBar,
    Grid,
  },
  // mixins: [statisticAnalysis],
  data() {
    return {
      shopId: window.sessionStorage.getItem('shopId'),
      girdList: [
        {
          img: require('../../../../assets/img/mange/price.png'),
          text: '营收统计',
          url: '/shoppingMange/user/shopManage/statisticAnalysis/incomeStatistic',
        },
        {
          img: require('../../../../assets/img/mange/order.png'),
          text: '订单统计',
          url: '/shoppingMange/user/shopManage/statisticAnalysis/orderStatistic',
        },
      ],
      // 今日入账列表
      todayMoneyList: [],
      // 昨日入账列表
      yesterdayMoneyList: [],
      // 今日入账总
      todayMoney: 0,
      // 昨日入账总
      yesterdayMoney: 0,
    }
  },
  created() {
    this.getMoney()
  },
  methods: {
    // 获取今日入账
    async getMoney() {
      let startTime = timeForamt.gettime.setTime(-24 * 60 * 60 * 1000)
      let endTime = timeForamt.gettime.formatTime()
      const data = {
        shopId: this.shopId,
        startTime,
        endTime,
      }
      console.log(data)
      const res = await upData('/shop/bill/money/count', data, {
        showLoading: true,
      })
      console.log(res)

      if (res.code === '0') {
        this.yesterdayMoney = res.data.orderMoney[0]
        this.todayMoney = res.data.orderMoney[1]
        return false
      }
      this.$handleCode.handleCode(res)
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  padding: 1rem;
  .top_prive {
    background-color: #fff;
    border-radius: 0.5rem;
    height: 6.5rem;
    display: flex;
    align-items: center;
    line-height: 2rem;
    .left {
      width: 50%;
      text-align: center;
      border-right: 2px solid #eee;
    }
    .right {
      width: 50%;
      text-align: center;
    }
    .price {
      font-weight: 900;
    }
    .text {
      color: #999;
      font-size: 0.8rem;
    }
  }
  .grid_warp {
    margin-top: 2rem;
    .grid {
      border-radius: 0.5rem;
      padding-bottom: 1rem;
    }
  }
}
</style>