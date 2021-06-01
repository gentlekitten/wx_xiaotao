<template>
  <div>
    <nav-bar :title="'我的记录'" back-to="/user/taoCoins" :is-arrow="true" />
    <div class="cell" v-for="item in historyList" :key="item.id">
      <div class="left">
        <div class="type">{{ item.type }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
      <div class="right">
        <div class="price">{{item.type === '提现' ? '-' : '+'}}{{ item.price }}</div>
        <div class="remain_price">余额 {{ item.remainPrice }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      historyList: [
        {
          id: 0,
          type: '提现',
          time: '4月16日 12:00',
          price: '100.00',
          remainPrice: '100.00'
        },
        {
          id: 1,
          type: '充值',
          time: '4月16日 12:00',
          price: '200.00',
          remainPrice: '300.00'
        }
      ]
    }
  },
  methods: {}
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
