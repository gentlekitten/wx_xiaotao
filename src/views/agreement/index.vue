<template>
  <div class="home">
    <!-- 顶部返回 -->
    <nav-bar :title="title" is-arrow isBackUp />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      title: '',
    }
  },
  created() {
    const type = Number(this.$route.query.type)
    // 0领跑者协议 1兼职协议
    this.title = type === 0 ? '领跑者协议' : '兼职协议'
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.home {
  padding: 1rem;
}
</style>