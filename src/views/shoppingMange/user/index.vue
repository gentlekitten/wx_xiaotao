<template>
  <div>
    <div class="home">
      <div class="top_bg" />
      <div class="user_warp">
        <div class="user_info">
          <div class="user_top">
            <img
              v-if="userInfoObj.shopPic"
              :src="imgBaseUrl + userInfoObj.shopPic"
            />
            <div class="content">
              <div class="name">{{ userInfoObj.shopName }}</div>
              <div class="phone">{{ userInfoObj.shopPhone }}</div>
            </div>
            <van-popover
              class="popover"
              v-model="userStatusShowPopover"
              trigger="click"
              :actions="userStatusList"
              @select="userStatusSelect"
            >
              <template #reference>
                <div class="status">
                  {{
                    userInfoObj.shopState === 0
                      ? '打烊中'
                      : userInfoObj.shopState === 1
                      ? '营业中'
                      : '停业中'
                  }}
                  <van-icon name="arrow-down" color="cadetblue" />
                </div>
              </template>
            </van-popover>
          </div>
          <div class="order_status">
            <div class="order">
              <div class="title">{{ todayOrder }}单</div>
              <div class="text">今日订单</div>
            </div>
            <div class="order">
              <div class="title">{{ todayPrice }}元</div>
              <div class="text">今日营业</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 宫格 -->
      <div class="grid_warp">
        <grid class="grid" :gird-list="girdList" :column-num="3" />
      </div>
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import timeForamt from '@/assets/js/time.js'

import Grid from '@/components/common/Grid.vue'

export default {
  components: {
    Grid,
  },
  created() {
    this.initView()
    this.initGirdList()
    this.getTodayMoneyAndOrder()
    this.getMerchantInfo()
  },
  data() {
    return {
      shopId: '',
      userStatusShowPopover: false,
      shopManageId: Number(window.sessionStorage.getItem('shopManageId')),
      // 菜单选项
      userStatusList: [
        { text: '打烊中' },
        { text: '营业中' },
        { text: '停业中' },
      ],
      userInfoObj: {},
      todayOrder: 0,
      todayPrice: 0,
      girdList: [
        {
          img: require('../../../assets/img/mange/shop-mang.png'),
          text: '店铺管理',
          url: '',
        },
        {
          img: require('../../../assets/img/mange/order-mange.png'),
          text: '订单配置',
          url: '/shoppingMange/user/shopManage/orderSetting',
        },
        {
          img: require('../../../assets/img/mange/fenxi.png'),
          text: '业绩分析',
          url: '/shoppingMange/user/shopManage/statisticAnalysis',
        },
        {
          img: require('../../../assets/img/mange/waimai.png'),
          text: '外卖配置',
          url: '/shoppingMange/user/shopManage/takeOutSetting',
        },
      ],
    }
  },
  methods: {
    // 初始化界面
    initView() {
      this.shopId = this.$route.query.shopId
        ? this.$route.query.shopId
        : window.sessionStorage.getItem('shopId')

      const id = this.$route.query.id
        ? this.$route.query.id
        : window.sessionStorage.getItem('shopManageId')
      if (id) {
        this.girdList[0].url = `/shoppingMange/user/shopManage?id=${Number(id)}`
        this.shopManageId = id
        window.sessionStorage.setItem('shopManageId', this.shopManageId)
        window.sessionStorage.setItem('shopId', this.shopId)
      }
    },
    initGirdList() {
      if (Number(this.shopManageId) === 3 || Number(this.shopManageId) === 4) {
        this.girdList.pop()
      }
    },
    // 获取今日营业和今日订单
    async getTodayMoneyAndOrder() {
      let time = timeForamt.gettime.formatTime()
      const data = {
        shopId: this.shopId,
        startTime: time,
        endTime: time,
      }
      console.log(data)
      const res = await upData('/shop/order/money', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.todayOrder = res.data.orderNumber
        this.todayPrice = res.data.orderMoney
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取商家信息
    async getMerchantInfo() {
      const res = await getData(
        '/shop/info/my/find',
        { id: this.shopId },
        {
          showLoading: true,
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.userInfoObj = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理商家状态改变
    async userStatusSelect(action, index) {
      // state 0打烊 1营业 2停业
      const data = {
        state: index,
        shopId: this.shopId,
      }
      const res = await upData('/shop/state/update', data, {
        showLoading: true,
      })
      if (res.code !== '0') {
        return this.$handleCode.handleCode(res)
      }
      this.userInfoObj.shopState = index
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  min-width: 340px;
}
.top_bg {
  width: 100%;
  height: 10rem;
  background-color: @themeColor;
}
.user_warp {
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  position: fixed;
  top: 3rem;
  right: 0;
  .user_info {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0 1rem;
    .user_top {
      display: flex;
      align-items: center;
      height: 6rem;
      border-bottom: 1px solid #eee;
      .popover {
        margin-right: 1rem;
      }
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.5rem;
      }
      .content {
        flex: 5;
        margin-left: 1rem;
        line-height: 1.5rem;
        .name {
          font-weight: 900;
        }
        .phone {
          color: #999;
          font-size: 0.8rem;
        }
      }
      .status {
        flex: 1.5;
        height: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid cadetblue;
        color: cadetblue;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        padding: 0.2rem;
        box-sizing: border-box;
      }
    }
    .order_status {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .order {
        text-align: center;
        .title {
          font-weight: 900;
        }
        .text {
          color: #999;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
      }
    }
  }
}
.grid_warp {
  padding: 1rem;
  margin-top: 3rem;
  .grid {
    border-radius: 0.5rem;
    padding-bottom: 1rem;
  }
}
</style>
