<template>
  <div class="home">
    <!-- <div class="img_warp">
      <img class="img" src="../../assets/img/logo.jpg" />
    </div>-->
    <!-- <div class="btn_warp">
      <van-button class="btn" round type="primary" @click="toLogin">微信授权登录</van-button>
    </div>
    <div class="rules">
      <div class="left">用户协议</div>
      <i class="center">|</i>
      <div class="rught">隐私协议</div>
    </div>
    <div class="tip">登录/注册即代表阅读并同意以上协议及政策</div>-->
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

export default {
  data() {
    return {
      url: 'https://www.xtaoshop.com/index.html#/index'
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    getCode() {
      window.sessionStorage.setItem('wxCode', 'wxCode')
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx531b5adecd8b4507&redirect_uri=${encodeURIComponent(
        this.url
      )}&response_type=code&scope=snsapi_userinfo&state=wechat&connect_redirect=1#wechat_redirect`
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  background-color: #fff;
  .img_warp {
    width: 100%;
    height: 15rem;
    display: flex;
    justify-content: center;
    img {
      width: 90%;
      height: 100%;
    }
  }
  .btn_warp {
    margin: 5rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    .btn {
      width: @buttonWidth;
    }
  }
  .rules {
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    color: #4d8ab3;
    .center {
      color: #ccc;
      margin: 0 0.5rem;
    }
  }
  .tip {
    margin-top: 1rem;
    color: #999;
    font-size: 0.75rem;
    text-align: center;
  }
}
</style>
