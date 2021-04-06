<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="站点管理" is-arrow isBackUp />
    <van-cell title="首页轮播配置" is-link to="/mySiteManage/user/mySiteManage/indexSwiperSetting" />
    <van-cell title="零食铺楼栋配置" is-link to="/mySiteManage/user/mySiteManage/snackShopSetting" />
    <van-cell title="公告配置" is-link to="/mySiteManage/user/mySiteManage/noticeSetting" />
    <van-cell title="添加站点快递" is-link to="/mySiteManage/user/mySiteManage/addExpressName" />
    <van-cell title="站点范围" is-link to="/mySiteManage/user/mySiteManage/scopeSetting" />
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
  methods: {}
}
</script>
<style lang="less" scoped>
.van-cell__title {
  font-size: 0.9rem;
}
.van-cell__title {
  font-size: 0.9rem;
}
</style>