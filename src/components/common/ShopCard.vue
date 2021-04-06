<template>
  <van-card>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #thumb>
      <slot name="thumb"></slot>
    </template>
    <template #tags>
      <slot name="tags"></slot>
    </template>
    <template #desc>
      <slot name="desc"></slot>
    </template>
    <!-- footer -->
    <template #footer>
      <slot name="footer"></slot>
    </template>
    <slot></slot>
  </van-card>
</template>
<script>
export default {}
</script>
<style scoped>
.van-card__title {
  font-size: 1rem;
  font-weight: bolder;
  margin-top: 0.5rem;
}
.van-card {
  margin: 0;
  background-color: #fff;
}
</style>
