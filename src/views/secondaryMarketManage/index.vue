<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="我的二手市场管理" is-arrow backTo="/user" />
    <router-view />
    <van-tabbar v-model="tabbarActive" route active-color="#EE9611">
      <van-tabbar-item to="/secondaryMarketManage/order">
        <span>接单</span>
        <template #icon>
          <i class="icon iconfont icon-dingdan1" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/secondaryMarketManage/user">
        <span>我的</span>
        <template #icon>
          <i class="icon iconfont icon-geren" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
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
      tabbarActive: 0
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
</style>
