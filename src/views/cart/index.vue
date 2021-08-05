<template>
  <div>
    <div class="top">
      <div class="left">
        <span>购物车</span>
        （{{ getCartNum }}）
      </div>
      <div v-if="!isClickAdmin" class="right" @click="clickAdminBtn">管理</div>
      <div v-else class="right" @click="clickAdminBtn">完成</div>
    </div>
    <div v-if="cartList.length > 0" class="shop_warp">
      <div
        class="shop_list"
        v-for="(item, index) in cartList"
        :key="index + item.id"
      >
        <div class="top_text">
          <van-checkbox
            class="checkbox"
            v-model="item.isCheck"
            checked-color="#f2af49"
            @click="clickShopCheckbox(item)"
          />
          <img :src="'https://jixi.mynatapp.cc/' + item.img" />
          <div class="text" @click="toShoppingShop(item.id)">
            {{ item.name }}
            <van-icon color="#999" name="arrow" size="1rem" />
          </div>
        </div>
        <div
          class="content"
          v-for="(c, index) in item.shopList"
          :key="c.id + index"
        >
          <van-checkbox
            class="checkbox"
            v-model="c.isCheck"
            checked-color="#f2af49"
            @click="clickGoodsCheckbox(item, c)"
          />
          <img
            :src="'https://jixi.mynatapp.cc/' + c.img"
            @click="toShoppingDetails(item, c)"
          />
          <div class="right_content">
            <div class="name" @click="toShoppingDetails(item, c)">
              {{ c.name }}
            </div>
            <div class="type" @click="clickSelectAttribute(item, c)">
              {{ c.shopType }}
              <van-icon class="icon" name="arrow-down" size="0.8rem" />
            </div>
            <div class="price_num">
              <div class="price">￥{{ c.price }}</div>
              <div class="num">×{{ c.num }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="你的购物车是空的哦~" />
    <!-- 底部提交 -->
    <template v-if="!isClickAdmin">
      <van-submit-bar
        :price="getChatTotalNum"
        button-text="结算"
        @submit="cartSubmit"
      >
        <van-checkbox v-model="allChecked" checked-color="#f2af49" />
      </van-submit-bar>
    </template>
    <!-- 底部删除 -->
    <template v-else>
      <div class="bottom_delete_bar">
        <van-checkbox v-model="allChecked" checked-color="#f2af49" />
        <van-button class="btn" round @click="deleteShop">删除</van-button>
      </div>
    </template>
    <!-- 商品规格弹出层 -->
    <van-sku
      v-model="shopSelectAttributeShow"
      ref="sku"
      :sku="sku"
      :goods="goods"
      :goods-id="skuObj.goodsId"
      :quota="skuObj.quota"
      :stock-threshold="skuObj.stockThreshold"
      :hide-stock="sku.hide_stock"
      :initial-sku="initialSku"
      @sku-selected="skuSelected"
      @stepper-change="stepperChange"
    >
      <template v-slot:sku-actions>
        <div class="warp">
          <van-button class="confirm_btn" round @click="updateShop"
            >确认</van-button
          >
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import commonJs from '@/assets/js/common.js'

import cartSku from '@/components/mixins/cartSku.js'

export default {
  name: 'Cart',
  components: {},
  mixins: [cartSku],
  data() {
    return {
      // 商品id
      id: 0,
      totalPrice: 0,
      allChecked: false,
      isClickAdmin: false,
      shopSelectAttributeShow: false,
      shopNum: 0,
      shopItem: {},
      childrenShopItem: {},
      cartList: [],
      discountPrice: 0,
    }
  },
  watch: {
    allChecked() {
      if (this.allChecked) {
        this.cartList.forEach((i) => {
          i.isCheck = true
          i.shopList.forEach((c) => {
            c.isCheck = true
          })
        })
        return false
      }
      this.cartList.forEach((i) => {
        i.isCheck = false
        i.shopList.forEach((c) => {
          c.isCheck = false
        })
      })
    },
  },
  computed: {
    // 获取选中商品总价格
    getChatTotalNum() {
      // 深拷贝
      let shopList = this._.cloneDeep(this.cartList)
      // 总价格
      let total = 0
      // 每个店铺的总价格
      let shopPrice = 0
      // 优惠的最低价格
      let requirePrice = 0
      // 优惠的减免价格
      let discountPrice = 0
      shopList.forEach((e) => {
        e.shopList = e.shopList.filter((c) => {
          return c.isCheck === true
        })
      })
      shopList.forEach((e) => {
        // 清除上个店铺的价格
        shopPrice = 0
        e.shopList.forEach((c) => {
          // 防止小数相加出问题
          shopPrice = commonJs.commonJs.accAdd(shopPrice, c.num * c.price)
        })
        // // 判断店铺是否优惠，
        if (e.shopList[0] && e.shopList[0].shopDiscount.requirePrice) {
          requirePrice = e.shopList[0].shopDiscount.requirePrice
          discountPrice = e.shopList[0].shopDiscount.discountPrice
          // 满足优惠最低价格减去优惠价格
          if (shopPrice >= requirePrice) {
            shopPrice = commonJs.commonJs.accSub(shopPrice, discountPrice)
            this.discountPrice = ommonJs.commonJs.accAdd(
              discountPrice,
              this.discountPrice
            )
          }
        }
        if (e.shopList.length > 0) {
          total = commonJs.commonJs.accAdd(shopPrice, total)
        }
      })
      this.totalPrice = total
      return total * 100
    },
    // 获取商品数量
    getCartNum() {
      let shopList = []
      let num = 0
      this.cartList.forEach((i) => {
        i.shopList.forEach((c) => {
          shopList.push(c)
        })
      })
      num = shopList.length
      return num
    },
  },
  created() {
    this.getCartList()
  },
  methods: {
    clickAdminBtn() {
      this.isClickAdmin = !this.isClickAdmin
    },
    // 删除商品
    async deleteShop() {
      // 勾选的id列表
      let idList = []
      const data = {
        orderCarts: [],
      }
      const isAllCheck = this.cartList.every((e) => {
        return e.isCheck === true
      })

      this.cartList.forEach((e) => {
        idList = e.shopList.filter((c) => {
          return c.isCheck === true
        })
      })
      idList.forEach((e) => {
        data.orderCarts.push({ id: e.id })
      })
      if (data.orderCarts.length <= 0) {
        return this.$toast.fail('请选择删除的商品！')
      }
      const res = await upData('/order/cart/delete', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.$router.go(0)
        return false
      }
      this.$handleCode.handleCode(res)
      // this.cartList = this.cartList.filter(i => {
      //   return i.isCheck !== true
      // })
      // this.cartList.forEach(i => {
      //   for (let c = 0; c < i.shopList.length; c++) {
      //     if (i.shopList[c].isCheck) {
      //       i.shopList.splice(c, 1)
      //     }
      //   }
      // })
    },
    // 获取购物车列表
    async getCartList() {
      const res = await getData('/order/cart/list', {}, { showLoading: true })
      console.log(res)
      if (res.code === '0') {
        res.data.forEach((e) => {
          const arr = {
            id: e.shopInfo.id,
            isCheck: false,
            img: e.shopInfo.shopPic,
            name: e.shopInfo.shopName,
            shopList: [],
          }
          const isShop = this.cartList.some((c) => {
            return c.id === e.shopInfo.id
          })
          if (!isShop) {
            this.cartList.push(arr)
          }
        })
        let shopType = ''
        let price = 0
        res.data.forEach((e) => {
          const index = this.cartList.findIndex((c) => {
            return c.id === e.shopInfo.id
          })
          // 是否有属性
          if (
            e.productInfo.productInfoProperties &&
            e.productInfo.productInfoProperties.length > 0
          ) {
            e.productInfo.productInfoProperties.forEach((c) => {
              shopType += c.productPropertyValues[0].propertyValue + ';'
            })
          }
          price = e.productInfo.sellPrice
          // 是否有规格
          if (
            e.productInfo.productInfoSpecifications &&
            e.productInfo.productInfoSpecifications.length > 0
          ) {
            shopType +=
              e.productInfo.productInfoSpecifications[0].specificationName
            price += e.productInfo.productInfoSpecifications[0].price
          }
          const arr = {
            id: e.id,
            productId: e.productId,
            isCheck: false,
            img: e.productInfo.logoAddress,
            name: e.productInfo.productName,
            shopType,
            price,
            rePrice: e.productInfo.sellPrice,
            deliveryFee: e.productInfo.deliveryFee,
            restriction: e.productInfo.restriction,
            inventory: e.productInfo.inventory,
            productInventory: e.productInfo.productInventory,
            num: e.productAmount,
            shopOrders: e.shopInfo.shopOrder ? e.shopInfo.shopOrder : '',
            productInfoProperties: e.productInfo.productInfoProperties,
            productInfoSpecifications: e.productInfo.productInfoSpecifications,
            shopDiscount: e.shopInfo.shopDiscount
              ? e.shopInfo.shopDiscount
              : '',
          }
          this.cartList[index].shopList.push(arr)
        })
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 点击店铺复选框
    clickShopCheckbox(item) {
      const index = this.cartList.findIndex((i) => {
        return i.id === item.id
      })
      if (item.isCheck) {
        this.cartList[index].shopList.forEach((i) => {
          i.isCheck = true
        })
      } else {
        this.cartList[index].shopList.forEach((i) => {
          i.isCheck = false
        })
      }
    },
    // 点击商品复选框
    clickGoodsCheckbox(item, child) {
      const index = this.cartList.findIndex((i) => {
        return i.id === item.id
      })
      const childIndex = this.cartList[index].shopList.findIndex((i) => {
        return i.id === child.id
      })
      const isAllCheckbox = this.cartList[index].shopList.every((i) => {
        return i.isCheck === true
      })
      if (isAllCheckbox) {
        this.cartList[index].isCheck = true
      } else {
        this.cartList[index].isCheck = false
      }
    },
    // 结算
    cartSubmit() {
      const cartSubmitList = []
      this.cartList.forEach((e) => {
        const isCheck = e.shopList.some((c) => {
          return c.isCheck === true
        })
        if (isCheck) {
          cartSubmitList.push(e)
        }
      })
      if (cartSubmitList.length <= 0) {
        return this.$toast.fail('请选择商品！')
      }
      cartSubmitList[0].totalPrice = this.totalPrice
      cartSubmitList[0].discountPrice = this.discountPrice
      window.sessionStorage.setItem(
        'shopCartList',
        JSON.stringify(cartSubmitList)
      )
      // 0外卖 1商城
      this.$router.push('/shoppingOrderView?form=1')
    },
    // 商品规格改变触发
    skuSelected(data) {
      // console.log(data)
    },
    // 处理修改商品属性
    async updateShop() {
      const item = this.shopItem
      const c = this.childrenShopItem
      // 获取当前选中的商品规格数据对象
      const data = this.$refs.sku.getSkuData()
      // 规格id
      let specificationId = null
      // 已选商品属性
      let orderCartProductProperties = []
      // 属性id列表
      let propertyIdList = []
      let propertyIdListSecound = []
      // 属性值id列表
      let propertyValueIdList = []
      // 获取选择的specificationId
      // selectedSkuComb是商品属性弹出层中你选中的规格或属性列表（k_s）
      if (data.selectedSkuComb && data.selectedSkuComb.s10001) {
        specificationId = data.selectedSkuComb.s10001
      }
      // 将商品里所有的k_s保存到propertyIdList
      this.sku.tree.forEach((e) => {
        propertyIdList.push(e.k_s)
      })
      // 根据k_s去获取data.selectedSkuComb里的值,获取到属性值id
      propertyIdList.forEach((e) => {
        if (e === 's10001') {
          return
        }
        data.selectedSkuComb[e] &&
          propertyValueIdList.push(data.selectedSkuComb[e])
      })
      // 根据k_s去获取data.selectedSkuComb里的值,获取到属性id
      propertyIdList.forEach((e) => {
        if (e === 's10001') {
          return
        }
        data.selectedSkuComb[e] && propertyIdListSecound.push(e.substr(1))
      })
      // 将属性id添加到orderCartProductProperties数组中
      propertyIdListSecound.forEach((e) => {
        orderCartProductProperties.push({ productPropertyId: Number(e) })
      })
      // 将属性值id添加到对应orderCartProductProperties数组中
      for (let index = 0; index < propertyValueIdList.length; index++) {
        orderCartProductProperties[index].productPropertyValueId = Number(
          propertyValueIdList[index]
        )
      }
      const cartShop = {
        id: this.id,
        productAmount: data.selectedNum,
        orderCartProductProperties,
        productSpecificationId: specificationId,
      }
      console.log(cartShop)

      const res = await upData('/order/cart/update', cartShop, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.$router.go(0)
        return false
      }
      this.$handleCode.handleCode(res)
      // const index = this.cartList.findIndex(i => {
      //   return item.id === i.id
      // })
      // const childIndex = this.cartList[index].shopList.findIndex(i => {
      //   return c.id === i.id
      // })
      // this.cartList[index].shopList[childIndex].num = this.shopNum
      // this.shopSelectAttributeShow = false
    },
    stepperChange(num) {
      this.shopNum = num
    },
    toShoppingShop(shopId) {
      this.$router.push('/shoppingShop?id=' + shopId)
    },
    toShoppingDetails(item, c) {
      this.$router.push(`/shoppingDetails?id=${c.productId}`)
    },
    // 点击选择属性
    clickSelectAttribute(item, c) {
      this.shopSelectAttributeShow = true
      this.shopItem = item
      this.childrenShopItem = c
      this.id = c.id
      // 清空sku
      this.sku.tree = []
      this.sku.list = []
      this.skuObj.quota = c.restriction === 0 ? 9999999999999 : c.restriction
      this.sku.price = c.rePrice
      this.sku.stock_num =
        c.inventory === 0 ? 9999999999999 : c.productInventory.productNumber
      // this.goods.picture =
      if (this.sku.list.length <= 0) {
        this.$toast.loading({ message: '加载中...', forbidClick: true })
      }
      this.getGoodsproperty(c.productId)
    },
  },
}
</script>
<style lang="less" scoped>
.top {
  height: 3rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .left {
    font-weight: 900;
    span {
      font-size: 1.5rem;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
}
.shop_warp {
  padding: 0 1rem 10rem 1rem;
}
.shop_list {
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  margin: 1rem 0;
  box-sizing: border-box;
  border-radius: 0.5rem;
  .top_text {
    display: flex;
    align-items: center;
    .checkbox {
      flex: 0.7;
    }
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
    }
    .text {
      flex: 6;
      font-weight: 900;
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
    }
  }
  .content {
    display: flex;
    margin-top: 1rem;
    .checkbox {
      flex: 0.7;
    }
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 0.5rem;
    }
    .right_content {
      flex: 5;
      margin-left: 1rem;
      .name {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .type {
        box-sizing: border-box;
        background-color: #f7f7f7;
        height: 2rem;
        width: 100%;
        padding: 0.5rem;
        color: #999;
        display: flex;
        align-items: center;
        margin: 1rem 0;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        .icon {
          margin-left: 7rem;
        }
      }
      .price_num {
        display: flex;
        justify-content: space-between;
        .price {
          color: @priceColor;
          font-weight: 900;
        }
      }
    }
  }
}
.bottom_delete_bar {
  width: 100%;
  box-sizing: border-box;
  height: 3.5rem;
  background-color: #fff;
  padding: 1rem;
  position: fixed;
  bottom: 3.4rem;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    color: @priceColor;
    border: 1px solid @priceColor;
  }
}
.van-button {
  width: 8rem;
  height: 2.5rem;
}
.van-submit-bar {
  bottom: 3.4rem;
  padding: 0.5rem 0;
}
.warp {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .confirm_btn {
    width: @buttonWidth;
    margin-bottom: 1rem;
    background-color: #fc5431;
    border: 1px solid #fc5431;
    color: #fff;
  }
}
::v-deep .van-goods-action {
  height: 3rem;
}
::v-deep .van-sku-actions {
  height: 3rem;
  display: flex;
  align-items: center;
}
::v-deep .van-button {
  height: 2.5rem;
}
::v-deep .van-image {
  width: 5rem;
  height: 5rem;
}
::v-deep .van-sku-row__item-img {
  width: 2.5rem;
  height: 1.5rem;
}
</style>
