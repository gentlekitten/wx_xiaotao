<template>
  <div>
    <!-- 背景图片 -->
    <van-image class="img" width="100%" height="14.5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <!-- 顶部商店信息 -->
    <div class="shop">
      <div class="shop_info">
        <van-image
          class="shop_info_img"
          round
          width="4.5rem"
          fit="cover"
          height="4.5rem"
          :src="'https://jixi.mynatapp.cc/'+shopInfoObj.shopPic"
        />
        <div class="collect" @click="toCollect">
          <i class="icon iconfont" :class="[isCollect ? 'icon-shoucang1' : 'icon-shoucang']" />
        </div>
        <div class="title">{{ shopInfoObj.shopName }}</div>
        <div class="trade">
          <span
            class="sore"
          >评分：{{ shopInfoObj.shopScore ? (shopScore.attitude + shopScore.quality + shopScore.sTime) / 6 : '暂无' }}</span>
          <span class="sale_num">月售：{{ shopInfoObj.sale }}</span>
        </div>
        <div class="tag">
          <van-tag plain type="danger">专人配送</van-tag>
        </div>
        <div class="shop_info_text trade">{{ shopInfoObj.businessInfo }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isCollect: {
      type: Boolean,
      default: false
    },
    shopInfoObj: {
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
    toCollect() {
      this.$emit('toCollect')
    }
  }
}
</script>
<style lang="less" scoped>
.img {
  width: 100%;
  height: 15rem;
  filter: blur(0.8rem);
}
.shop {
  display: flex;
  justify-content: center;
  margin-bottom: 。8rem;
  .shop_info {
    position: absolute;
    top: 5rem;
    width: 90%;
    height: 28%;
    background-color: #fff;
    text-align: center;
    padding-top: 2rem;
    border-radius: 3%;
    .shop_info_img {
      position: absolute;
      top: -2.5rem;
      left: 50%;
      transform: translate(-50%);
    }
    .collect {
      width: 2rem;
      height: 2rem;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      top: -1rem;
      right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 0.8rem rgba(0, 0, 0, 0.2);
      color: #999;
    }
    .title {
      font-size: 1rem;
      font-weight: bolder;
      margin-top: 0.8rem;
    }
    .trade {
      font-size: 0.7rem;
      color: #ccc;
      margin: 0.5rem 0;
      .sore {
        margin-right: 0.3rem;
      }
    }
    .tag {
      font-size: 1rem;
      .van-tag {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
