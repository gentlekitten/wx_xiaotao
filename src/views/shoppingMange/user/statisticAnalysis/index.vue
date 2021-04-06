<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="统计分析" is-arrow isBackUp />
    <div class="home">
      <div class="top_prive">
        <div class="left">
          <div class="price">￥0</div>
          <div class="text">今日入账</div>
        </div>
        <div class="right">
          <div class="price">￥0</div>
          <div class="text">昨日入账</div>
        </div>
      </div>
      <div class="grid_warp">
        <grid class="grid" :gutter="10" isManage :gird-list="girdList" :column-num="2" />
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'
import Grid from '@/components/common/Grid.vue'

export default {
  components: {
    NavBar,
    Grid
  },
  data() {
    return {
      girdList: [
        {
          img: require('../../../../assets/img/mange/price.png'),
          text: '营收统计',
          url:
            '/shoppingMange/user/shopManage/statisticAnalysis/incomeStatistic'
        },
        {
          img: require('../../../../assets/img/mange/order.png'),
          text: '订单统计',
          url: '/shoppingMange/user/shopManage/statisticAnalysis/orderStatistic'
        }
      ]
    }
  },
  methods: {}
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