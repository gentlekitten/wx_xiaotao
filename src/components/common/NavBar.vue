<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :left-arrow="isArrow"
      fixed
      :placeholder="isPlaceholder"
      :border="isBorder"
      @click-left="back"
    >
      <template #right>
        <slot name="right_icon"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    // 返回的url
    backTo: {
      type: String,
      default: ''
    },
    // 是否返回上一级
    isBackUp: {
      type: Boolean,
      default: false
    },
    leftText: {
      type: String,
      default: ''
    },
    // 是否显示返回箭头
    isArrow: {
      type: Boolean,
      default: false
    },
    isPlaceholder: {
      type: Boolean,
      default: true
    },
    isBorder: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      if (this.isArrow && !this.isBackUp) {
        this.$router.push(this.backTo)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style scoped>
</style>
