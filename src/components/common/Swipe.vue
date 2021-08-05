<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item
      v-for="(item, index) in images"
      :key="index+item.picAddress"
      @click="clickSwiperImg"
    >
      <img v-lazy="'https://jixi.mynatapp.cc/' + item.picAddress" class="img" />
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
  },
  created() {},
  methods: {
    // 点击轮播图片跳转
    clickSwiperImg(item) {
      if (item.picLink) {
        window.location.href = item.picLink
      }
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
