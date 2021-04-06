<template>
  <van-grid :column-num="3">
    <van-grid-item v-for="(item, index) in evaluateInfoList" :key="index">
      <div class="num">{{ item.num }}</div>
      <div class="text">{{ item.text }}</div>
    </van-grid-item>
  </van-grid>
</template>
<script>
export default {
  props: {
    evaluateInfoList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style scoped>
.num {
  color: red;
  margin-bottom: 1rem;
}
.van-grid-item {
  padding: 0;
}
</style>
