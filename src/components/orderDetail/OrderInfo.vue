<template>
  <div class="order_info_warp">
    <div class="order_info">
      <div class="title">订单信息</div>
      <div class="info">
        <span>备注</span>
        {{ shopInfoObj.otherMsg ? shopInfoObj.otherMsg : '无' }}
      </div>
      <div class="info">
        <span>支付方式</span>
        微信
      </div>
      <div class="info">
        <span>下单时间</span>
        {{ shopInfoObj.createTime }}
      </div>
      <div v-if="shopInfoObj.payState === 1" class="info">
        <span>支付时间</span>
        {{ shopInfoObj.payTime }}
      </div>
      <div class="info">
        <span>订单编号</span>
        {{ shopInfoObj.cOrderSn }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    shopInfoObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.order_info_warp {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-sizing: border-box;
  line-height: 2rem;
  .order_info {
    .title {
      font-size: 1rem;
      font-weight: 900;
      border-bottom: 1px solid #eee;
      height: 3rem;
      margin-bottom: 1rem;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      span {
        color: #999;
      }
    }
  }
}
</style>