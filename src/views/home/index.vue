<template>
  <div id="home">
    <keep-alive :include="include">
      <router-view />
    </keep-alive>

    <van-tabbar v-model="tabbarActive" route active-color="#EE9611" @change="tabbarChange">
      <van-tabbar-item to="/index">
        <span>首页</span>
        <template #icon>
          <i class="icon iconfont icon-shouye" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/chat">
        <span>消息</span>
        <template #icon>
          <van-icon name="chat" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/cart">
        <span>购物车</span>
        <template #icon>
          <i class="icon iconfont icon-gouwucheman" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>我的</span>
        <template #icon>
          <i class="icon iconfont icon-geren" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      include: ['Index', 'User', 'Cart'],
      tabbarActive: Number(window.sessionStorage.getItem('indexTabbarIndex'))
        ? Number(window.sessionStorage.getItem('indexTabbarIndex'))
        : 0
    }
  },
  methods: {
    tabbarChange() {
      window.sessionStorage.setItem('indexTabbarIndex', this.tabbarActive)
    }
  }
}
</script>
<style lang="less" scoped>
.van-overlay {
  z-index: 9;
}
::v-deep .van-tabbar {
  min-width: 350px;
}
</style>
