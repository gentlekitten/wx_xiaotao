<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单结算·提交订单" is-arrow isBackUp />
    <div class="home">
      <!-- 请新增或选择收货地址 -->
      <div class="address">
        <div class="send_type">{{ shopInfoObj.sendtype }}</div>
        <div class="select_address" @click="toSelectAddress">
          <div v-if="!shopInfoObj.address">请新增或选择收货地址</div>
          <div v-else class="address_text">
            <div class="user_info">
              <span>{{ shopInfoObj.username }}</span>
              {{ shopInfoObj.phone }}
            </div>
            <div class="text">{{ shopInfoObj.address }}</div>
          </div>
          <van-icon class="icon" name="arrow" size="1.5rem" />
        </div>
      </div>
      <div class="shipping_method">
        <div class="left">送达方式</div>
        <div class="right">{{ shopInfoObj.sendtype }}</div>
      </div>
      <div class="shop_info_warp">
        <div class="shop" @click="toShoppingShop">
          <img :src="shopInfoObj.shopImg" />
          <div class="shop_name">
            {{ shopInfoObj.shopName }}
            <van-icon class="icon" name="arrow" size="1.5rem" />
          </div>
        </div>
        <div class="shop_info">
          <div class="warp">
            <img :src="shopInfoObj.shopImg" />
            <div class="shop_details">
              <div class="title">{{ shopInfoObj.shopTitle }}</div>
              <div class="specification">({{ shopInfoObj.shopSpecification }})</div>
              <div class="num_price">
                <div class="num">×{{ shopInfoObj.shopNum }}</div>
                <div class="price">￥{{ shopInfoObj.totalPrice }}</div>
              </div>
            </div>
          </div>
          <div class="price_item">
            <div class="text">小计</div>
            <div class="price">￥{{ shopInfoObj.totalPrice }}</div>
          </div>
          <div v-if="shopInfoObj.packPrice" class="price_item">
            <div class="text">
              打包：
              <span>餐盒\包装</span>
            </div>
            <div class="price">￥{{ shopInfoObj.packPrice }}</div>
          </div>
          <div v-if="shopInfoObj.deliveryPrice" class="price_item">
            <div class="text">
              配送：
              <span>0km</span>
            </div>
            <div class="price">￥{{ shopInfoObj.deliveryPrice }}</div>
          </div>
          <div v-if="shopInfoObj.postPrice" class="price_item">
            <div class="text">邮费</div>
            <div class="price_text">{{ shopInfoObj.postPrice }}</div>
          </div>
          <div class="total_price">
            应付总计：
            <span>￥{{ shopInfoObj.totalPrice }}</span>
          </div>
        </div>
      </div>
      <!-- 备注输入框 -->
      <van-cell-group class="remark_input">
        <van-field v-model="remarkValue" clearable label="留言：" placeholder="可对商家留言" />
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
          <span>￥{{ shopInfoObj.totalPrice }}</span>
        </div>
        <van-button class="btn" type="primary" round @click="clickOrderBtn">提交订单</van-button>
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
    AddressSelectCell
  },
  data() {
    return {
      remarkValue: '',
      shopInfoObj: {}
    }
  },
  created() {
    this.getShopInfo()
  },
  methods: {
    // 获取商品信息
    getShopInfo() {
      const obj = {
        sendtype: '快递邮寄',
        username: '哈哈',
        phone: '1231468374',
        address:
          '昆明冶金高等专科学校昆明冶金高等专科学校昆明冶金昆明冶金高等专科学校高等专科学校',
        shopImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
        shopName: '暮春官方店',
        shopTitle: '暮春官方店纸张',
        shopSpecification: '40码 黑色',
        shopNum: 2,
        shopPrice: 9.9,
        packPrice: '0',
        deliveryPrice: '1',
        postPrice: ''
      }
      obj.totalPrice =
        obj.shopNum * obj.shopPrice +
        Number(obj.packPrice) +
        Number(obj.deliveryPrice)
      this.shopInfoObj = obj
    },
    toSelectAddress() {
      this.$router.push('/user/userInfo/addressList')
    },
    toShoppingShop() {
      this.$router.push('/shoppingShop')
    },
    clickOrderBtn() {
      console.log(this.shopInfoObj)
      console.log('备注:' + this.remarkValue)
    }
  }
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
        span {
          color: @priceColor;
          font-size: 1rem;
          font-weight: 900;
        }
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
