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
            <shop-order
              v-if="[1, 2, 3, 4, 5].indexOf(item.orderType) > -1"
              :item="item"
              @toShopDetails="toShopDetails"
              @toOrderDetails="toOrderDetails"
              @deleteOrder="deleteOrder"
              @toPayment="toPayment"
              @toRefundView="toRefundView"
              @toEvaluateView="toEvaluateView"
            />
            <!-- 快递订单 -->
            <express-order
              v-if="[6, 7].indexOf(item.orderType) > -1"
              :item="item"
              @toPayment="toPayment"
              @toOrderDetails="toOrderDetails"
              @deleteOrder="deleteOrder"
            />
            <!-- 二手商品和领跑者 -->
            <other-order
              v-if="item.orderType === 8 || item.orderType === 9"
              :item="item"
              @toOrderDetails="toOrderDetails"
              @deleteOrder="deleteOrder"
              @toPayment="toPayment"
            />
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

import ShopOrder from '@/components/orderList/ShopOrder.vue'
import ExpressOrder from '@/components/orderList/ExpressOrder.vue'
import OtherOrder from '@/components/orderList/OtherOrder.vue'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    TopSearch,
    Tabs,
    ShopOrder,
    ExpressOrder,
    OtherOrder,
  },
  mixins: OtherOrder[onBridgeReady],
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
}
</style>
