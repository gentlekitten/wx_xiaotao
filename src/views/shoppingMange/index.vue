<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="navBarTitle" is-arrow backTo="/user" />
    <router-view />
    <van-tabbar v-model="tabbarActive" route active-color="#EE9611">
      <van-tabbar-item to="/shoppingMange/order">
        <span>接单</span>
        <template #icon>
          <i class="icon iconfont icon-dingdan1" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shoppingMange/comment">
        <span>评论</span>
        <template #icon>
          <van-icon name="comment" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shoppingMange/goods">
        <span>商品</span>
        <template #icon>
          <van-icon name="goods-collect" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shoppingMange/user">
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
      navBarTitle: '',
      tabbarActive: 0
    }
  },
  created() {
    const id = this.$route.query.id
      ? this.$route.query.id
      : window.sessionStorage.getItem('shopManageId')
    this.initNavBar(Number(id))
  },
  methods: {
    initNavBar(id) {
      this.navBarTitle =
        id === 1
          ? '我的零食铺管理'
          : id === 2
          ? '我的外卖管理'
          : id === 3
          ? '我的美妆管理'
          : '我的数码管理'
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep .van-tabbar {
  min-width: 350px;
}
</style>
