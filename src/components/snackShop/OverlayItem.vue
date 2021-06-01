<template>
  <div class="tip">
    <i class="iconfont icon-jiantouarrow504 icon" />
    <div>
      微信右上角
      <span>···</span>分享给朋友或群
      <br />让更多小伙伴都能享受便利
      <br />来校淘校园·聚精彩
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.tip {
  color: #fff;
  text-align: center;
  font-size: 1rem;
  padding: 5rem;
  line-height: 2rem;
  font-weight: 900;
  z-index: 1000;
  .icon {
    position: fixed;
    top: 1rem;
    right: 1.5rem;
    font-size: 5rem;
  }
  span {
    margin: 0 0.3rem;
  }
}
</style>
