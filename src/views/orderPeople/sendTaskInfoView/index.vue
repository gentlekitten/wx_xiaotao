<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="任务详细" is-arrow isBackUp />
    <div class="top">
      <div class="title">{{ taskDetailsObj.title }}</div>
      <div class="time">{{ taskDetailsObj.createTime }}</div>
    </div>
    <div class="info">
      <van-cell class="cell1">
        <div class="username">
          发布人：
          <span v-if="taskDetailsObj.customerInfo">{{
            taskDetailsObj.customerInfo.nickname
          }}</span>
        </div>
        <!-- state状态(0已撤销1未支付2未接单3已接单4已完成并确认) -->
        <div class="status">
          <div v-if="taskDetailsObj.state === 4">完成并确认</div>
          <div v-else-if="taskDetailsObj.state === 3">已接单</div>
          <div v-else-if="taskDetailsObj.state === 1" class="red">待支付</div>
          <div v-else-if="taskDetailsObj.state === 2" class="red">待接单</div>
        </div>
      </van-cell>
      <template
        v-if="
          taskDetailsObj.deliveryOrderAddresses &&
          taskDetailsObj.deliveryOrderAddresses.length > 0
        "
      >
        <van-cell class="cell2" is-link>
          <div class="warp">
            <div class="text">起</div>
            <div class="info">
              <div class="text_info">
                <span>{{
                  taskDetailsObj.deliveryOrderAddresses[0].customerName
                }}</span>
                &nbsp;/&nbsp;{{
                  taskDetailsObj.deliveryOrderAddresses[0].phone
                }}
              </div>
              <div class="address">
                {{ taskDetailsObj.deliveryOrderAddresses[0].addressDetail }}
              </div>
            </div>
          </div>
        </van-cell>
        <van-cell
          @click="toPhone(taskDetailsObj.deliveryOrderAddresses[0].phone)"
        >
          起点电话：{{ taskDetailsObj.deliveryOrderAddresses[0].phone }}
          <van-icon name="phone-o" size="1rem" />
        </van-cell>
        <template v-if="taskDetailsObj.deliveryOrderAddresses[1]">
          <van-cell class="cell2" is-link>
            <div class="warp">
              <div class="text text_da">达</div>
              <div class="info">
                <div class="text_info">
                  <span>{{
                    taskDetailsObj.deliveryOrderAddresses[1].customerName
                  }}</span>
                  &nbsp;/&nbsp;{{
                    taskDetailsObj.deliveryOrderAddresses[1].phone
                  }}
                </div>
                <div class="address">
                  {{ taskDetailsObj.deliveryOrderAddresses[1].addressDetail }}
                </div>
              </div>
            </div>
          </van-cell>
          <van-cell
            @click="toPhone(taskDetailsObj.deliveryOrderAddresses[1].phone)"
          >
            送达电话：{{ taskDetailsObj.deliveryOrderAddresses[1].phone }}
            <van-icon name="phone-o" size="1rem" />
          </van-cell>
        </template>
      </template>
      <van-cell>预约时间：{{ taskDetailsObj.beforeTime }}</van-cell>
      <van-cell
        >备注信息：{{
          taskDetailsObj.otherMsg ? taskDetailsObj.otherMsg : '无'
        }}</van-cell
      >
      <div
        v-if="
          taskDetailsObj.deliveryOrderPics &&
          taskDetailsObj.deliveryOrderPics.length > 0
        "
        class="img_warp"
      >
        <div class="title">附图：</div>
        <div class="img">
          <img
            v-for="(item, index) in taskDetailsObj.deliveryOrderPics"
            :key="item.id"
            :src="imgBaseUrl + item.picAddress"
            @click="imagePreview(taskDetailsObj.deliveryOrderPics, index)"
          />
        </div>
      </div>
      <van-cell>接单时效：{{ taskDetailsObj.endTime }}</van-cell>
      <van-cell
        >性别要求：{{
          taskDetailsObj.sex === 0
            ? '性别不限'
            : taskDetailsObj.sex === 1
            ? '只限男性'
            : '只限女性'
        }}</van-cell
      >
      <van-cell>
        <div class="price">
          任务收益：
          <span>￥{{ taskDetailsObj.price }}</span>
        </div>
      </van-cell>
      <div class="btn_warp">
        <!-- state状态(0已撤销1未支付2未接单3已接单4已完成并确认) -->
        <van-button
          v-if="tabIndex === 0 && taskDetailsObj.state === 2"
          class="btn"
          round
          type="primary"
          @click="confirmOrder"
          >确认接单</van-button
        >
        <van-button
          v-if="tabIndex === 1 && taskDetailsObj.state === 3"
          class="btn"
          round
          type="primary"
          @click="finishOrder"
          >订单已完成</van-button
        >
      </div>
      <div v-if="taskDetailsObj.state === 1" class="tip">
        待支付，请返回我的界面完成支付
      </div>
    </div>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      cOrderSn: '',
      tabIndex: Number(sessionStorage.getItem('orderPeopleTabsIndex'))
        ? Number(sessionStorage.getItem('orderPeopleTabsIndex'))
        : 0,
      taskDetailsObj: {},
    }
  },
  created() {
    this.cOrderSn = this.$route.query.cOrderSn
    this.getTaskDetailsObj()
  },
  methods: {
    // 获取订单详情
    async getTaskDetailsObj() {
      const res = await getData(
        '/site/delivery/order/id/find',
        { cOrderSn: this.cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.taskDetailsObj = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 发起确认订单
    async confirmOrder() {
      const res = await upData(
        '/site/delivery/order/receive',
        { cOrderSn: this.cOrderSn },
        {
          showLoading: true,
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('接单成功！')
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 用户点击完成订单
    finishOrder() {},
    // 处理拨打电话事件
    toPhone(phone) {
      window.location.href = 'tel:' + phone
    },
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
.top {
  background-color: #fff;
  padding: 1rem;
  .title {
    font-weight: 900;
  }
  .time {
    color: #999;
    font-size: 0.8rem;
    margin-top: 1rem;
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
    .status {
      position: absolute;
      top: 0;
      right: 0.5rem;
      transform: rotate(15deg);
      color: @themeColor;
    }
  }
  .cell2 {
    height: 5rem;
    width: 100%;
    .warp {
      display: flex;
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
.btn_warp {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  .btn {
    width: @buttonWidth;
    height: 2.5rem;
    font-size: 1rem;
    padding: 0;
  }
}
.tip {
  box-sizing: border-box;
  width: 100%;
  color: @themeColor;
  font-size: 1rem;
  text-align: center;
  margin: 1rem 0;
}
</style>
