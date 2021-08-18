<template>
  <div class="order_type">
    <div class="title">配送进程</div>
    <van-steps class="steps" :active="orderState">
      <van-step>未支付</van-step>
      <van-step>提交订单</van-step>
      <van-step>已受理</van-step>
      <van-step>配送中</van-step>
      <van-step>完成！</van-step>
    </van-steps>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    orderState: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.order_type {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  box-sizing: border-box;
  .title {
    font-weight: 900;
    margin-bottom: 1rem;
  }
}
</style>