<template>
  <div class="advertising">
    <div class="advertising_info">
      <!-- <van-cell title="站点公告：" label="代取快递" is-link to="user" /> -->
    </div>
    <div class="advertising_content">
      <div class="left" @click="toExpress">
        <van-image
          :src="require('../../assets/img/index/expressage.png')"
          class="img"
        />
        <div class="info">
          <span class="title">代取快递</span>
          <span class="text">代取快递到宿舍</span>
        </div>
      </div>
      <div class="right" @click="toSecondaryMarket">
        <van-image
          :src="require('../../assets/img/index/secondMarket.png')"
          class="img"
        />
        <div class="info">
          <span class="title">跳蚤市场</span>
          <span class="text">便宜质量又有保障</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  methods: {
    toExpress() {
      this.$router.push('/expressage')
      // this.$emit('toExpress')
    },
    toSecondaryMarket() {
      this.$router.push('/secondaryMarket')
      // this.$emit('toSendInfo')
    },
  },
}
</script>
<style lang="less" scoped>
.advertising {
  border-top: 1px solid #ccc;
  .advertising_info {
    .van-cell {
      height: 2.5rem;
    }
    .van-cell__title {
      display: inline-flex;
      align-items: center;
      color: @themeColor;
      font-size: 0.9rem;
      span {
        margin: 0.5rem 0.5rem;
      }
    }
    .van-cell__label {
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }
  }
  .advertising_content {
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    margin: 1rem 0;
    .img {
      width: 25%;
      height: 100%;
    }
    .title {
      color: @themeColor;
      font-size: 1rem;
      display: block;
    }
    .info {
      margin-left: 0.8rem;
    }
    .text {
      color: #ccc;
      font-size: 0.8rem;
    }
    .left {
      display: flex;
      border-right: 0.05rem solid #ccc;
      padding: 0.9rem;
    }
    .right {
      display: flex;
      padding: 0.9rem;
    }
  }
}
</style>
