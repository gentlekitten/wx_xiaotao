<template>
  <div class="foods_warp">
    <div class="top">
      <div class="name" @click="toOrderDetails(item.otherOrderType.cOrderSn)">
        {{ item.otherOrderType.productName }}
        <van-icon name="arrow" size="1rem" color="#999" />
      </div>
    </div>
    <div class="content">
      <div class="order">
        订单：
        <span @click="toOrderDetails(item.otherOrderType.cOrderSn)">
          点击查看
          <van-icon name="arrow" size="1rem" color="cadetblue" />
        </span>
      </div>
      <div class="total">
        总计：
        <span>￥{{ item.otherOrderType.payMoney }}</span>
      </div>
      <div class="status">
        支付：
        <span v-if="item.otherOrderType.payState === 2">未支付</span>
        <span v-else-if="item.otherOrderType.payState === 1">支付成功</span>
        <span v-else>支付失败</span>
      </div>
      <div class="time">时间：{{ item.otherOrderType.createTime }}</div>
    </div>
    <div class="btn_warp">
      <van-button
        class="btn"
        round
        @click="deleteOrder(item.otherOrderType.cOrderSn)"
        >删除订单</van-button
      >
      <!-- 0不能取消 1能取消 -->
      <van-button v-if="item.otherOrderType.canCancel === 1" class="btn" round
        >取消订单</van-button
      >
      <van-button
        v-if="item.otherOrderType.payState === 2"
        class="btn red"
        round
        @click="toPayment(item.otherOrderType.cOrderSn)"
        >去支付</van-button
      >
    </div>
    <div v-if="item.otherOrderType.payState === 2" class="status_type">
      未支付
    </div>
    <div v-else-if="item.otherOrderType.payState === 1" class="status_type">
      支付成功
    </div>
    <div v-else class="status_type">支付失败</div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    toOrderDetails(cOrderSn) {
      this.$emit('toOrderDetails', cOrderSn)
    },
    deleteOrder(cOrderSn) {
      this.$emit('deleteOrder', cOrderSn)
    },
    toPayment(cOrderSn) {
      this.$emit('toPayment', cOrderSn)
    },
  },
}
</script>
<style lang="less" scoped>
.foods_warp {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  position: relative;
  .top {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
    height: 2rem;
    .name {
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .content {
    .order {
      display: flex;
      span {
        color: cadetblue;
        display: flex;
        align-items: center;
      }
    }
    .total {
      margin: 0.5rem 0;
      span {
        color: @priceColor;
      }
    }
    .status {
      margin: 0.5rem 0;
      span {
        color: @priceColor;
      }
    }
  }
  .btn_warp {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    .btn {
      width: 6rem;
      height: 2rem;
      font-size: 0.8rem;
    }
  }
  .status_type {
    position: absolute;
    top: 4rem;
    right: 1rem;
    color: @priceColor;
    transform: rotate(20deg);
  }
}
</style>