<template>
  <div ref="obtain">
    <self-nav-bar :class="[isLucency ? 'nav_bar_bglucency' : 'nav_bar_bg']" :backTo="backTo">
      <template v-slot:left>
        <van-icon name="arrow-left" size="1rem" />
      </template>
      <template v-slot:right>
        <van-icon class="icon" name="search" size="1.5rem" @click="toSearch" />
        <van-icon class="icon" name="phone-o" size="1.5rem" @click="toPhone" />
        <van-icon class="icon" name="share-o" size="1.5rem" @click="toShare" />
      </template>
    </self-nav-bar>
  </div>
</template>
<script>
import SelfNavBar from '@/components/common/SelfNavBar.vue'

export default {
  components: {
    SelfNavBar
  },
  props: {
    backTop: {
      type: String,
      default: ''
    },
    backTo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 面到顶部距离
      topDistance: 0,
      // 顶部导航是否透明
      isLucency: true,
      searchIsShow: false
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  mounted() {
    // 获取页面到顶部距离
    this.getTopDistance()
  },
  methods: {
    getTopDistance() {
      const timer = setInterval(() => {
        this.topDistance = this.$refs.obtain.getBoundingClientRect().top
        if (this.topDistance < 0) {
          this.isLucency = false
        } else {
          this.isLucency = true
        }
      }, 200)
      // 消除定时器
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },
    toSearch() {
      this.searchIsShow = true
      this.$emit('toSearch', this.searchIsShow)
    },
    toPhone() {
      this.$emit('toPhone')
    },
    toShare() {
      this.$emit('toShare')
    }
  }
}
</script>
<style lang="less" scoped>
.nav_bar_bg {
  background-color: @themeColor;
}
.nav_bar_bglucency {
  background-color: rgba(0, 0, 0, 0);
}
.icon {
  margin: 0 0.5rem;
}
</style>
