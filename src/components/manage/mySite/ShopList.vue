<template>
  <div class="shop_list">
    <div class="type" v-if="item.shopCategoryId === 1">零食铺</div>
    <div class="type" v-else-if="item.shopCategoryId === 2 || item.shopCategoryId === 3">商城</div>
    <div class="type" v-if="item.shopCategoryId === 4">外卖店铺</div>
    <div v-if="item.state === 1" class="status">已同意</div>
    <div v-else-if="item.state === 2" class="status red">未处理</div>
    <div v-else class="status gray">已拒绝</div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.shop_list {
  padding: 1rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .type {
    font-weight: 900;
  }
  .status {
    color: cadetblue;
    font-size: 0.8rem;
    transform: rotate(10deg);
  }
  .red {
    color: @priceColor;
  }
  .gray {
    color: #999;
  }
}
</style>
