<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单详情" is-arrow isBackUp />
    <div class="home">
      <!-- 配送进程 -->
      <order-course :orderState="shopInfoObj.orderState" />
      <!-- 商家类型 -->
      <shop-order-detail
        v-if="[1, 2, 3, 4, 5].indexOf(shopInfoObj.orderType) > -1"
        :shopInfoObj="shopInfoObj"
        @toPhone="toPhone"
      />
      <!-- 二手 -->
      <secondary-order-detail
        v-if="shopInfoObj.orderType === 8"
        :shopInfoObj="shopInfoObj"
      />
      <!-- 快递 -->
      <express-order-detail
        v-if="shopInfoObj.orderType === 6 || shopInfoObj.orderType === 7"
        :shopInfoObj="shopInfoObj"
        @toPhone="toPhone"
      />
      <!-- 领跑者 -->
      <order-people-order-detail
        v-if="shopInfoObj.orderType === 9"
        :shopInfoObj="shopInfoObj"
        @toPhone="toPhone"
        @imagePreview="imagePreview"
      />
      <!-- 订单信息 -->
      <order-info :shopInfoObj="shopInfoObj" />
      <div v-if="shopInfoObj.payState === 2" class="btn_warp">
        <van-button class="btn" round @click="toPayment(shopInfoObj.cOrderSn)"
          >去支付</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

import AddressSelectCell from '@/components/express/AddressSelectCell.vue'

import OrderCourse from '@/components/orderDetail/OrderCourse.vue'
import OrderInfo from '@/components/orderDetail/OrderInfo.vue'
import ShopOrderDetail from '@/components/orderDetail/ShopOrderDetail.vue'
import SecondaryOrderDetail from '@/components/orderDetail/SecondaryOrderDetail.vue'
import ExpressOrderDetail from '@/components/orderDetail/SecondaryOrderDetail.vue'
import OrderPeopleOrderDetail from '@/components/orderDetail/OrderPeopleOrderDetail.vue'

import { ImagePreview } from 'vant'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    NavBar,
    AddressSelectCell,
    OrderCourse,
    OrderInfo,
    ShopOrderDetail,
    SecondaryOrderDetail,
    ExpressOrderDetail,
    OrderPeopleOrderDetail,
  },
  mixins: [onBridgeReady],
  data() {
    return {
      shopInfoObj: {},
      cOrderSn: '',
    }
  },
  created() {
    this.cOrderSn = this.$route.query.cOrderSn
    this.getShopOrderInfo()
  },
  methods: {
    // 获取商家订单信息
    async getShopOrderInfo() {
      const res = await getData(
        '/order/info/detail/find',
        { cOrderSn: this.cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        if ([1, 2, 3, 4, 5].indexOf(this.shopInfoObj.orderType) > -1) {
          // 拼接商品选择的规格和属性
          this.shopInfoObj.shopOrderDetailType.shopOrderProductVo.forEach(
            (e) => {
              e.shopType = ''
              if (Object.keys(e.orderProductSpecification).length > 0) {
                e.shopType +=
                  e.orderProductSpecification.specificationName + ';'
              }
              if (e.orderProductProertyValues.length > 0) {
                orderProductProertyValues.forEach((c) => {
                  e.shopType += c.propertyValue + ';'
                })
              }
            }
          )
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 支付订单
    async toPayment(cOrderSn) {
      const res = await upData(
        '/order/info/unify/pay',
        { cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.onBridgeReady(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    toPhone(shopPhone) {
      window.location.href = 'tel:' + shopPhone
    },
    // 预览图片
    imagePreview(item, index) {
      const imgUrlList = []
      item.forEach((e) => {
        imgUrlList.push(this.imgBaseUrl + e.picAddress)
      })
      ImagePreview({
        images: imgUrlList,
        startPosition: index,
      })
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
  .shop_info_warp {
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin: 1rem 0;
    .type {
      font-weight: 900;
    }
    .shop_info {
      font-size: 0.8rem;
      margin-top: 1rem;
      .warp {
        display: flex;
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
      .total_price {
        text-align: right;
        margin-bottom: 1rem;
        span {
          color: @priceColor;
          font-size: 1rem;
          font-weight: 900;
        }
      }
      .shop_user {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        span {
          font-size: 1rem;
          margin-left: 0.5rem;
        }
      }
    }
  }
  .btn_warp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    .btn {
      width: @buttonWidth;
      //   color: #ff6f4e;
      //   border: 1px solid #ff6f4e;
      color: #fff;
      background-color: #ff6f4e;
    }
  }
}
// 快递
.top {
  .title {
    font-weight: 900;
  }
}
.img_warp {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  .title {
    width: 21%;
    font-size: 0.8rem;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .img {
    width: 79%;
    display: flex;
    flex-wrap: wrap;
    img {
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
}
.info {
  border-radius: 0.5rem;
  .weight {
    font-weight: 900;
  }
  .cell1 {
    height: 5rem;
    position: relative;
    font-size: 0.8rem;
    .username {
      span {
        font-weight: 900;
        font-size: 1rem;
      }
    }
    .task_no {
      margin-top: 0.5rem;
    }
  }
  .cell2 {
    height: 5rem;
    width: 100%;
    .warp {
      display: flex;
      align-items: center;
      .text {
        flex: 1;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: @themeColor;
        color: #fff;
        font-size: 1rem;
        margin-top: 0.5rem;
      }
      .text_da {
        background-color: cadetblue;
      }
      .info {
        margin-left: 1rem;
        flex: 8;
        .text_info {
          font-size: 0.8rem;
          span {
            font-weight: 900;
          }
        }
      }
    }
  }
}
.price {
  span {
    color: red;
    font-size: 1rem;
    font-weight: 900;
  }
}
// 快递结束
::v-deep .van-step__title {
  font-size: 0.75rem;
}
::v-deep .van-step__circle {
  width: 0.8rem;
  height: 0.8rem;
}
::v-deep .van-icon {
  font-size: 1rem;
}
</style>
