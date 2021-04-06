<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="我的站点管理" is-arrow backTo="/user" />
    <router-view />
    <van-tabbar v-model="tabbarActive" route active-color="#EE9611" @change="tabbarChange">
      <van-tabbar-item to="/mySiteManage/order">
        <span>消息</span>
        <template #icon>
          <i class="icon iconfont icon-dingdan1" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mySiteManage/user">
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
      tabbarActive: Number(
        window.sessionStorage.getItem('orderPeopleManageTabbarIndex')
      )
        ? Number(window.sessionStorage.getItem('orderPeopleManageTabbarIndex'))
        : 0
    }
  },
  methods: {
    tabbarChange() {
      window.sessionStorage.setItem(
        'orderPeopleManageTabbarIndex',
        this.tabbarActive
      )
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep .van-tabbar {
  min-width: 350px;
}
</style>
