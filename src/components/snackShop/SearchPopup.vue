<template>
  <van-cell-group class="search_input">
    <van-field v-model="shopSearchValue" clearable autofocus placeholder="按商品名搜索" />
    <van-button class="btn" type="primary" @click="clickShopSearch">搜索</van-button>
  </van-cell-group>
</template>
<script>
export default {
  data() {
    return {
      shopSearchValue: ''
    }
  },
  methods: {
    clickShopSearch() {
      this.$emit('clickShopSearch', this.shopSearchValue)
      this.shopSearchValue = ''
    }
  }
}
</script>
<style lang="less" scoped>
.search_input {
  box-sizing: border-box;
  padding: 0 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
