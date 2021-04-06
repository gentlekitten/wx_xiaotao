<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" class="img" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: String,
      default: '200px'
    }
  }
}
</script>
<style scoped>
.img {
  width: 100%;
  height: 100%;
}
.van-swipe {
  height: 13rem;
}
</style>
