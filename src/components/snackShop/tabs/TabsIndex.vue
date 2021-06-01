<template>
  <div ref="obtain">
    <tabs
      class="tabs"
      :tab-list="tabList"
      :sticky="true"
      tabsIndexName="tabActiveShop"
      @clickTab="clickTab"
    >
      <template v-slot:tab0>
        <div class="contnet">
          <!-- 左侧侧边栏 -->
          <sidebar class="left" :sidebar-list="sidebarList" @sidebarChange="sidebarChange" />
          <!-- 右侧商品列表 -->
          <food-list
            class="right"
            :shop-id="shopId"
            :shop-list="shopList"
            :dropdown-obj="dropdownObj"
            @handleAdd="handleAdd"
          />
          <!-- 下拉选择框 -->
          <!-- <div class="dropdown">
            <dropdown-menu :dropdown-list="dropdownList" @dropdownChange="dropdownChange" />
          </div>-->
        </div>
      </template>
      <template v-slot:tab1>
        <div class="evaluate">
          <!-- 顶部评价分数 -->
          <evaluate :evaluate-info-list="evaluateInfoList" />
          <!-- 用户评价 -->
          <template v-if="false">
            <van-empty description="该用户暂无评价" />
          </template>
          <!-- 用户评论 -->
          <template>
            <user-comment :comment-list="commentList" @clickCommnetImg="clickCommnetImg" />
          </template>
        </div>
      </template>
      <template v-slot:tab2>
        <merchant-shop-info :shop-info-obj="shopInfoObj" @clickImg="clickImg" />
      </template>
    </tabs>
    <template v-if="tabIndex === 0 && Object.keys(cartList).length > 0">
      <!-- 底部购物车 -->
      <food-cart
        :cart-list="cartList"
        :is-cart-list="isCartList"
        :get-food-total-price="getFoodTotalPrice"
        :shop-info-obj="shopInfoObj"
        :handle-food-num="handleFoodNum"
        @showCart="showCart"
        @clearCart="clearCart"
        @deleteFood="deleteFood"
        @submit="cartSubmit"
        @shopNumChange="shopNumChange"
      />
    </template>
    <!-- 回到顶部 -->
    <back-top v-show="!isCartList && tabIndex === 0" />
  </div>
</template>
<script>
// import commonJs from '@/assets/js/common.js'

import BackTop from '@/components/common/BackTop.vue'
import FoodCart from '@/components/common/FoodCart.vue'
import DropdownMenu from '@/components/common/DropdownMenu.vue'
import Tabs from '@/components/common/TabIsDifferent.vue'

import FoodList from '@/components/snackShop/tabs/tab0/FoodList.vue'
import Sidebar from '@/components/snackShop/tabs/tab0/Sidebar.vue'

import Evaluate from '@/components/snackShop/tabs/tab1/Evaluate.vue'
import UserComment from '@/components/snackShop/tabs/tab1/UserComment.vue'
import MerchantShopInfo from '@/components/snackShop/tabs/tab2/MerchantShopInfo.vue'

export default {
  components: {
    Tabs,
    DropdownMenu,
    FoodList,
    Sidebar,
    BackTop,
    FoodCart,
    Evaluate,
    UserComment,
    MerchantShopInfo
  },
  props: {
    // tab index
    tabIndex: {
      type: Number,
      default: Number(window.sessionStorage.getItem('tabActiveShop'))
    },
    // 购物车列表
    cartList: {
      type: Object,
      default: () => {
        return JSON.parse(window.sessionStorage.getItem('cartList'))
          ? JSON.parse(window.sessionStorage.getItem('cartList'))
          : {}
      }
    },
    // 下拉选择框列表
    dropdownList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 下拉选择对象
    dropdownObj: {
      type: Object,
      default: () => {
        return { text: '全部商品', value: 0 }
      }
    },
    // tab list
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 侧边栏列表
    sidebarList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 商品列表
    shopList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 评价分数列表
    evaluateInfoList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 评论列表
    commentList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 店铺信息
    shopInfoObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    shopId: {
      type: Number,
      default: 0
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
      console.log(shopList)

      // shopList.forEach(e => {
      //   priceList.push(e.num * e.sellPrice)
      // })
      // $total = commonJs.addItem(priceList)
      $total = shopList.reduce(
        (total, currentValue, currentIndex, shopList) => {
          return currentValue['num']
            ? total + currentValue['num'] * currentValue['sellPrice']
            : total
        },
        0
      )
      if (shopList.length > 0) {
        shopList.forEach(e => {
          if (e.productInfoSpecifications.length > 0) {
            $total += e.productInfoSpecifications[0].price * e.num
          }
        })
      }
      // 判断有无商家优惠
      if (this.shopInfoObj.shopDiscount) {
        if ($total >= this.shopInfoObj.shopDiscount.requirePrice) {
          $total -= this.shopInfoObj.shopDiscount.discountPrice
        }
      }
      return $total
    }
  },
  data() {
    return {
      // 是否显示购物车列表
      isCartList: false
    }
  },
  methods: {
    // 处理添加商品
    handleAdd(addItem) {
      this.$emit('handleAdd', addItem)
    },
    // 购物车提交
    cartSubmit(foodTotalPrice) {
      this.$emit('cartSubmit', foodTotalPrice)
    },
    showCart() {
      this.isCartList = !this.isCartList
    },
    clickTab(index) {
      this.$emit('clickTab', index)
    },
    // 处理点击评论区图片
    clickCommnetImg(itemImgs, indexs) {
      this.$emit('clickCommnetImg', itemImgs, indexs)
    },
    // 清空购物车
    clearCart() {
      this.$emit('clearCart')
      this.isCartList = false
    },
    // 处理点击商家执照图片
    clickImg(imgUrl) {
      this.$emit('clickImg', imgUrl, 0)
    },
    // 删除单个商品
    deleteFood(item) {
      this.$emit('deleteFood', item)
      if (this.cartList.length === 0) {
        this.isCartList = false
      }
    },
    // 商品数量该表更新数据
    shopNumChange() {
      this.$emit('shopNumChange')
    },
    // 下拉选择
    dropdownChange(index) {
      this.$emit('dropdownChange', index)
    },
    sidebarChange(index) {
      this.$emit('sidebarChange', index)
    }
  }
}
</script>
<style lang="less" scoped>
.tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
.contnet {
  overflow: hidden;
  position: relative;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .left {
    width: 22%;
    height: 100%;
    float: left;
    overflow: auto;
    margin-bottom: 15rem;
  }
  .right {
    width: 78%;
    height: 100%;
    float: right;
    overflow: auto;
    background-color: #fff;
  }
  .dropdown {
    position: absolute;
    top: 0;
    right: 1rem;
  }
}
.evaluate {
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 0.8rem;
}
</style>
