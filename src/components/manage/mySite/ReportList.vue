<template>
  <div class="item" @click="toReportDetails(reportItem)">
    <div class="title">举报{{ reportItem.shopInfo }}</div>
    <div v-if="reportItem.state === 1" class="status">已处理</div>
    <div v-else class="status red">未处理</div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    reportItem: {
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
    toReportDetails(reportItem) {
      this.$router.push(
        `/mySiteManage/order/reportDetails?id=${reportItem.id}&state=${reportItem.state}`
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