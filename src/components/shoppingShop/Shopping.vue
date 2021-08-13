<template>
  <div>
    <div class="shopping">
      <div class="bg_img">
        <img :src="imgBaseUrl + shopInfo.shopPic" />
      </div>
      <div class="shop_img">
        <img :src="imgBaseUrl + shopInfo.shopPic" />
      </div>
      <div class="shop_info">
        <div class="title" @click="toShopDetails(shopInfo.shopId)">
          {{ shopInfo.shopName }}
          <van-icon class="icon" name="arrow" size="1rem" />
        </div>
        <van-rate
          v-model="rate"
          size="1rem"
          color="#f2af49"
          void-icon="star"
          void-color="#eee"
          readonly
        />
        <van-notice-bar
          background="rgba(0, 0, 0, 0)"
          :text="shopInfo.salesPromotion"
          @click="clickNoticeBar"
        />
      </div>
      <div class="collect">
        <van-button v-if="!isCollect" class="btn" round @click="clickCollect()"
          >+收藏</van-button
        >
        <van-button v-else class="btn collect_btn" round @click="clickCollect()"
          >取消收藏</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    isCollect: {
      type: Boolean,
      default: false,
    },
    shopInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      rate: 0,
    }
  },
  created() {
    this.rate = this.shopInfo.shopScore ? this.shopInfo.shopScore : 0
  },
  methods: {
    toShopDetails(id) {
      this.$emit('toShopDetails', id)
    },
    clickCollect() {
      this.$emit('clickCollect')
    },
    // 点击通知栏
    clickNoticeBar(e) {
      this.$emit('clickNoticeBar')
    },
  },
}
</script>
<style lang="less" scoped>
.shopping {
  display: flex;
  margin-top: 2.6rem;
  position: relative;
  padding: 1rem;
  .bg_img {
    position: absolute;
    top: -2.6rem;
    left: 0;
    img {
      width: 100%;
      height: 13rem;
      opacity: 0.2;
    }
  }
  .shop_img {
    flex: 1;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
    }
  }
  .shop_info {
    flex: 5;
    margin-left: 1rem;
    .title {
      font-size: 1rem;
      font-weight: 900;
      margin-bottom: 0.2rem;
      display: flex;
      .icon {
        margin-top: 0.2rem;
      }
    }
  }
  .collect {
    position: absolute;
    top: 2rem;
    right: 1rem;
    .btn {
      width: 4.5rem;
      height: 1.5rem;
      background-color: #ffd21e;
      color: #fff;
      font-size: 0.8rem;
      border: 1px solid #ffd21e;
    }
    .collect_btn {
      background-color: #ccc;
      border: 1px solid #ccc;
    }
  }
}
::v-deep .van-button {
  padding: 0;
}
</style>