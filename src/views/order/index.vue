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
      @clickTab="clickTab"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="哼，我也是有底线的~"
        :immediate-check="false"
        :offset="0"
        @load="onLoadData"
      ></van-list>
      <div class="shopping_warp">
        <div class="shopping">
          <div class="shopping_item" @click="toOrderDetails">
            <div class="top">
              <div class="left">
                <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                <div class="name">官方店</div>
                <van-icon name="arrow" size="1rem" color="#999" />
              </div>
              <div class="right">交易成功</div>
            </div>
            <div class="content">
              <div class="img_warp">
                <img class="img" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="content_top_warp">
                <div class="content_top">
                  <div class="name">卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣</div>
                </div>
                <div class="price_num">
                  <div class="price">￥9.9</div>
                  <div class="num">×1</div>
                </div>
                <div class="shop_type">黑色;L码</div>
              </div>
            </div>
            <div class="price_warp">
              <span>总价：￥9.9</span>
              <div class="price">实际付款：￥9.9</div>
            </div>
          </div>
          <div class="btn_warp">
            <van-button class="btn" round>删除订单</van-button>
            <van-button class="btn" round>查看物流</van-button>
            <van-button class="btn red" round @click.stop="toEvaluateView">评价</van-button>
          </div>
        </div>
        <div class="foods_warp">
          <div class="top">
            <div class="name">
              书香园
              <van-icon name="arrow" size="1rem" color="#999" />
            </div>
          </div>
          <div class="content">
            <div class="order">
              订单：
              <span>
                点击查看
                <van-icon name="arrow" size="1rem" color="cadetblue" />
              </span>
            </div>
            <div class="total">
              总计：
              <span>￥9.9</span>
            </div>
            <div class="status">
              支付：
              <span>未支付</span>
            </div>
            <div class="time">时间：2021-01-26&nbsp;16:40:10</div>
          </div>
          <div class="btn_warp">
            <van-button class="btn" round>删除</van-button>
            <van-button class="btn" round>去支付</van-button>
            <van-button class="btn red" round @click.stop="toRefundView">退款</van-button>
            <van-button class="btn red" round @click.stop="toEvaluateView">评价</van-button>
          </div>
          <div class="status_type">未支付</div>
        </div>
        <div class="express_warp">
          <div class="type">
            <span>寄出快递</span>
            <div class="require">不限快递商</div>
          </div>
          <div class="user_info">
            哈哈
            <span>12381723389</span>
          </div>
          <div class="user_address">昆明冶金高等专科安宁校区昆明冶金高等专科安宁校区昆明冶金高等专科安宁校区</div>
          <div class="info">收件人姓名：哈哈；收件人电话：12381723389；收件人地址：昆明冶金高等专科安宁校区</div>
          <div class="price">
            上门小费：
            <span>￥4</span>
          </div>
          <div class="time">提交：2021-1-22&nbsp;22:55:12</div>
          <div class="btn_warp">
            <van-button class="btn" round>取消订单</van-button>
            <van-button class="btn" round>删除订单</van-button>
            <van-button class="btn red" round>去支付</van-button>
          </div>
          <div class="status_type">未支付</div>
        </div>
      </div>
    </tabs>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import Tabs from '@/components/common/Tabs.vue'

import TopSearch from '@/components/shoping/TopSearch.vue'

export default {
  components: {
    TopSearch,
    Tabs
  },
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
          title: '全部'
        },
        {
          title: '待付款'
        },
        {
          title: '待发货'
        },
        {
          title: '待收货'
        },
        {
          title: '待评价'
        },
        {
          title: '退款/售后'
        }
      ],
      orderList: [],
      nonPaymentOrderList: []
    }
  },
  methods: {
    // 处理获取数据
    handleGetData() {
      if (this.tabIndex === 0) {
        this.orderList()
      } else if (this.tabIndex === 1) {
        this.getNonPaymentOrder()
      } else if (this.tabIndex === 2) {
      } else if (this.tabIndex === 3) {
      } else if (this.tabIndex === 4) {
      } else {
      }
    },
    // 获取用户全部订单
    async getUserAllOrder() {
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/order/info/user/all', data, {
        showLoading: true
      })
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        this.orderList.push(...res.data.orderMaster)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode()
    },
    // 获取用户未支付订单
    async getNonPaymentOrder() {
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/order/info/user/pay/check', data, {
        showLoading: true
      })
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        this.nonPaymentOrderList.push(...res.data.orderMaster)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode()
    },
    searchConfirm(value) {},
    clickTab(index) {
      this.tabIndex = index
      this.orderList = []
      this.nonPaymentOrderList = []
      this.pageIndex = 0
      // this.searchPageIndex = 1
      this.finished = false
      // this.isSearch = false
      // this.searchValue = ''
      this.getData()
    },
    toOrderDetails() {
      this.$router.push('/order/orderDetails')
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
      if (this.tabIndex === 0 && this.orderList.length > 0) {
        this.getUserAllOrder()
      } else if (this.tabIndex === 1 && this.nonPaymentOrderList.length > 0) {
        this.getNonPaymentOrder()
      } else if (this.tabIndex === 2 && this.reportList.length > 0) {
        this.getReportList()
      } else if (this.tabIndex === 3 && this.shopList.length > 0) {
        this.getShopList()
      } else if (this.tabIndex === 4 && this.feedBackList.length > 0) {
        this.getFeedBackList()
      } else if (this.tabIndex === 5 && this.feedBackList.length > 0) {
      }
    }
  }
}
</script>
<style lang="less" scoped>
.shopping_warp {
  padding: 0 1rem;
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
    margin: 1rem 0;
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
        width: 5rem;
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
