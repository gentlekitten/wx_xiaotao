<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="外卖配置" is-arrow isBackUp />
    <van-cell class="setting_scope" title="配送范围" is-link @click="toSettingScope" />
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {}
  },
  methods: {
    //   设置配送范围
    toSettingScope() {
      this.$router.push(
        '/shoppingMange/user/shopManage/takeOutSetting/scopeSetting'
      )
    }
  }
}
</script>
<style lang="less" scoped>
.setting_scope {
  margin-top: 0.5rem;
  .van-cell__title {
    font-weight: 900;
    font-size: 1rem;
  }
}
</style>