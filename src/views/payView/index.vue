<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="支付界面" is-arrow backTo="/index" />
    <div class="container">
      <div class="type">{{ type }}</div>若没自动返回，请手动返回
      <div class="btn_warp">
        <van-button class="btn" type="primary" round @click="back">手动返回</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      request: '',
      type: '支付中。。。'
    }
  },
  created() {
    this.$route.query.request && (this.request = this.$route.query.request)
    this.type =
      this.request === 'ok'
        ? '支付成功!'
        : this.request === 'cancel'
        ? '支付取消!'
        : '支付失败!'
    setTimeout(e => {
      this.back()
    }, 2000)
  },
  methods: {
    back() {
      this.$router.push('/index')
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  text-align: center;
  padding: 2rem 0;
  line-height: 2rem;
  .type {
    font-size: 1.2rem;
    font-weight: 900;
  }
  .btn_warp {
    margin-top: 1rem;
    .btn {
      height: 2rem;
      font-size: 0.9rem;
    }
  }
}
</style>