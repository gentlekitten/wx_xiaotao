<template>
  <div class="shopping">
    <div class="shopping_item">
      <div class="top">
        <div class="left" @click="toShopDetails(item)">
          <img :src="imgBaseUrl + item.shopOrderType.shopPic" />
          <div class="name">{{ item.shopOrderType.shopName }}</div>
          <van-icon name="arrow" size="1rem" color="#999" />
        </div>
        <!-- 0失败1成功2未支付 -->
        <div v-if="item.shopOrderType.payState === 1" class="right">
          交易成功
        </div>
        <div v-else-if="item.shopOrderType.payState === 0" class="right">
          支付失败
        </div>
        <div v-else class="right">未支付</div>
      </div>
      <div
        v-for="child in item.shopOrderType.shopOrderProductVo"
        :key="child.productLogoAddress + item.shopId"
        class="content"
        @click="toOrderDetails(item.shopOrderType.cOrderSn)"
      >
        <div class="img_warp">
          <img class="img" :src="imgBaseUrl + child.productLogoAddress" />
        </div>
        <div class="content_top_warp">
          <div class="content_top">
            <div class="name">
              {{ child.productName }}
            </div>
          </div>
          <div class="price_num">
            <div class="price">￥{{ child.sellPrice }}</div>
            <div class="num">×{{ child.productCnt }}</div>
          </div>
          <div v-if="[2, 3].indexOf(item.orderType) > -1" class="shop_type">
            {{ child.shopType }}
          </div>
        </div>
      </div>
      <div class="price_warp">
        <span>总价：￥{{ item.shopOrderType.orderMoney }}</span>
        <div class="price">
          实际付款：￥{{ item.shopOrderType.paymentMoney }}
        </div>
      </div>
    </div>
    <div class="btn_warp">
      <van-button
        class="btn"
        round
        @click="deleteOrder(item.shopOrderType.cOrderSn)"
        >删除订单</van-button
      >
      <!-- 0不能取消 1能取消 -->
      <van-button v-if="item.shopOrderType.canCancel === 1" class="btn" round
        >取消订单</van-button
      >
      <van-button
        v-if="item.shopOrderType.payState === 2"
        class="btn red"
        round
        @click="toPayment(item.shopOrderType.cOrderSn)"
        >去支付</van-button
      >
      <!-- sRefund 0不可退款  1可退 -->
      <van-button
        v-if="item.shopOrderType.sRefund === 1"
        class="btn red"
        round
        @click.stop="toRefundView"
        >退款</van-button
      >
      <!-- 1可评论 0不可评论 -->
      <van-button
        v-if="item.shopOrderType.hasComment === 1"
        class="btn red"
        round
        @click.stop="toEvaluateView"
        >评价</van-button
      >
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
  },
  data() {
    return {}
  },
  methods: {
    toShopDetails(item) {
      this.$emit('toShopDetails', item)
    },
    toOrderDetails(cOrderSn) {
      this.$emit('toOrderDetails', cOrderSn)
    },
    deleteOrder(cOrderSn) {
      this.$emit('deleteOrder', cOrderSn)
    },
    toPayment(cOrderSn) {
      this.$emit('toPayment', cOrderSn)
    },
    toRefundView() {
      this.$emit('toRefundView')
    },
    toEvaluateView() {
      this.$emit('toEvaluateView')
    },
  },
}
</script>
<style lang="less" scoped>
.shopping {
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: 1px solid #f7f7f7;
  margin-bottom: 1rem;
  .shopping_item {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          margin-right: 1rem;
        }
        .name {
          margin-right: 0.5rem;
        }
      }
      .right {
        color: #ff623e;
      }
    }
    .content {
      display: flex;
      margin: 1rem 0;
      .img_warp {
        flex: 2;
        .img {
          width: 7rem;
          height: 7rem;
          border-radius: 0.5rem;
          margin-right: 1rem;
        }
      }
      .content_top_warp {
        flex: 5;
        .content_top {
          display: flex;
          .name {
            line-height: 1.5rem;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .price_num {
          display: flex;
          margin: 0.5rem 0;
          align-items: center;
          .num {
            color: #999;
            margin-left: 0.5rem;
          }
        }
      }
      .shop_type {
        color: #999;
        font-size: 0.8rem;
      }
    }
    .price_warp {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0.5rem;
      align-items: center;
      span {
        color: #999;
        margin-right: 1rem;
      }
    }
  }
  .btn_warp {
    display: flex;
    justify-content: space-around;
    .btn {
      font-size: 0.8rem;
      width: 6rem;
      height: 2rem;
      margin-top: 1rem;
    }
  }
}
</style>