<template>
  <div class="top">
    <!-- 定位区域 -->
    <div class="location" @click="toGetLocation">
      <van-icon name="location-o" size="1.5rem" />
      <span>{{ siteInfo.siteName }}</span>
    </div>
    <van-search
      class="search"
      placeholder="搜索"
      background="#f2af49"
      shape="round"
      readonly
      @focus="toSearch"
    ></van-search>
  </div>
</template>
<script>
export default {
  props: {
    siteInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    toSearch() {
      this.$emit('toSearch')
    },
    toGetLocation() {
      this.$emit('toGetLocation')
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  display: flex;
  height: 3rem;
  background-color: @themeColor;
  .van-cell {
    height: 2rem;
  }
}
.location {
  width: 60%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
  margin-left: 1rem;
}
.search {
  margin-right: 1rem;
}
</style>
