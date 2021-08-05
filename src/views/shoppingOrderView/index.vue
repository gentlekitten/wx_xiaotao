<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单结算·提交订单" is-arrow is-back-up />
    <div class="home">
      <template v-if="form === 1">
        <!-- 请新增或选择收货地址 -->
        <div class="address">
          <div v-if="orderList[0].shopList[0].shopOrders" class="send_type">
            {{
              orderList[0].shopList[0].shopOrders.deliverySn === 1
                ? '快递配送'
                : '商家配送'
            }}
          </div>
          <div class="select_address" @click="toSelectAddress">
            <div v-if="!addressObj.name">请新增或选择收货地址</div>
            <div v-else class="address_text">
              <div class="user_info">
                <span>{{ addressObj.name }}</span>
                {{ addressObj.phone }}
              </div>
              <div class="text">{{ addressObj.address }}</div>
            </div>
            <van-icon class="icon" name="arrow" size="1.5rem" />
          </div>
        </div>
        <div class="shipping_method">
          <div class="left">送达方式</div>
          <div v-if="orderList[0].shopList[0].shopOrders" class="right">
            {{
              orderList[0].shopList[0].shopOrders.deliverySn === 1
                ? '快递配送'
                : '商家配送'
            }}
          </div>
        </div>
        <div class="shop_info_warp" v-for="item in orderList" :key="item.id">
          <div class="shop" @click="toTakeOutShop(item.id)">
            <img :src="'https://jixi.mynatapp.cc/' + item.img" />
            <div class="shop_name">
              {{ item.name }}
              <van-icon class="icon" name="arrow" size="1.5rem" />
            </div>
          </div>
          <div class="shop_info" v-for="c in item.shopList" :key="c.id">
            <div class="warp">
              <img :src="'https://jixi.mynatapp.cc/' + c.img" />
              <div class="shop_details">
                <div class="title">{{ c.name }}</div>
                <div class="specification">({{ c.shopType }})</div>
                <div class="num_price">
                  <div class="num">×{{ c.num }}</div>
                  <div class="price">￥{{ c.price * c.num }}</div>
                </div>
              </div>
            </div>
            <div class="price_item">
              <div class="text">小计</div>
              <div class="price">￥{{ c.price * c.num }}</div>
            </div>
            <div class="price_item">
              <div class="text">邮费</div>
              <div class="price_text">
                {{
                  item.shopList[0].shopOrders > 0
                    ? item.shopList[0].shopOrders.deliveryFee
                    : c.deliveryFee
                    ? c.deliveryFee
                    : 0
                }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="form === 0">
        <!-- 请新增或选择收货地址 -->
        <div class="address">
          <div v-if="orderList.shopOrders" class="send_type">
            {{
              orderList.shopOrders.deliverySn === 1 ? '快递配送' : '商家配送'
            }}
          </div>
          <div class="select_address" @click="toSelectAddress">
            <div v-if="!addressObj.name">请新增或选择收货地址</div>
            <div v-else class="address_text">
              <div class="user_info">
                <span>{{ addressObj.name }}</span>
                {{ addressObj.phone }}
              </div>
              <div class="text">{{ addressObj.address }}</div>
            </div>
            <van-icon class="icon" name="arrow" size="1.5rem" />
          </div>
        </div>
        <div class="shipping_method">
          <div class="left">送达方式</div>
          <div v-if="orderList.shopOrders" class="right">
            {{
              orderList.shopOrders.deliverySn === 1 ? '快递配送' : '商家配送'
            }}
          </div>
        </div>
        <div class="shop_info_warp">
          <div class="shop" @click="toShoppingShop">
            <img :src="'https://jixi.mynatapp.cc/' + orderList.shopPic" />
            <div class="shop_name">
              {{ orderList.shopName }}
              <van-icon class="icon" name="arrow" size="1.5rem" />
            </div>
          </div>
          <div class="shop_info" v-for="c in orderList.shopList" :key="c.id">
            <div class="warp">
              <img :src="'https://jixi.mynatapp.cc/' + c.logoAddress" />
              <div class="shop_details">
                <div class="title">
                  {{
                    c.productName +
                    (c.productInfoSpecifications.length > 0
                      ? c.productInfoSpecifications[0].specificationName
                      : '')
                  }}
                </div>
                <div class="num_price">
                  <div class="num">×{{ c.num }}</div>
                  <div class="price">
                    ￥{{
                      (c.sellPrice +
                        (c.productInfoSpecifications.length > 0
                          ? c.productInfoSpecifications[0].price
                          : 0)) *
                      c.num
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="price_item">
              <div class="text">小计</div>
              <div class="price">
                ￥{{
                  (c.sellPrice +
                    (c.productInfoSpecifications.length > 0
                      ? c.productInfoSpecifications[0].price
                      : 0)) *
                  c.num
                }}
              </div>
            </div>
            <div v-if="c.packPrice" class="price_item">
              <div class="text">
                打包：
                <span>餐盒\包装</span>
              </div>
              <div class="price">￥{{ c.packPrice }}</div>
            </div>
          </div>

          <div class="price_item">
            <div class="text">配送费：</div>
            <div class="price">
              ￥{{
                orderList.shopOrders.deliveryFee
                  ? orderList.shopOrders.deliveryFee
                  : 0
              }}
            </div>
          </div>
          <div class="price_item">
            <div class="text">优惠：</div>
            <div class="price">￥{{ orderList.discountPrice }}</div>
          </div>
          <div class="price_item">
            <div class="text">总计：</div>
            <div class="price">￥{{ totalPrice }}</div>
          </div>
        </div>
      </template>
      <template v-if="form === 2">
        <!-- 请新增或选择收货地址 -->
        <div class="address">
          <div class="send_type">快递配送</div>
          <div class="select_address" @click="toSelectAddress">
            <div v-if="!addressObj.name">请新增或选择收货地址</div>
            <div v-else class="address_text">
              <div class="user_info">
                <span>{{ addressObj.name }}</span>
                {{ addressObj.phone }}
              </div>
              <div class="text">{{ addressObj.address }}</div>
            </div>
            <van-icon class="icon" name="arrow" size="1.5rem" />
          </div>
        </div>
        <div class="shipping_method">
          <div class="left">送达方式</div>
          <div class="right">快递配送</div>
        </div>
        <div class="shop_info_warp">
          <div class="shop_info">
            <div class="warp">
              <img :src="'https://jixi.mynatapp.cc/' + orderList.img" />
              <div class="shop_details">
                <div class="title">
                  {{ orderList.name }}
                </div>
                <div class="num_price">
                  <div class="num">×{{ orderList.num }}</div>
                  <div class="price">￥{{ orderList.price }}</div>
                </div>
              </div>
            </div>
            <div class="price_item">
              <div class="text">小计</div>
              <div class="price">￥{{ orderList.price }}</div>
            </div>
          </div>
          <div class="price_item">
            <div class="text">邮费：</div>
            <div class="price">￥{{ orderList.deliveryFee }}</div>
          </div>
          <div class="price_item">
            <div class="text">总计：</div>
            <div class="price">
              ￥{{ orderList.price + orderList.deliveryFee }}
            </div>
          </div>
        </div>
      </template>
      <!-- 备注输入框 -->
      <van-cell-group class="remark_input">
        <van-field
          v-model="remarkValue"
          clearable
          label="留言："
          placeholder="可对商家留言"
        />
      </van-cell-group>
      <!-- 支付方式 -->
      <div class="pay_mode">
        <div class="text">支付方式：</div>
        <div class="warp">
          <div class="icon_left">
            <i class="icon iconfont icon-weixin" />
            <span>微信</span>
          </div>
          <div class="icon_right">
            <van-icon name="checked" size="1.5rem" />
          </div>
        </div>
      </div>
      <!-- 提交栏 -->
      <div class="submit_bar">
        <div class="text">
          应付金额：
          <span v-if="form === 1"
            >￥{{
              orderList[0].totalPrice +
              this.postPrice +
              '(优惠：' +
              orderList[0].discountPrice +
              ')'
            }}</span
          >
          <span v-if="form === 0">￥{{ totalPrice }}</span>
          <span v-if="form === 2"
            >￥{{ orderList.price + orderList.deliveryFee }}</span
          >
        </div>
        <van-button class="btn" type="primary" round @click="clickOrderBtn"
          >提交订单</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'

import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

import AddressSelectCell from '@/components/express/AddressSelectCell.vue'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    NavBar,
    AddressSelectCell,
  },
  mixins: [onBridgeReady],
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      // 0外卖 1商城 2二手商品
      form: 0,
      remarkValue: '',
      orderList: [],
      postPrice: 0,
      // 外卖总价格
      totalPrice: 0,
      addressObj: {},
      // 获取购物车列表
      shopCartList: JSON.parse(window.sessionStorage.getItem('shopCartList'))
        ? JSON.parse(window.sessionStorage.getItem('shopCartList'))
        : [],
    }
  },
  created() {
    this.$route.query.form && (this.form = Number(this.$route.query.form))
    this.getShopInfo()
    this.getAddress()
  },
  methods: {
    async getAddress() {
      // 获取地址对象
      this.addressObj = JSON.parse(window.sessionStorage.getItem('addressObj'))
        ? JSON.parse(window.sessionStorage.getItem('addressObj'))
        : {}
      if (Object.keys(this.addressObj).length > 0) {
        return false
      }
      const res = await getData(
        '/customer/address/my/find',
        {
          siteId: this.siteId,
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        if (res.data.length > 0) {
          const addressObj = res.data.filter((e) => {
            return e.addressDefault === 1
          })[0]
          addressObj.name = addressObj.realname
          addressObj.phone = addressObj.phone
          addressObj.address =
            addressObj.province +
            addressObj.city +
            addressObj.district +
            addressObj.addressDetail
          this.addressObj = addressObj
        }
        return false
      }
      this.$handelCode.handleCode(res)
    },
    // 获取商品信息
    getShopInfo() {
      let cartList = this.shopCartList
      if (this.form === 1) {
        // 遍历出isCheck为true的商品
        cartList.forEach((e) => {
          e.shopList = e.shopList.filter((c) => {
            return c.isCheck === true
          })
          e.shopList.forEach((c) => {
            // 计算邮费(统一邮费)
            if (c.shopOrders > 0) {
              let deliveryFee = c.shopOrders.deliveryFee
                ? c.shopOrders.deliveryFee
                : 0
              // 防止小数相加出现问题
              this.postPrice = commonJs.commonJs.accAdd(
                this.postPrice,
                deliveryFee
              )
            } else {
              // 统一邮费不存在 计算商品的单个邮费
              if (c.deliveryFee) {
                this.postPrice = commonJs.commonJs.accAdd(
                  this.postPrice,
                  c.deliveryFee
                )
              }
            }
          })
        })
      }
      console.log(cartList)
      this.orderList = cartList
      if (this.form === 0) {
        const totalPrice = this.orderList.totalPrice
        const deliveryFee = this.orderList.shopOrders.deliveryFee
          ? this.orderList.shopOrders.deliveryFee
          : 0
        const priceList = [totalPrice, deliveryFee]
        // 解决js小数相加出现多位小数
        this.totalPrice = commonJs.commonJs.addNum(priceList)
      }
    },
    toSelectAddress() {
      this.$router.push('/user/userInfo/addressList')
    },
    toShoppingShop(shopId) {
      this.$router.push('/shoppingShop?id=' + shopId)
    },
    toTakeOutShop() {},
    // 提交订单
    async clickOrderBtn() {
      if (!this.addressObj.name) {
        return this.$toast.fail('请选择收货地址！')
      }
      let res = null
      if (this.form === 0 || this.form === 1) {
        const data = {
          customerRealname: this.addressObj.name,
          customerPhone: this.addressObj.phone,
          addressDetail: this.addressObj.address,
          otherMsg: this.remarkValue,
          orderDetails: [],
        }
        // 处理外卖提交订单数据 0外卖 1商城
        if (this.form === 0) {
          this.orderList.shopList.forEach((c) => {
            let orderProductSpecification = {}
            let orderProductProertyValues = []
            if (c.productInfoSpecifications.length > 0) {
              orderProductSpecification.productInfoSpecificationId =
                c.productInfoSpecifications[0].id
            }
            if (c.productInfoProperties.length > 0) {
              orderProductProertyValues.push({
                propertyValueId:
                  c.productInfoProperties[0].productPropertyValues[0].id,
              })
            }
            data.orderDetails.push({
              productId: c.id,
              productCnt: c.num,
              orderProductSpecification,
              orderProductProertyValues,
            })
          })
        } else {
          this.orderList.forEach((e) => {
            e.shopList.forEach((c) => {
              let orderProductSpecification = {}
              let orderProductProertyValues = []
              if (c.productInfoSpecifications.length > 0) {
                orderProductSpecification.productInfoSpecificationId =
                  c.productInfoSpecifications[0].id
              }
              if (c.productInfoProperties.length > 0) {
                orderProductProertyValues.push({
                  propertyValueId:
                    c.productInfoProperties[0].productPropertyValues[0].id,
                })
              }
              data.orderDetails.push({
                productId: c.productId,
                productCnt: c.num,
                orderProductSpecification,
                orderProductProertyValues,
              })
            })
          })
        }
        res = await upData('/order/pay/shop', data, { showLoading: true })
      } else {
        const data = {
          customerRealname: this.addressObj.name,
          customerPhone: this.addressObj.phone,
          addressDetail: this.addressObj.address,
          otherMsg: this.remarkValue,
          secondhandProductId: this.orderList.productId
        }
        res = await upData('/secondhand/product/order/pay', data, {
          showLoading: true,
        })
      }
      console.log(res)
      if (res.code === '0') {
        // onBridgeReady混入
        this.onBridgeReady(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  padding: 1rem;
  margin-bottom: 8rem;
  .address {
    box-sizing: border-box;
    width: 100%;
    height: 8rem;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    .send_type {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
    }
    .select_address {
      color: #ccc;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }
    .address_text {
      margin-top: -1.2rem;
      font-size: 0.9rem;
      height: 3rem;
      .user_info {
        span {
          color: #000;
        }
      }
      .text {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .shipping_method {
    box-sizing: border-box;
    margin: 1rem 0;
    width: 100%;
    height: 3rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    .right {
      color: @themeColor;
    }
  }
  .shop_info_warp {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    .shop {
      display: flex;
      img {
        width: 20%;
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
      }
      .shop_name {
        font-size: 0.8rem;
        margin-left: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .shop_info {
      font-size: 0.8rem;
      margin-top: 1rem;
      .warp {
        display: flex;
        img {
          width: 18%;
          height: 3.5rem;
        }
        .shop_details {
          width: 80%;
          margin-left: 1rem;
          .specification {
            color: #ccc;
            margin: 0.5rem 0;
          }
          .num_price {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .num {
              color: #ccc;
            }
            .price {
              font-size: 1rem;
            }
          }
        }
      }
      .total_price {
        text-align: right;
        span {
          color: @priceColor;
          font-size: 1rem;
          font-weight: 900;
        }
      }
    }
    .price_item {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
      .price {
        font-weight: 900;
      }
      .price_text {
        font-weight: 400;
      }
      span {
        color: #ccc;
        font-size: 0.75rem;
      }
    }
  }
  .remark_input {
    margin: 1rem 0;
    border-radius: 0.5rem;
  }
  .pay_mode {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    .warp {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      .icon_left {
        .icon {
          margin-right: 0.5rem;
        }
        span {
          color: #999;
          font-size: 0.8rem;
        }
      }
      .icon_right {
        color: @priceColor;
      }
    }
  }
  .submit_bar {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 4.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    .text {
      font-size: 0.8rem;
      span {
        color: @priceColor;
        font-weight: 900;
        font-size: 1rem;
      }
    }
    .btn {
      height: 2.5rem;
    }
  }
}
</style>
