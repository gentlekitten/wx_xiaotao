<template>
  <div ref="obtain">
    <div class="back_top" v-if="isShowBackImg">
      <img class="back_top_img" src="@/assets/img/backTop.jpg" @click="backTop" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showDistance: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isShowBackImg: false,
      topDistance: 0
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
        this.topDistance =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        if (this.topDistance > this.showDistance) {
          this.isShowBackImg = true
        } else {
          this.isShowBackImg = false
        }
      }, 200)
      // 消除定时器
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },
    //
    backTop() {
      let timer = null,
        _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.topDistance > 0) {
          _that.topDistance -= 250
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.topDistance
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.isShowBackImg = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.back_top {
  width: 2.5rem;
  height: 2.5rem;
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  .back_top_img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
