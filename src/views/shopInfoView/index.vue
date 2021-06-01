<template>
  <div>
    <shop-info
      :d="d"
      :is-cart-list="isCartList"
      :cart-list="cartList"
      :cart-item="cartItem"
      :get-food-total-price="getFoodTotalPrice"
      :handle-food-num="handleFoodNum"
      :shop-info-obj="shopInfoObj"
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
// import commonJs from '@/assets/js/common.js'

import { getData } from '@/api/api.js'

import ShopInfo from '@/components/common/ShopInfo.vue'

export default {
  components: {
    ShopInfo
  },
  data() {
    return {
      // 规格id
      d: this.$route.query.d ? Number(this.$route.query.d) : 0,
      shopInfoObj: {},
      isCartList: false,
      cartList: JSON.parse(window.sessionStorage.getItem('cartList'))
        ? JSON.parse(window.sessionStorage.getItem('cartList'))
        : {},
      cartItem: JSON.parse(window.sessionStorage.getItem('snackShopInfoItem'))
    }
  },
  computed: {
    // 获取商品总数量
    handleFoodNum() {
      let $total = 0
      const cartList = this.cartList
      let shopList = cartList.shopList ? cartList.shopList : []
      $total = shopList.reduce(
        (total, currentValue, currentIndex, shopList) => {
          return currentValue['num'] ? total + currentValue['num'] : total
        },
        0
      )
      return $total
    },
    // 计算总价格
    getFoodTotalPrice() {
      let $total = 0
      // const priceList = []
      const cartList = this.cartList
      let shopList = cartList.shopList ? cartList.shopList : []
      $total = shopList.reduce(
        (total, currentValue, currentIndex, shopList) => {
          return currentValue['num']
            ? total + currentValue['num'] * currentValue['sellPrice']
            : total
        },
        0
      )
      console.log(shopList)
      // shopList.forEach(e => {
      //   priceList.push(e.num * e.sellPrice)
      // })
      // $total = commonJs.addItem(priceList)

      if (shopList.length > 0) {
        shopList.forEach(e => {
          if (e.productInfoSpecifications.length > 0) {
            $total += e.productInfoSpecifications[0].price
          }
        })
      }
      if (this.shopInfoObj.shopDiscount) {
        if ($total >= this.shopInfoObj.shopDiscount.requirePrice) {
          $total -= this.shopInfoObj.shopDiscount.discountPrice
        }
      }
      return $total
    }
  },
  created() {
    const shopId = this.$route.query.shopId ? this.$route.query.shopId : 0
    this.getShopInfo(shopId)
  },
  methods: {
    // 获取店铺信息
    async getShopInfo(shopId) {
      const res = await getData(
        '/site/snack/shop/info',
        { shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理添加商品
    handleAdd() {
      const addItem = this.cartItem
      const d = this.d
      let isFood = false
      let addObj = {}
      if (!this.cartList.id) {
        this.cartList = {
          id: this.shopInfoObj.shopId,
          shopOrders: this.shopInfoObj.shopOrder,
          shopPic: this.shopInfoObj.shopPic,
          shopName: this.shopInfoObj.shopName,
          shopList: []
        }
      }
      if (d) {
        this.cartList.shopList.forEach(e => {
          if (e.id === addItem.id) {
            isFood = e.productInfoSpecifications.some(item => {
              return d === item.id
            })
            if (isFood) {
              return
            }
          }
        })
      } else {
        isFood = this.cartList.shopList.some(item => {
          return addItem.id === item.id
        })
      }
      // 处理商品已经存在
      if (isFood) {
        let foodIndex = 0
        if (d) {
          foodIndex = this.cartList.shopList.findIndex(item => {
            return item.productInfoSpecifications[0].id === d
          })
        } else {
          foodIndex = this.cartList.shopList.findIndex(item => {
            return addItem.id === item.id
          })
        }
        this.cartList.shopList[foodIndex].num++
      } else {
        addObj = this._.cloneDeep(addItem)
        if (d) {
          // 处理规格 d是选中的规格的id
          let productInfoSpecifications = []
          productInfoSpecifications = addObj.productInfoSpecifications.filter(
            e => {
              return e.id === d
            }
          )
          addObj.productInfoSpecifications = productInfoSpecifications
        }
        this.cartList.shopList.push(addObj)
      }
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 购物车提交
    cartSubmit(foodTotalPrice) {
      this.cartList.totalPrice = foodTotalPrice
      window.sessionStorage.setItem(
        'shopCartList',
        JSON.stringify(this.cartList)
      )
      // form 0外卖 1 商城
      this.$router.push('/shoppingOrderView?form=0')
    },
    showCart() {
      this.isCartList = !this.isCartList
    },
    // 删除单个商品
    deleteFood(item) {
      // 删除商品的索引
      let foodIndex = 0
      // 判断有无规格
      if (item.productInfoSpecifications.length > 0) {
        foodIndex = this.cartList.shopList.findIndex(e => {
          return (
            e.productInfoSpecifications[0].id ===
            item.productInfoSpecifications[0].id
          )
        })
      } else {
        foodIndex = this.cartList.shopList.findIndex(i => {
          return item.id === i.id
        })
      }
      this.cartList.shopList.splice(foodIndex, 1)
      if (this.cartList.shopList.length <= 0) {
        this.cartList = {}
      }
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 清空购物车
    clearCart() {
      this.cartList = {}
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
