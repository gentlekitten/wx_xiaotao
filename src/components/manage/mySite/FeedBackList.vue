<template>
  <div class="item animated fadeInLeft" @click="toFeedBackDetails(item)">
    <div class="title">意见反馈</div>
    <div v-if="item.state === 1" class="status">已处理</div>
    <div v-else class="status red">未处理</div>
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
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    toFeedBackDetails(item) {
      this.$router.push(
        `/mySiteManage/order/feedBackDetails?id=${item.id}&state=${item.state}`
      )
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  padding: 1rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f7f7f7;
  .title {
    font-weight: 900;
  }
  .status {
    color: cadetblue;
    font-size: 0.8rem;
    transform: rotate(10deg);
  }
  .red {
    color: @priceColor;
  }
}
</style>