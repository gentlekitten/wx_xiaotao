<template>
  <div>
    <!-- 代取快递 -->
    <div v-if="item.orderType === 6" class="express_warp">
      <div class="type">
        <span>代取快递</span>
        <div class="require">
          {{ item.receiveExpressOrderType.expressName }}
        </div>
      </div>
      <div
        class="user_info"
        @click="toOrderDetails(item.receiveExpressOrderType.cOrderSn)"
      >
        {{ item.receiveExpressOrderType.customerName }}
        <span>{{ item.receiveExpressOrderType.customerPhone }}</span>
      </div>
      <div
        class="user_address"
        @click="toOrderDetails(item.receiveExpressOrderType.cOrderSn)"
      >
        {{ item.receiveExpressOrderType.customerAddress }}
      </div>
      <div
        class="info"
        @click="toOrderDetails(item.receiveExpressOrderType.cOrderSn)"
      >
        所选规格：{{
          item.receiveExpressOrderType.specificationName
            ? item.receiveExpressOrderType.specificationName
            : '无'
        }}；所选服务：{{
          item.receiveExpressOrderType.serviceName
            ? item.receiveExpressOrderType.serviceName
            : '无'
        }}；备注信息：{{
          item.receiveExpressOrderType.otherMsg
            ? item.receiveExpressOrderType.otherMsg
            : '无'
        }}
      </div>
      <div class="price">
        总费用：
        <span>￥{{ item.receiveExpressOrderType.expressMoney }}</span>
      </div>
      <div class="time">
        提交：{{ item.receiveExpressOrderType.createTime }}
      </div>
      <div class="btn_warp">
        <van-button
          class="btn"
          round
          @click="deleteOrder(item.receiveExpressOrderType.cOrderSn)"
          >删除订单</van-button
        >
        <!-- 0不能取消 1能取消 -->
        <van-button
          v-if="item.receiveExpressOrderType.canCancel === 1"
          class="btn"
          round
          >取消订单</van-button
        >
        <van-button
          v-if="item.receiveExpressOrderType.payState === 2"
          class="btn red"
          round
          @click="toPayment(item.receiveExpressOrderType.cOrderSn)"
          >去支付</van-button
        >
      </div>
      <div
        v-if="item.receiveExpressOrderType.payState === 2"
        class="status_type"
      >
        未支付
      </div>
      <div
        v-if="item.receiveExpressOrderType.payState === 0"
        class="status_type"
      >
        支付失败
      </div>
      <div
        v-if="item.receiveExpressOrderType.payState === 1"
        class="status_type"
      >
        支付成功
      </div>
    </div>
    <!-- 寄出快递 -->
    <div v-if="item.orderType === 7" class="express_warp">
      <div class="type">
        <span>寄出快递</span>
        <div class="require">
          {{ item.sendExpressOrderType.expressName }}
        </div>
      </div>
      <div
        class="user_info"
        @click="toOrderDetails(item.sendExpressOrderType.cOrderSn)"
      >
        {{ item.sendExpressOrderType.customerName }}
        <span>{{ item.sendExpressOrderType.customerPhone }}</span>
      </div>
      <div
        class="user_address"
        @click="toOrderDetails(item.sendExpressOrderType.cOrderSn)"
      >
        {{ item.sendExpressOrderType.customerAddress }}
      </div>
      <div
        class="info"
        @click="toOrderDetails(item.sendExpressOrderType.cOrderSn)"
      >
        收件人姓名：{{ item.sendExpressOrderType.toName }}；收件人电话：{{
          item.sendExpressOrderType.toPhone
        }}；收件人地址：{{ item.sendExpressOrderType.toAddress }}；备注信息：{{
          item.sendExpressOrderType.otherMsg
            ? item.sendExpressOrderType.otherMsg
            : '无'
        }}
      </div>
      <div class="price">
        上门小费：
        <span>￥{{ item.sendExpressOrderType.expressMoney }}</span>
      </div>
      <div class="time">提交：{{ item.sendExpressOrderType.createTime }}</div>
      <div class="btn_warp">
        <van-button
          class="btn"
          round
          @click="deleteOrder(item.sendExpressOrderType.cOrderSn)"
          >删除订单</van-button
        >
        <!-- 0不能取消 1能取消 -->
        <van-button
          v-if="item.sendExpressOrderType.canCancel === 1"
          class="btn"
          round
          >取消订单</van-button
        >
        <van-button
          v-if="item.sendExpressOrderType.payState === 2"
          class="btn red"
          round
          @click="toPayment(item.sendExpressOrderType.cOrderSn)"
          >去支付</van-button
        >
      </div>
      <div v-if="item.sendExpressOrderType.payState === 2" class="status_type">
        未支付
      </div>
      <div v-if="item.sendExpressOrderType.payState === 0" class="status_type">
        支付失败
      </div>
      <div v-if="item.sendExpressOrderType.payState === 1" class="status_type">
        支付成功
      </div>
    </div>
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
.express_warp {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  line-height: 2rem;
  position: relative;
  .type {
    font-weight: 900;
    font-size: 1rem;
    display: flex;
    span {
      color: cadetblue;
      margin-right: 1rem;
    }
  }
  .user_info {
    font-size: 1rem;
    span {
      color: cadetblue;
      margin-left: 1rem;
    }
  }
  .user_address {
    color: #999;
    line-height: 1.5rem;
  }
  .info {
    background-color: #f7f7f7;
    padding: 1rem;
    line-height: 1.5rem;
  }
  .price {
    span {
      color: @priceColor;
    }
  }
  .btn_warp {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 6rem;
      height: 2rem;
      font-size: 0.8rem;
    }
  }
  .status_type {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: @priceColor;
    transform: rotate(20deg);
  }
}
</style>
