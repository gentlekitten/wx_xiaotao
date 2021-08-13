<template>
  <div>
    <!-- 顶部 navbar -->
    <top-search @searchConfirm="searchConfirm" />
    <div style="height: 2.6rem"></div>
    <tabs
      :tab-list="tabList"
      :sticky="true"
      offset-top="2.6rem"
      tabsIndexName="tabActiveIndexOrder"
      @changeTab="changeTab"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="哼，我也是有底线的~"
        :immediate-check="false"
        :offset="0"
        @load="onLoadData"
      >
        <!-- 订单类型(1零食2美妆3数码4外卖5食堂6站点快递[代取]7站点快递[寄出]8二手商品9领跑者订单) -->
        <div v-if="orderList.length > 0" class="shopping_warp">
          <div v-for="item in orderList" :key="item.shopId">
            <!-- 商品和外卖 -->
            <div
              v-if="[1, 2, 3, 4, 5].indexOf(item.orderType) > -1"
              class="shopping"
            >
              <div class="shopping_item">
                <div class="top">
                  <div class="left" @click="toShopDetails(item)">
                    <img :src="imgBaseUrl + item.shopOrderType.shopPic" />
                    <div class="name">{{ item.shopOrderType.shopName }}</div>
                    <van-icon name="arrow" size="1rem" color="#999" />
                  </div>
                  <!-- 0失败1成功2未支付 -->
                  <div v-if="item.shopOrderType.payState === 1" class="right">
                    交易成功
                  </div>
                  <div
                    v-else-if="item.shopOrderType.payState === 0"
                    class="right"
                  >
                    支付失败
                  </div>
                  <div v-else class="right">未支付</div>
                </div>
                <div
                  v-for="child in item.shopOrderType.shopOrderProductVo"
                  :key="child.productLogoAddress + item.shopId"
                  class="content"
                  @click="toOrderDetails(item.shopOrderType.cOrderSn)"
                >
                  <div class="img_warp">
                    <img
                      class="img"
                      :src="imgBaseUrl + child.productLogoAddress"
                    />
                  </div>
                  <div class="content_top_warp">
                    <div class="content_top">
                      <div class="name">
                        {{ child.productName }}
                      </div>
                    </div>
                    <div class="price_num">
                      <div class="price">￥{{ child.sellPrice }}</div>
                      <div class="num">×{{ child.productCnt }}</div>
                    </div>
                    <div
                      v-if="[2, 3].indexOf(item.orderType) > -1"
                      class="shop_type"
                    >
                      {{ child.shopType }}
                    </div>
                  </div>
                </div>
                <div class="price_warp">
                  <span>总价：￥{{ item.shopOrderType.orderMoney }}</span>
                  <div class="price">
                    实际付款：￥{{ item.shopOrderType.paymentMoney }}
                  </div>
                </div>
              </div>
              <div class="btn_warp">
                <van-button
                  class="btn"
                  round
                  @click="deleteOrder(item.shopOrderType.cOrderSn)"
                  >删除订单</van-button
                >
                <!-- 0不能取消 1能取消 -->
                <van-button
                  v-if="item.shopOrderType.canCancel === 1"
                  class="btn"
                  round
                  >取消订单</van-button
                >
                <van-button
                  v-if="item.shopOrderType.payState === 2"
                  class="btn red"
                  round
                  @click="toPayment(item.shopOrderType.cOrderSn)"
                  >去支付</van-button
                >
                <!-- sRefund 0不可退款  1可退 -->
                <van-button
                  v-if="item.shopOrderType.sRefund === 1"
                  class="btn red"
                  round
                  @click.stop="toRefundView"
                  >退款</van-button
                >
                <!-- 1可评论 0不可评论 -->
                <van-button
                  v-if="item.shopOrderType.hasComment === 1"
                  class="btn red"
                  round
                  @click.stop="toEvaluateView"
                  >评价</van-button
                >
              </div>
            </div>
            <!-- 代取快递 -->
            <div v-if="item.orderType === 6" class="express_warp">
              <div class="type">
                <span>代取快递</span>
                <div class="require">
                  {{ item.receiveExpressOrderType.expressName }}
                </div>
              </div>
              <div
                class="user_info"
                @click="toOrderDetails(item.receiveExpressOrderType.cOrderSn)"
              >
                {{ item.receiveExpressOrderType.customerName }}
                <span>{{ item.receiveExpressOrderType.customerPhone }}</span>
              </div>
              <div
                class="user_address"
                @click="toOrderDetails(item.receiveExpressOrderType.cOrderSn)"
              >
                {{ item.receiveExpressOrderType.customerAddress }}
              </div>
              <div
                class="info"
                @click="toOrderDetails(item.receiveExpressOrderType.cOrderSn)"
              >
                所选规格：{{
                  item.receiveExpressOrderType.specificationName
                    ? item.receiveExpressOrderType.specificationName
                    : '无'
                }}；所选服务：{{
                  item.receiveExpressOrderType.serviceName
                    ? item.receiveExpressOrderType.serviceName
                    : '无'
                }}；备注信息：{{
                  item.receiveExpressOrderType.otherMsg
                    ? item.receiveExpressOrderType.otherMsg
                    : '无'
                }}
              </div>
              <div class="price">
                总费用：
                <span>￥{{ item.receiveExpressOrderType.expressMoney }}</span>
              </div>
              <div class="time">
                提交：{{ item.receiveExpressOrderType.createTime }}
              </div>
              <div class="btn_warp">
                <van-button
                  class="btn"
                  round
                  @click="deleteOrder(item.receiveExpressOrderType.cOrderSn)"
                  >删除订单</van-button
                >
                <!-- 0不能取消 1能取消 -->
                <van-button
                  v-if="item.receiveExpressOrderType.canCancel === 1"
                  class="btn"
                  round
                  >取消订单</van-button
                >
                <van-button
                  v-if="item.receiveExpressOrderType.payState === 2"
                  class="btn red"
                  round
                  @click="toPayment(item.receiveExpressOrderType.cOrderSn)"
                  >去支付</van-button
                >
              </div>
              <div
                v-if="item.receiveExpressOrderType.payState === 2"
                class="status_type"
              >
                未支付
              </div>
              <div
                v-if="item.receiveExpressOrderType.payState === 0"
                class="status_type"
              >
                支付失败
              </div>
              <div
                v-if="item.receiveExpressOrderType.payState === 1"
                class="status_type"
              >
                支付成功
              </div>
            </div>
            <!-- 寄出快递 -->
            <div v-if="item.orderType === 7" class="express_warp">
              <div class="type">
                <span>寄出快递</span>
                <div class="require">
                  {{ item.sendExpressOrderType.expressName }}
                </div>
              </div>
              <div
                class="user_info"
                @click="toOrderDetails(item.sendExpressOrderType.cOrderSn)"
              >
                {{ item.sendExpressOrderType.customerName }}
                <span>{{ item.sendExpressOrderType.customerPhone }}</span>
              </div>
              <div
                class="user_address"
                @click="toOrderDetails(item.sendExpressOrderType.cOrderSn)"
              >
                {{ item.sendExpressOrderType.customerAddress }}
              </div>
              <div
                class="info"
                @click="toOrderDetails(item.sendExpressOrderType.cOrderSn)"
              >
                收件人姓名：{{
                  item.sendExpressOrderType.toName
                }}；收件人电话：{{
                  item.sendExpressOrderType.toPhone
                }}；收件人地址：{{
                  item.sendExpressOrderType.toAddress
                }}；备注信息：{{
                  item.sendExpressOrderType.otherMsg
                    ? item.sendExpressOrderType.otherMsg
                    : '无'
                }}
              </div>
              <div class="price">
                上门小费：
                <span>￥{{ item.sendExpressOrderType.expressMoney }}</span>
              </div>
              <div class="time">
                提交：{{ item.sendExpressOrderType.createTime }}
              </div>
              <div class="btn_warp">
                <van-button
                  class="btn"
                  round
                  @click="deleteOrder(item.sendExpressOrderType.cOrderSn)"
                  >删除订单</van-button
                >
                <!-- 0不能取消 1能取消 -->
                <van-button
                  v-if="item.sendExpressOrderType.canCancel === 1"
                  class="btn"
                  round
                  >取消订单</van-button
                >
                <van-button
                  v-if="item.sendExpressOrderType.payState === 2"
                  class="btn red"
                  round
                  @click="toPayment(item.sendExpressOrderType.cOrderSn)"
                  >去支付</van-button
                >
              </div>
              <div
                v-if="item.sendExpressOrderType.payState === 2"
                class="status_type"
              >
                未支付
              </div>
              <div
                v-if="item.sendExpressOrderType.payState === 0"
                class="status_type"
              >
                支付失败
              </div>
              <div
                v-if="item.sendExpressOrderType.payState === 1"
                class="status_type"
              >
                支付成功
              </div>
            </div>
            <!-- 二手商品和领跑者 -->
            <div
              v-if="item.orderType === 8 || item.orderType === 9"
              class="foods_warp"
            >
              <div>
                <div class="top">
                  <div
                    class="name"
                    @click="toOrderDetails(item.otherOrderType.cOrderSn)"
                  >
                    {{ item.otherOrderType.productName }}
                    <van-icon name="arrow" size="1rem" color="#999" />
                  </div>
                </div>
                <div class="content">
                  <div class="order">
                    订单：
                    <span @click="toOrderDetails(item.otherOrderType.cOrderSn)">
                      点击查看
                      <van-icon name="arrow" size="1rem" color="cadetblue" />
                    </span>
                  </div>
                  <div class="total">
                    总计：
                    <span>￥{{ item.otherOrderType.payMoney }}</span>
                  </div>
                  <div class="status">
                    支付：
                    <span v-if="item.otherOrderType.payState === 2"
                      >未支付</span
                    >
                    <span v-else-if="item.otherOrderType.payState === 1"
                      >支付成功</span
                    >
                    <span v-else>支付失败</span>
                  </div>
                  <div class="time">
                    时间：{{ item.otherOrderType.createTime }}
                  </div>
                </div>
                <div class="btn_warp">
                  <van-button
                    class="btn"
                    round
                    @click="deleteOrder(item.otherOrderType.cOrderSn)"
                    >删除订单</van-button
                  >
                  <!-- 0不能取消 1能取消 -->
                  <van-button
                    v-if="item.otherOrderType.canCancel === 1"
                    class="btn"
                    round
                    >取消订单</van-button
                  >
                  <van-button
                    v-if="item.otherOrderType.payState === 2"
                    class="btn red"
                    round
                    @click="toPayment(item.otherOrderType.cOrderSn)"
                    >去支付</van-button
                  >
                </div>
                <div
                  v-if="item.otherOrderType.payState === 2"
                  class="status_type"
                >
                  未支付
                </div>
                <div
                  v-else-if="item.otherOrderType.payState === 1"
                  class="status_type"
                >
                  支付成功
                </div>
                <div v-else class="status_type">支付失败</div>
              </div>
            </div>
          </div>
        </div>
        <van-empty v-else description="您还没有此类订单哦~"></van-empty
      ></van-list>
    </tabs>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import Tabs from '@/components/common/Tabs.vue'

import TopSearch from '@/components/shoping/TopSearch.vue'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    TopSearch,
    Tabs,
  },
  mixins: [onBridgeReady],
  data() {
    return {
      loading: false,
      finished: false,
      pageIndex: 0,
      tabIndex: Number(sessionStorage.getItem('tabActiveIndexOrder'))
        ? Number(sessionStorage.getItem('tabActiveIndexOrder'))
        : 0,
      tabList: [
        {
          title: '全部',
        },
        {
          title: '待付款',
        },
        {
          title: '待发货',
        },
        {
          title: '待收货',
        },
        {
          title: '待评价',
        },
        {
          title: '退款/售后',
        },
      ],
      orderList: [],
      nonPaymentOrderList: [],
    }
  },
  created() {
    this.getUserOrder(this.tabIndex)
  },
  methods: {
    // 获取用户全部订单
    async getUserOrder(tabIndex) {
      // oState=0代付款，代发货1，收货2，评价3,不传为全部
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10,
      }
      if (tabIndex !== 0) {
        data.oState = tabIndex - 1
      }
      const res = await getData('/order/info/user/all', data, {
        showLoading: true,
      })
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        this.orderList.push(...res.data.orderInfoVo)
        this.orderList.forEach((e) => {
          // 取出商品所选的规格和属性
          if ([3, 4].indexOf(e.orderType) > -1) {
            e.shopOrderType.shopOrderProductVo.forEach((c) => {
              let shopType = ''
              if (c.orderProductProertyValues.length > 0) {
                c.orderProductProertyValues.forEach((p) => {
                  shopType += p.propertyValue + ';'
                })
              }
              if (Object.keys(c.orderProductSpecification).length > 0) {
                shopType += propertyValue
              }
              c.shopType = shopType
            })
          }
        })
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 删除订单
    async deleteOrder(cOrderSn) {
      const res = await upData(
        '/order/info/user/delete',
        { cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.orderList = []
        this.getUserOrder(this.tabIndex)
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
    searchConfirm(value) {},
    changeTab(index) {
      console.log(index)
      this.tabIndex = index
      this.orderList = []
      this.pageIndex = 0
      // this.searchPageIndex = 1
      this.finished = false
      // this.isSearch = false
      // this.searchValue = ''
      this.getUserOrder(this.tabIndex)
    },
    // 查看订单详情
    toOrderDetails(cOrderSn) {
      this.$router.push('/order/orderDetails?cOrderSn=' + cOrderSn)
    },
    // 去店铺
    toShopDetails(item) {
      // 商品店铺
      if ([2, 3].indexOf(item.orderType).length > -1) {
        this.$router.push('/shoppingShop?id=' + item.shopId)
        return false
      }
      if (item.orderType === 1) {
        // 零食铺
        this.$router.push('/snackShop?id=' + item.shopOrderType.shopId)
      } else {
        // 外卖铺
        this.$router.push('/takeOutShop?id=' + item.shopOrderType.shopId)
      }
    },
    // 去评价
    toEvaluateView() {
      this.$router.push('/order/evaluateView')
    },
    // 去退款
    toRefundView() {
      this.$router.push('/order/refundView')
    },
    // 上拉加载数据
    onLoadData() {
      // 解决点击tab会重复发送请求
      if (this.orderList.length > 0) {
        this.getUserOrder(this.tabIndex)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.shopping_warp {
  padding: 1rem;
  margin-bottom: 5rem;
  .red {
    color: #ff623e;
    border: 1px solid #ff623e;
  }
  .shopping {
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    border: 1px solid #f7f7f7;
    margin-bottom: 1rem;
    .shopping_item {
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            margin-right: 1rem;
          }
          .name {
            margin-right: 0.5rem;
          }
        }
        .right {
          color: #ff623e;
        }
      }
      .content {
        display: flex;
        margin: 1rem 0;
        .img_warp {
          flex: 2;
          .img {
            width: 7rem;
            height: 7rem;
            border-radius: 0.5rem;
            margin-right: 1rem;
          }
        }
        .content_top_warp {
          flex: 5;
          .content_top {
            display: flex;
            .name {
              line-height: 1.5rem;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
          .price_num {
            display: flex;
            margin: 0.5rem 0;
            align-items: center;
            .num {
              color: #999;
              margin-left: 0.5rem;
            }
          }
        }
        .shop_type {
          color: #999;
          font-size: 0.8rem;
        }
      }
      .price_warp {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0.5rem;
        align-items: center;
        span {
          color: #999;
          margin-right: 1rem;
        }
      }
    }
    .btn_warp {
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 0.8rem;
        width: 6rem;
        height: 2rem;
        margin-top: 1rem;
      }
    }
  }
  .foods_warp {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    position: relative;
    .top {
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
      height: 2rem;
      .name {
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .content {
      .order {
        display: flex;
        span {
          color: cadetblue;
          display: flex;
          align-items: center;
        }
      }
      .total {
        margin: 0.5rem 0;
        span {
          color: @priceColor;
        }
      }
      .status {
        margin: 0.5rem 0;
        span {
          color: @priceColor;
        }
      }
    }
    .btn_warp {
      display: flex;
      justify-content: space-around;
      margin-top: 1rem;
      .btn {
        width: 6rem;
        height: 2rem;
        font-size: 0.8rem;
      }
    }
    .status_type {
      position: absolute;
      top: 4rem;
      right: 1rem;
      color: @priceColor;
      transform: rotate(20deg);
    }
  }
  .express_warp {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    line-height: 2rem;
    position: relative;
    .type {
      font-weight: 900;
      font-size: 1rem;
      display: flex;
      span {
        color: cadetblue;
        margin-right: 1rem;
      }
    }
    .user_info {
      font-size: 1rem;
      span {
        color: cadetblue;
        margin-left: 1rem;
      }
    }
    .user_address {
      color: #999;
      line-height: 1.5rem;
    }
    .info {
      background-color: #f7f7f7;
      padding: 1rem;
      line-height: 1.5rem;
    }
    .price {
      span {
        color: @priceColor;
      }
    }
    .btn_warp {
      display: flex;
      justify-content: space-between;
      .btn {
        width: 6rem;
        height: 2rem;
        font-size: 0.8rem;
      }
    }
    .status_type {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: @priceColor;
      transform: rotate(20deg);
    }
  }
}
</style>
