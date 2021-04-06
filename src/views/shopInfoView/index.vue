<template>
  <div>
    <shop-info
      :is-cart-list="isCartList"
      :cart-list="cartList"
      :cart-item="cartItem"
      :get-food-total-price="getFoodTotalPrice"
      :handle-food-num="handleFoodNum"
      @cartSubmit="cartSubmit"
      @showCart="showCart"
      @deleteFood="deleteFood"
      @clearCart="clearCart"
      @handleAdd="handleAdd"
      @shopNumChange="shopNumChange"
    />
  </div>
</template>
<script>
import ShopInfo from '@/components/common/ShopInfo.vue'

export default {
  components: {
    ShopInfo
  },
  computed: {
    // 获取单个商品数量
    handleFoodNum() {
      let $total = 0
      const cartList = this.cartList
      $total = cartList.reduce(
        (total, currentValue, currentIndex, cartList) => {
          return currentValue['num'] ? total + currentValue['num'] : total
        },
        0
      )
      return $total
    },
    // 获取商品总数
    getFoodTotalPrice() {
      let $total = 0
      const cartList = this.cartList
      $total = cartList.reduce(
        (total, currentValue, currentIndex, cartList) => {
          return currentValue['num']
            ? total + currentValue['num'] * currentValue['sellPrice']
            : total
        },
        0
      )
      return $total
    }
  },
  data() {
    return {
      isCartList: false,
      cartList: JSON.parse(window.sessionStorage.getItem('cartList'))
        ? JSON.parse(window.sessionStorage.getItem('cartList'))
        : [],
      // cartList: this.$store.getters.shopItem,
      cartItem: JSON.parse(window.sessionStorage.getItem('snackShopInfoItem'))
    }
  },
  created() {},
  methods: {
    // 处理添加商品
    handleAdd() {
      const addItem = this.cartItem
      // 判断商品是否存在
      const isFood = this.cartList.some(item => {
        return addItem.title === item.title
      })
      // 处理商品已经存在
      if (isFood) {
        const foodIndex = this.cartList.findIndex(item => {
          return addItem.title === item.title
        })
        this.cartList[foodIndex].num++
      } else {
        this.cartList.push(addItem)
      }
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 购物车提交
    cartSubmit() {
      this.$router.push('/shoppingOrderView')
    },
    showCart() {
      this.isCartList = !this.isCartList
    },
    // 删除单个商品
    deleteFood(item) {
      const index = this.cartList.findIndex(i => {
        return item.id === i.id
      })
      this.cartList.splice(index, 1)
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 清空购物车
    clearCart() {
      this.cartList = []
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 商品数量该表更新数据
    shopNumChange() {
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
