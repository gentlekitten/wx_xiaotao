<template>
  <div>
    <div class="top_bg" />
    <div class="user_warp">
      <div class="user_info">
        <div class="user_top">
          <img
            v-if="userInfoObj.customerInfo"
            :src="userInfoObj.customerInfo.headimgurl"
          />
          <div class="content">
            <div class="name">{{ userInfoObj.customerName }}</div>
            <div class="phone">{{ userInfoObj.phone }}</div>
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
                {{ userInfoObj.state === 1 ? '接单中' : '休息中' }}
                <van-icon name="arrow-down" color="cadetblue" />
              </div>
            </template>
          </van-popover>
        </div>
        <div class="order_status">
          <div class="order">
            <div class="title">{{ userInfoObj.orderNumber }}单</div>
            <div class="text">总订单</div>
          </div>
          <div class="order">
            <div class="title">{{ userInfoObj.orderPrice }}元</div>
            <div class="text">总营业</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

export default {
  components: {},
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      userStatusShowPopover: false,
      // 菜单选项
      userStatusList: [
        { text: '接单中', id: 1 },
        { text: '休息中', id: 3 },
      ],
      userInfoObj: {},
    }
  },
  created() {
    this.getOrderPersonInfo()
  },
  methods: {
    // 获取领跑者信息
    async getOrderPersonInfo() {
      const res = await getData(
        '/site/delivery/person/my/find',
        {},
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        this.userInfoObj = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 改变领跑者状态
    async userStatusSelect(action) {
      const res = await getData(
        '/site/delivery/person/state/my/update',
        { state: action.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.userInfoObj.state = action.id
        return this.$toast.success('修改成功！')
      }
      this.$handleCode.handleCode(res)
    },
  },
}
</script>
<style lang="less" scoped>
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
</style>
