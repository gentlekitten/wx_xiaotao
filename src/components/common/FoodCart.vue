<template>
  <div>
    <div class="cart animated fadeIn">
      <van-submit-bar :price="getFoodTotalPrice * 100" button-text="提交订单" @submit="submit">
        <div class="submit_item" @click="showCart">
          <van-icon class="icon" name="shopping-cart" color="#fff" size="1.8rem" />
          <div class="shop_num">{{ cartList.length }}样{{ handleFoodNum }}份</div>
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
        <div class="shop_list" v-for="(item, index) in cartList" :key="index">
          <div class="title">{{ item.productName }}</div>
          <van-stepper
            class="stepper"
            v-model="item.num"
            theme="round"
            allow-empty
            button-size="22"
            disable-input
            @change="shopNumChange"
          />
          <div class="price">￥{{ item.sellPrice * item.num }}</div>
          <div class="drop_bt">
            <van-button class="btn" type="warning" size="small" @click="deleteFood(item)">删除</van-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    // 商品列表
    cartList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 获取商品总数量
    getFoodTotalPrice: {
      type: Number,
      default: 0
    },
    // 获取单个商品数量
    handleFoodNum: {
      type: Number,
      default: 0
    },
    // 是否显示购物车列表
    isCartList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
      this.$emit('submit')
    },
    // 删除商品
    deleteFood(item) {
      this.$emit('deleteFood', item)
    },
    shopNumChange() {
      this.$emit('shopNumChange')
    }
  }
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
