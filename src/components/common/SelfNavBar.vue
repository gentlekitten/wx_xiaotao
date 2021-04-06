<template>
  <div class="nav_bar">
    <div class="left_icon" @click="toBack">
      <slot name="left"></slot>
    </div>
    <div class="center_text">
      <slot name="center"></slot>
    </div>
    <div class="right_icon">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // backurl
    backTo: {
      type: String,
      default: ''
    }
  },
  methods: {
    toBack() {
      if (this.backTo) {
        this.$router.push(this.backTo)
        return false
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.nav_bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 0;
  .left_icon {
    text-align: left;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center_text {
    text-align: center;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right_icon {
    text-align: right;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
