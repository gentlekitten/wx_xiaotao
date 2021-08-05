<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单详情" is-arrow isBackUp />
    <div class="home">
      <div class="order_type">
        <div class="title">配送进程</div>
        <van-steps class="steps" :active="orderActive">
          <van-step>提交单</van-step>
          <van-step>已受理</van-step>
          <van-step>配送中</van-step>
          <van-step>交易完成！</van-step>
        </van-steps>
      </div>
      <!-- 地址 -->
      <div class="address">
        <div class="send_type">
          {{ shopInfoObj.deliverySn === 0 ? '商家配送' : '快递配送' }}
        </div>
        <div class="select_address">
          <div class="address_text">
            <div class="user_info">
              <span>{{ shopInfoObj.customerRealname }}</span>
              {{ shopInfoObj.customerPhone }}
            </div>
            <div class="text">{{ shopInfoObj.addressDetail }}</div>
          </div>
        </div>
      </div>
      <div class="shop_info_warp">
        <div class="type">
          {{ shopInfoObj.deliverySn === 0 ? '商家配送' : '快递配送' }}
        </div>
        <div class="shop_info">
          <div
            v-for="item in shopInfoObj.orderDetails"
            :key="item.id"
            class="warp"
          >
            <img :src="'https://jixi.mynatapp.cc/' + item.productLogoAddress" />
            <div class="shop_details">
              <div class="title">{{ item.shopTitle }}</div>
              <div class="specification">({{ item.productName }})</div>
              <div class="num_price">
                <div class="num">×{{ shopInfoObj.shopNum }}</div>
                <div class="price">
                  ￥{{
                    Math.round(
                      shopInfoObj.productPrice * shopInfoObj.shopNum * 1000
                    ) / 1000
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="price_item">
            <div class="text">
              {{ shopInfoObj.deliverySn === 0 ? '配送费' : '邮费' }}
            </div>
            <div class="price">￥{{ shopInfoObj.deliveryFee }}</div>
          </div>
          <div class="price_item">
            <div class="text">小计</div>
            <div class="price">￥{{ shopInfoObj.orderMoney }}</div>
          </div>
          <div class="total_price">
            应付总计：
            <span>￥{{ shopInfoObj.orderMoney }}</span>
          </div>
          <div class="shop_user" @click="toPhone">
            <van-icon name="service-o" size="1.3rem" />
            <span>联系商家</span>
          </div>
        </div>
      </div>
      <div class="order_info_warp">
        <div class="order_info">
          <div class="title">订单信息</div>
          <div class="info">
            <span>备注</span>
            {{ shopInfoObj.otherMsg }}
          </div>
          <div class="info">
            <span>支付方式</span>
            微信
          </div>
          <div class="info">
            <span>下单时间</span>
            {{ shopInfoObj.createTime }}
          </div>
          <div class="info">
            <span>支付时间</span>
            {{ shopInfoObj.payTime }}
          </div>
          <div class="info">
            <span>订单编号</span>
            {{ shopInfoObj.cOrderSn }}
          </div>
        </div>
      </div>
      <div v-if="shopInfoObj.payState === 2" class="btn_warp">
        <van-button class="btn" round>去支付</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

import AddressSelectCell from '@/components/express/AddressSelectCell.vue'

export default {
  components: {
    NavBar,
    AddressSelectCell,
  },
  data() {
    return {
      remarkValue: '',
      shopInfoObj: {},
      orderActive: 1,
    }
  },
  created() {
    this.getShopInfo()
  },
  methods: {
    // 获取商品信息
    getShopInfo() {
      this.shopInfoObj = JSON.parse(
        window.sessionStorage.getItem('orderDetail')
      )
        ? JSON.parse(window.sessionStorage.getItem('orderDetail'))
        : {}
      // const obj = {
      //   sendtype: '快递邮寄',
      //   username: '哈哈',
      //   phone: '1231468374',
      //   address:
      //     '昆明冶金高等专科学校昆明冶金高等专科学校昆明冶金昆明冶金高等专科学校高等专科学校',
      //   shopImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
      //   shopName: '暮春官方店',
      //   shopTitle: '暮春官方店纸张',
      //   shopSpecification: '40码 黑色',
      //   shopNum: 2,
      //   shopPrice: 9.9,
      //   packPrice: '0',
      //   deliveryPrice: '1',
      //   postPrice: '',
      // }
      // obj.totalPrice =
      //   obj.shopNum * obj.shopPrice +
      //   Number(obj.packPrice) +
      //   Number(obj.deliveryPrice)
      // this.shopInfoObj = obj
    },
    toShoppingShop() {
      this.$router.push('/shoppingShop')
    },
    clickOrderBtn() {
      console.log(this.shopInfoObj)
      console.log('备注:' + this.remarkValue)
    },
    toPhone() {
      const phoneNum = 14708701960
      window.location.href = 'tel:' + phoneNum
    },
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('orderDetail')
  },
}
</script>
<style lang="less" scoped>
.home {
  padding: 1rem;
  margin-bottom: 8rem;
  .order_type {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      font-weight: 900;
      margin-bottom: 1rem;
    }
    .steps {
    }
  }
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
  .order_info_warp {
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-sizing: border-box;
    line-height: 2rem;
    .order_info {
      .title {
        font-size: 1rem;
        font-weight: 900;
        border-bottom: 1px solid #eee;
        height: 3rem;
        margin-bottom: 1rem;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        span {
          color: #999;
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
