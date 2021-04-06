<template>
  <div ref="obtain">
    <self-nav-bar :class="[isLucency ? 'nav_bar_bglucency' : 'nav_bar_bg']">
      <template v-slot:left>
        <van-icon :class="[isLucency ? 'icon' : '']" name="arrow-left" size="1.5rem" />
      </template>
      <template v-slot:center>
        <van-tabs
          class="tabs"
          v-model="tabsActive"
          title-active-color="#ed152d"
          background="rgba(0, 0, 0, 0)"
          @click="tabClick"
        >
          <van-tab title="商品"></van-tab>
          <van-tab title="评价"></van-tab>
        </van-tabs>
      </template>
      <template v-slot:right>
        <van-icon
          class="right_icon"
          :class="[isLucency ? 'icon' : '']"
          name="search"
          size="1.5rem"
          @click="toSearch"
        />
        <van-icon
          class="right_icon"
          :class="[isLucency ? 'icon' : '']"
          name="comment-o"
          size="1.5rem"
          @click="toChat"
        />
        <van-icon
          class="right_icon"
          :class="[isLucency ? 'icon' : '']"
          name="share-o"
          size="1.5rem"
          @click="toShare"
        />
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
    }
  },
  data() {
    return {
      // 面到顶部距离
      topDistance: 0,
      // 顶部导航是否透明
      isLucency: true,
      searchIsShow: false,
      tabsActive: Number(window.sessionStorage.getItem('shoppingShopTabIndex'))
        ? Number(window.sessionStorage.getItem('shoppingShopTabIndex'))
        : 0
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
      this.$emit('toSearch')
    },
    toShare() {
      this.$emit('toShare')
    },
    toChat() {
      this.$emit('toChat')
    },
    tabClick(index) {
      window.sessionStorage.setItem('shoppingShopTabIndex', index)
      this.$emit('tabClick', index)
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
.right_icon {
  margin-right: 0.5rem;
}
.icon {
  width: 2rem;
  height: 2rem;
  background-color: #888888;
  opacity: 0.8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabs {
  height: 2.6rem;
  width: 60%;
  margin-left: -3rem;
}
</style>
