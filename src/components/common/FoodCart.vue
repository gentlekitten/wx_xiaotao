<template>
  <div>
    <div class="cart animated fadeIn">
      <van-submit-bar
        :price="getFoodTotalPrice * 100"
        :button-text="buttomText"
        :disabled="disabled"
        @submit="submit"
      >
        <div class="submit_item" @click="showCart">
          <van-icon
            class="icon"
            name="shopping-cart"
            color="#fff"
            size="1.8rem"
          />
          <div class="shop_num">
            {{ cartList.shopList.length }}样{{ handleFoodNum }}份
          </div>
        </div>
      </van-submit-bar>
    </div>
    <!-- 底部购物车详细列表 -->
    <template v-if="isCartList">
      <div class="shop_cart_info animated fadeIn">
        <div class="top">
          <span class="left">所选商品</span>
          <span class="left" @click="clearCart">清空</span>
        </div>
        <div
          class="shop_list"
          v-for="(item, index) in cartList.shopList"
          :key="item + index"
        >
          <div class="title">
            {{
              item.productName +
              (item.productInfoSpecifications.length > 0
                ? item.productInfoSpecifications[0].specificationName
                : '')
            }}
          </div>
          <van-stepper
            class="stepper"
            v-model="item.num"
            theme="round"
            allow-empty
            button-size="22"
            disable-input
            @change="shopNumChange"
          />
          <div class="price">
            ￥{{
              Math.round(
                (item.sellPrice +
                  (item.productInfoSpecifications.length > 0
                    ? item.productInfoSpecifications[0].price
                    : 0)) *
                  item.num *
                  1000
              ) / 1000
            }}
          </div>
          <div class="drop_bt">
            <van-button
              class="btn"
              type="warning"
              size="small"
              @click="deleteFood(item)"
              >删除</van-button
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import formatTime from '@/assets/js/time.js'

export default {
  props: {
    // 商品列表
    cartList: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 获取商品总价格
    getFoodTotalPrice: {
      type: Number,
      default: 0,
    },
    // 获取单个商品数量
    handleFoodNum: {
      type: Number,
      default: 0,
    },
    // 是否显示购物车列表
    isCartList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttomText: '提交订单',
      // 提交按钮是否可点击
      disabled: false,
      // 是否营业
      isState: false,
      // 店铺信息
      shopInfoObj: JSON.parse(window.sessionStorage.getItem('shopInfoObj'))
        ? JSON.parse(window.sessionStorage.getItem('shopInfoObj'))
        : {},
    }
  },
  watch: {
    getFoodTotalPrice: {
      immediate: true,
      handler() {
        if (this.isState) {
          this.getLowPrice()
        }
      },
    },
  },
  created() {
    this.initCart()
  },
  methods: {
    // 初始化购物车
    initCart() {
      // 这里主要是看店铺是否在营业中，先看商家自己选择的状态，再看商家设置的营业时间段
      if (this.shopInfoObj.shopState || this.shopInfoObj.shopState === 0) {
        const state = this.shopInfoObj.shopState
        // 0打烊 1营业 2停业
        if (state !== 1) {
          this.buttomText = state === 0 ? '打烊中' : '停业中'
          this.disabled = true
          return false
        }
        // 如果商家的店铺是营业还要看商家自己设置的时间段是否在营业中
        // 获取当前时间年月日
        // const toDay = formatTime.gettime.formatTime1
        // const startTime = this.shopInfoObj.startTime + ' ' + toDay
        // const endTime = this.shopInfoObj.endTime + ' ' + toDay
        // // 比较营业时间和当前时间 return false; //第一个大 反之
        // const isStartTime = formatTime.gettime.compareDateForToday(startTime)
        // const isEndTime = formatTime.gettime.compareDateForToday(endTime)
        // // 满足开始时间小于等于当前时间并且结束时间大于等于当前时间
        // if (isStartTime && !isEndTime) {
        //   this.buttomText = '打烊中'
        //   this.disabled = true
        //   return false
        // }
        // 设置是否营业为true
        this.isState = true
        this.getLowPrice()
      }
    },
    // 获取起送价
    getLowPrice() {
      const lowPrice = this.shopInfoObj.lowPrice
        ? Number(this.shopInfoObj.lowPrice)
        : 0
      if (this.getFoodTotalPrice < lowPrice) {
        this.disabled = true
        this.buttomText = lowPrice + '元起送'
      } else {
        this.disabled = false
        this.buttomText = '提交订单'
      }
    },
    // 显示购物车
    showCart() {
      this.$emit('showCart')
    },
    // 清空购物车
    clearCart() {
      this.$emit('clearCart')
    },
    // 提交订单
    submit() {
      this.$emit('submit', this.getFoodTotalPrice)
    },
    // 删除商品
    deleteFood(item) {
      this.$emit('deleteFood', item)
    },
    shopNumChange() {
      this.$emit('shopNumChange')
    },
  },
}
</script>
<style lang="less" scoped>
.cart {
  position: fixed;
  bottom: 1rem;
  .submit_item {
    display: flex;
    height: 100%;
    align-items: center;
    .icon {
      margin-right: 1rem;
    }
    .shop_num {
      color: #ccc;
    }
  }
}
.van-submit-bar {
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.6);
  height: 3rem;
}
.van-submit-bar__price {
  font-weight: 900;
}
.van-submit-bar__text {
  color: #fff;
}
.van-button {
  width: 8rem;
  height: 2rem;
}
.shop_cart_info {
  width: 100%;
  box-sizing: border-box;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 3rem;
  color: #fff;
  padding: 1rem 0.8rem;
  .top {
    display: flex;
    height: 20%;
    justify-content: space-between;
    align-items: center;
    border: 0;
  }
  .shop_list {
    display: flex;
    margin-top: 2rem;
    .title {
      flex: 2;
    }
    .stepper {
      flex: 2;
    }
    .price {
      color: #fff;
      flex: 2;
    }
    .drop_bt {
      flex: 1;
      .btn {
        width: 3rem !important;
        height: 1.5rem !important;
      }
    }
  }
}
::v-deep .van-stepper__input {
  color: #fff;
}
</style>
