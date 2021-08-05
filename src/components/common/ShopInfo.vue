<template>
  <div>
    <nav-bar :isArrow="true" :isBackUp="true" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item>
        <img class="image" v-lazy="'https://jixi.mynatapp.cc/'+cartItem.logoAddress" />
      </van-swipe-item>
    </van-swipe>
    <div
      class="shop_name"
    >{{ cartItem.productName +(cartItem.productInfoSpecifications.length > 0 ? cartItem.productInfoSpecifications[index].specificationName : '') }}</div>
    <div class="shop_info">
      <div class="shop_info_item">
        <div
          class="price"
        >￥{{ cartItem.sellPrice + (cartItem.productInfoSpecifications.length > 0 ? cartItem.productInfoSpecifications[index].price : 0) }}</div>
        <div class="num">销量：{{ cartItem.sale}}</div>
      </div>
      <van-button type="primary" class="add_shop" @click="handleAdd">来一份</van-button>
    </div>
    <template v-if="Object.keys(cartList).length > 0">
      <!-- 购物车 -->
      <food-cart
        :cart-list="cartList"
        :is-cart-list="isCartList"
        :get-food-total-price="getFoodTotalPrice"
        :handle-food-num="handleFoodNum"
        @showCart="showCart"
        @clearCart="clearCart"
        @deleteFood="deleteFood"
        @submit="cartSubmit"
        @shopNumChange="shopNumChange"
      />
    </template>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'
import FoodCart from '@/components/common/FoodCart.vue'

export default {
  components: {
    NavBar,
    FoodCart
  },
  props: {
    // 規格id
    d: {
      type: Number,
      default: 0
    },
    isCartList: {
      type: Boolean,
      default: false
    },
    cartList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cartItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getFoodTotalPrice: {
      type: Number,
      default: 0
    },
    handleFoodNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 选择商品的规格索引
      index: 0
    }
  },
  created() {
    this.index = this.cartItem.productInfoSpecifications.findIndex(e => {
      return this.d === e.id
    })
  },
  methods: {
    // 购物车提交
    cartSubmit(foodTotalPrice) {
      this.$emit('cartSubmit', foodTotalPrice)
    },
    showCart() {
      this.$emit('showCart')
    },
    // 删除单个商品
    deleteFood(item) {
      this.$emit('deleteFood', item)
    },
    // 清空购物车
    clearCart() {
      this.$emit('clearCart')
    },
    // 商品数量该表更新数据
    shopNumChange() {
      this.$emit('shopNumChange')
    },
    handleAdd() {
      this.$emit('handleAdd')
    }
  }
}
</script>
<style lang="less" scoped>
.shop_name {
  padding: 1rem 0 0 1rem;
  font-weight: 900;
}
.shop_info {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  .shop_info_item {
    display: flex;
    .price {
      color: red;
      font-size: 1rem;
    }
    .num {
      color: #ccc;
      font-size: 0.8rem;
      margin: 0.15rem 1rem;
    }
  }
  .add_shop {
    width: 5rem;
    height: 2rem;
    font-size: 0.8rem;
  }
}
.image {
  width: 100%;
  height: 15rem;
}
</style>
