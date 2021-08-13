<template>
  <van-grid :column-num="3">
    <van-grid-item>
      <div class="num">
        {{ evaluateInfoList.attitude ? evaluateInfoList.attitude / 2 : 0 }}
      </div>
      <div class="text">服务态度</div>
    </van-grid-item>
    <van-grid-item>
      <div class="num">
        {{ evaluateInfoList.quality ? evaluateInfoList.quality / 2 : 0 }}
      </div>
      <div class="text">产品品质</div>
    </van-grid-item>
    <van-grid-item>
      <div class="num">
        {{ evaluateInfoList.sTime ? evaluateInfoList.sTime / 2 : 0 }}
      </div>
      <div class="text">送达速度</div>
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
      },
    },
  },
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
