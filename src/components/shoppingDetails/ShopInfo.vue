<template>
  <div class="shop_info">
    <div class="top">
      <div class="warp">
        <div class="price">￥{{ item.sellPrice }}</div>
        <div class="post_price">
          邮费：{{
            shopOrders.deliveryFee
              ? shopOrders.deliveryFee
              : item.postage
              ? item.postage
              : 0
          }}
        </div>
      </div>
      <!-- <div v-if="item.oldPrice" class="old_price">价格：￥{{ item.oldPrice }}</div> -->
      <div class="buy_num">已售&nbsp;{{ item.sale }}</div>
      <i
        v-if="type !== 3"
        class="colllect iconfont"
        :class="[isCollect ? 'icon-shoucang1' : 'icon-shoucang']"
        @click="collectShop"
      />
    </div>
    <div v-if="type === 3" class="buy_price">
      购买时价格:
      <span class="price">￥{{ item.originalPrice }}</span>
    </div>
    <div v-else class="old_price">￥{{ item.originalPrice }}</div>
    <div class="title">{{ item.productName }}</div>
    <div class="lable">{{ item.productDesc }}</div>
    <div v-if="type === 3" class="time">使用时间:{{ item.usageTime }}天</div>
    <div v-if="item.sRefund === 0 || item.sRefund" class="time">
      {{ item.sRefund === 0 ? '不支持' : '支持' }}七天内退款
    </div>
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
      },
    },
    shopOrders: {
      type: Object,
      default: () => {
        return {}
      },
    },
    isCollect: {
      type: Boolean,
      default: false,
    },
    // 类别0是商城，1是数码，2是美妆，3是二手市场
    type: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  methods: {
    collectShop() {
      this.$emit('collectShop')
    },
  },
}
</script>
<style lang="less" scoped>
.shop_info {
  padding: 1rem;
  background-color: #fff;
  .price {
    flex: 1;
    color: @priceColor;
    font-size: 1rem;
    font-weight: 900;
  }
  .buy_price {
    font-size: 0.8rem;
    color: #999;
  }
  .top {
    display: flex;
    align-items: center;
    font-size: 0.78rem;
    position: relative;
    .warp {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .post_price {
        position: absolute;
        right: 0;
        top: 3rem;
        font-size: 0.8rem;
        color: #999;
      }
    }
    .buy_num {
      margin-left: 1rem;
      flex: 2;
      color: #999;
    }
    .colllect {
      // flex: 1;
      text-align: right;
      margin-left: 1rem;
    }
  }
  .old_price {
    margin-top: 0.2rem;
    font-size: 0.8rem;
    flex: 5;
    color: #999;
    text-decoration: line-through;
  }
  .title {
    font-weight: 900;
    margin-top: 0.4rem;
    letter-spacing: 1px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .lable {
    color: #999;
    font-size: 0.75rem;
    margin: 0.2rem 0;
  }
  .time {
    color: #999;
    font-size: 0.8rem;
  }
}
</style>
