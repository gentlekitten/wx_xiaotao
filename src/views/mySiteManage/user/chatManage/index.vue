<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="消息管理" is-arrow isBackUp />
    <van-cell title="客服消息群发" is-link @click="toServiceChat" />
    <van-cell title="站内消息群发" is-link @click="toSiteChat" />
    <van-cell title="图文消息群发" is-link @click="toImageTextChat" />
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
    toServiceChat() {
      this.$router.push('/mySiteManage/user/chatManage/serviceChat')
    },
    toSiteChat() {
      this.$router.push('/mySiteManage/user/chatManage/siteChat')
    },
    toImageTextChat() {
      this.$router.push('/mySiteManage/user/chatManage/imageTextChat')
    }
  }
}
</script>
<style lang="less" scoped>
.van-cell__title {
  font-size: 0.9rem;
}
</style>