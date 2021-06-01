<template>
  <div>
    <div class="item" v-for="item in orderList" :key="item.orderMasterId">
      <img :src="'https://jixi.mynatapp.cc/'+item.productLogoAddress" alt="该商品已删除" />
      <div class="content">
        <div class="name">{{ item.productName }}</div>
        <div class="price">
          实际付款
          <span>￥{{ item.payMoney }}</span>
        </div>
      </div>
      <div v-if="item.payState === 1" class="status">入账</div>
      <div v-else-if="item.payState === 2" class="status red">未入账</div>
      <div v-else-if="item.payState === 0" class="status red">撤销</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    orderList: {
      type: Array,
      default: () => {
        return []
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
.item {
  display: flex;
  align-items: center;
  line-height: 1.8rem;
  position: relative;
  margin: 1rem 0;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }
  .name {
    line-height: 1.5rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .price {
    font-size: 0.9rem;
    color: #999;
    span {
      color: @priceColor;
      font-weight: 900;
    }
  }
  .status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: cadetblue;
    font-size: 0.9rem;
    transform: rotate(10deg);
  }
  .red {
    color: @priceColor;
  }
}
</style>