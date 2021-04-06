<template>
  <div>
    <div class="big_comment_img">
      <van-swipe class="my-swipe" :show-indicators="false">
        <van-swipe-item class="swiper_item" v-for="(item, index) in bigImgList" :key="index">
          <img :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-icon name="cross" class="icon" @click="closeBigImg" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      bigImgList: JSON.parse(window.sessionStorage.getItem('itemImgs')),
      imgIndex: window.sessionStorage.getItem('imgIndex')
        ? window.sessionStorage.getItem('imgIndex')
        : 0
    }
  },
  created() {
    console.log(this.bigImgList)
    this.initImg()
  },
  methods: {
    initImg() {
      if (this.imgIndex !== 0) {
        const firstImg = this.bigImgList[0]
        this.bigImgList[0] = this.bigImgList[this.imgIndex]
        this.bigImgList[this.imgIndex] = firstImg
      }
    },
    closeBigImg() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.big_comment_img {
  background-color: #000;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-swipe {
    height: 100%;
    width: 100%;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      height: 80%;
      width: 90%;
    }
  }
}
.swiper_item {
  background-color: #000 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.icon {
  position: fixed;
  top: 1rem;
  left: 1rem;
  color: #fff;
  z-index: 999;
}
</style>
